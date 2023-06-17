import { z } from 'zod';
import { useReducer, useRef } from 'react';
import { Keyboard } from 'react-native';

import { dayjsUtc } from 'helpers/date';
import { humanizeToken } from 'helpers/string';
import { shouldAutoFill } from 'src/config';
import { getCatchMessage } from 'errors/errors';
import { objectEntries } from 'helpers/object';

import type { TextInput } from 'react-native';
import type { RefObject } from 'react';
import type { ZodDate, ZodTime } from 'helpers/schema';
import type { Utils } from 'types/utils';
import type { ButtonProps } from 'components/controls/button';
import type { AlertProps } from 'components/feedback/alert';

type fieldMap = {
	string: z.ZodString;
	password: z.ZodString;
	search: z.ZodString;
	email: z.ZodString;
	phone: z.ZodString;
	int: z.ZodNumber | z.ZodNullable<z.ZodNumber>;
	float: z.ZodNumber | z.ZodNullable<z.ZodNumber>;
	boolean: z.ZodBoolean;
	date: ZodDate | z.ZodNullable<ZodDate>;
	time: ZodTime | z.ZodNullable<ZodTime>;
};

type workingTypeMap = {
	string: string;
	password: string;
	search: string;
	email: string;
	phone: string;
	int: string;
	float: string;
	boolean: boolean;
	date: ZodDate['_output'] | null;
	time: ZodTime['_output'] | null;
};

type fieldType = keyof fieldMap;

type fieldZod = fieldMap[keyof fieldMap];

type textFieldZod = Exclude<
	fieldZod,
	fieldMap['boolean'] | fieldMap['date'] | fieldMap['time']
>;

type reverseMap<T extends fieldZod> = fieldType &
	keyof {
		[k in keyof fieldMap as Utils.equal<
			NonNullable<T['_output']>,
			NonNullable<fieldMap[k]['_output']>
		> extends false
			? never
			: k]: true;
	};

const formDefaults: {
	[k in keyof fieldMap]: workingTypeMap[k];
} = {
	string: 'test',
	int: '25',
	float: '25.255',
	date: dayjsUtc.utc('2022-10-20T10:20:00.000Z'),
	time: { hours: 10, minutes: 20 },
	email: 'testing@test.com',
	password: '12345',
	phone: '090078601',
	search: '',
	boolean: false,
};

type notRequired<T extends fieldZod> = T extends z.ZodNullable<any>
	? true
	: T extends z.ZodBoolean
	? true
	: T extends z.ZodString
	? boolean
	: false;

type validSchema = z.ZodObject<Record<string, fieldZod>, 'strict'>;

type Raw<T extends validSchema> = T extends
	| z.ZodObject<infer R>
	| z.ZodEffects<z.ZodObject<infer R>>
	? R
	: never;

type textFields<Zod extends validSchema> = keyof {
	[k in keyof Raw<Zod> as Raw<Zod>[k] extends textFieldZod ? k : never]: true;
};

type details<Zod extends validSchema> = {
	[k in keyof Raw<Zod>]: {
		/** the type of the schema field */
		type: reverseMap<Raw<Zod>[k]>;

		/** the default value for the form state */
		default?: Raw<Zod>[k]['_output'];

		/** can the field's value be null?  */
		notRequired?: boolean;
	} & (notRequired<Raw<Zod>[k]> extends true
		? { notRequired: true }
		: { notRequired?: notRequired<Raw<Zod>[k]> }) &
		(k extends textFields<Zod>
			? { next?: Exclude<textFields<Zod>, k> }
			: { next?: never });
};

type State<T extends details<any>> = {
	values: { [k in keyof T]: workingTypeMap[T[k]['type']] };
	status:
		| { type: 'idle' | 'submitting' }
		| {
				type: 'error';
				message: string | null;
				fieldErrors: Partial<Record<keyof T, string>>;
		  }
		| { type: 'success'; message: string };
};

export const useForm = <
	Zod extends validSchema,
	Details extends details<Zod>
>(input: {
	/** the zod schema for the form */
	schema: Zod;

	/** the details for form fields */
	details: Details;

	/** the form submission handler. Return a string to show as success message */
	onSubmit: (state: Zod['_output']) => Promise<string | undefined>;
}) => {
	const textRefs = useRef<Record<textFields<Zod>, TextInput | null>>(
		{} as never
	);

	const { schema, details, onSubmit } = input;

	const fieldsArray = Object.entries(details) as [
		keyof typeof details,
		(typeof details)[keyof typeof details]
	][];

	const [state, dispatch] = useReducer(
		(
			old: State<Details>,
			action:
				| {
						type: 'updateState';
						value: Partial<State<Details>>;
				  }
				| { type: 'updateStatus'; value: State<Details>['status'] }
		): State<Details> => {
			switch (action.type) {
				case 'updateState':
					return {
						...old,
						values: { ...old.values, ...action.value },
					};
				case 'updateStatus':
					return { ...old, status: action.value };
				default:
					throw new Error('unknown action type');
			}
		},
		{
			values: fieldsArray.reduce(
				(obj, [key, field]) => ({
					...obj,
					[key]:
						field.default ??
						(shouldAutoFill
							? formDefaults[field.type]
							: field.type === 'boolean'
							? false
							: ['date', 'time'].includes(field.type)
							? null
							: ''),
				}),
				{}
			) as never,
			status: { type: 'idle' },
		}
	);

	const { values, status } = state;

	const handleSubmit = async () => {
		try {
			Keyboard.dismiss();
			dispatch({ type: 'updateStatus', value: { type: 'submitting' } });

			const parsed = z
				.strictObject(
					objectEntries(schema.shape).reduce(
						(obj, [key, zod]) => ({
							...obj,
							[key]:
								zod instanceof z.ZodNumber ? z.preprocess(Number, zod) : zod,
						}),
						{}
					)
				)
				.parse(state.values);
			const result = await onSubmit(parsed);
			const message = result ?? 'Submission Successful!';

			dispatch({ type: 'updateStatus', value: { type: 'success', message } });
			setTimeout(
				() => dispatch({ type: 'updateStatus', value: { type: 'idle' } }),
				2500
			);
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				const fieldErrors = error.issues.reduce(
					(object, err) => ({
						...object,
						[String(err.path[0])]: err.message,
					}),
					{}
				);
				const otherIssue = error.issues.find(({ code, path }) => {
					const name = path[0];
					return (
						code === 'custom' ||
						(typeof name === 'string' && !Object.keys(details).includes(name))
					);
				});
				const message = otherIssue
					? `${otherIssue.path.join('.')}: ${otherIssue.message}`
					: null;
				dispatch({
					type: 'updateStatus',
					value: { type: 'error', message, fieldErrors },
				});
			} else {
				dispatch({
					type: 'updateStatus',
					value: {
						type: 'error',
						message: getCatchMessage(error),
						fieldErrors: {},
					},
				});
			}
		}
	};

	const fieldProps = fieldsArray.reduce(
		(obj, [key, field]) => ({
			...obj,
			[key]: {
				type: field.type,
				label: humanizeToken(String(key)),
				notRequired: field.notRequired ?? false,
				value: values[key],
				onChange: (value: unknown) =>
					dispatch({ type: 'updateState', value: { [key]: value } }),
				error: status.type === 'error' ? status.fieldErrors[key] : undefined,
				ref: !['boolean', 'date', 'time'].includes(field.type)
					? (element: TextInput | null) => {
							textRefs.current[key as keyof typeof textRefs.current] = element;
					  }
					: undefined,
				next: field.next
					? () =>
							textRefs.current[field.next as keyof typeof textRefs.current] ??
							null
					: undefined,
			},
		}),
		{}
	) as Utils.prettify<{
		[k in keyof Details]: Utils.prettify<
			{
				type: Details[k]['type'];
				label: string;
				notRequired: Details[k]['notRequired'] extends true ? true : false;
				value: workingTypeMap[Details[k]['type']];
				onChange: (value: workingTypeMap[Details[k]['type']]) => void;
				error: string | undefined;
			} & (k extends textFields<Zod> ? { ref: RefObject<TextInput> } : {}) &
				(Details[k]['next'] extends textFields<Zod>
					? { next: () => TextInput | null }
					: {})
		>;
	}>;

	const statusProps =
		(status.type === 'error' || status.type === 'success') && status.message
			? ({
					type: status.type,
					text: status.message,
					onClose: () =>
						dispatch({ type: 'updateStatus', value: { type: 'idle' } }),
			  } satisfies AlertProps)
			: null;

	const buttonProps = {
		icon: 'submit',
		label: status.type === 'submitting' ? 'Submitting...' : 'Submit',
		loading: status.type === 'submitting',
		disabled: ['success', 'submitting'].includes(status.type),
		onPress: handleSubmit,
	} satisfies ButtonProps;

	return {
		state,
		dispatch,
		props: {
			field: fieldProps,
			status: statusProps,
			button: buttonProps,
		},
		handleSubmit,
	};
};
