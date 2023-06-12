import { z } from 'zod';
import { useState } from 'react';
import { Keyboard } from 'react-native';

import { dayjsUtc } from 'helpers/date';
import { humanizeToken } from 'helpers/string';
import { shouldAutoFill } from 'src/config';
import { getCatchMessage } from 'errors/errors';
import { Alert } from 'components/feedback/alert';

import type { ZodDate, ZodTime } from 'helpers/schema';
import type { Utils } from 'types/utils';
import type { ButtonProps } from 'components/controls/button';

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

type Status<FieldNames extends PropertyKey> =
	| { type: 'idle' | 'submitting' }
	| {
			type: 'error';
			message: string | null;
			fieldErrors: Partial<Record<FieldNames, string>>;
	  }
	| { type: 'success'; message: string };

type notRequired<T extends fieldZod> = T extends z.ZodNullable<any>
	? true
	: T extends z.ZodBoolean
	? true
	: T extends z.ZodString
	? boolean
	: false;

type validSchema =
	| z.ZodObject<Record<string, fieldZod>, 'strict'>
	| z.ZodEffects<z.ZodObject<Record<string, fieldZod>, 'strict'>>;

type Raw<T extends validSchema> = T extends
	| z.ZodObject<infer R>
	| z.ZodEffects<z.ZodObject<infer R>>
	? R
	: never;

export const useForm = <
	Zod extends validSchema,
	FieldInput extends {
		[k in keyof Raw<Zod>]: {
			/** the type of the schema field */
			type: reverseMap<Raw<Zod>[k]>;

			/** can the field's value be null?  */
			notRequired?: boolean;
		} & (notRequired<Raw<Zod>[k]> extends true
			? { notRequired: true }
			: { notRequired?: notRequired<Raw<Zod>[k]> });
	}
>(
	schema: Zod,
	fieldInput: FieldInput,
	onSubmit: (state: (typeof schema)['_output']) => Promise<string | undefined>
) => {
	const fieldsArray = Object.entries(fieldInput) as [
		keyof typeof fieldInput,
		(typeof fieldInput)[keyof typeof fieldInput]
	][];
	const defaultValues = fieldsArray.reduce(
		(obj, [key, field]) => ({
			...obj,
			[key]: shouldAutoFill
				? formDefaults[field.type]
				: field.type === 'boolean'
				? false
				: ['date', 'time'].includes(field.type)
				? null
				: '',
		}),
		{}
	) as { [k in keyof FieldInput]: workingTypeMap[FieldInput[k]['type']] };

	const [state, setState] = useState(defaultValues);
	const [status, setStatus] = useState<Status<keyof FieldInput>>({
		type: 'idle',
	});

	const fields = fieldsArray.reduce(
		(obj, [key, field]) => ({
			...obj,
			[key]: {
				type: field.type,
				label: humanizeToken(String(key)),
				notRequired: field.notRequired ?? false,
				value: state[key],
				onChange: (value: unknown) => setState({ ...state, [key]: value }),
				error: status.type === 'error' ? status.fieldErrors[key] : undefined,
			},
		}),
		{}
	) as Utils.prettify<{
		[k in keyof FieldInput]: {
			type: FieldInput[k]['type'];
			label: string;
			notRequired: FieldInput[k]['notRequired'] extends true ? true : false;
			value: workingTypeMap[FieldInput[k]['type']];
			onChange: (value: workingTypeMap[FieldInput[k]['type']]) => void;
			error: string | undefined;
		};
	}>;

	const statusJsx =
		(status.type === 'error' || status.type === 'success') && status.message ? (
			<Alert
				text={status.message}
				type={status.type}
			/>
		) : null;

	const handleSubmit = async () => {
		try {
			Keyboard.dismiss();
			setStatus({ type: 'submitting' });

			const parsed = schema.parse(state);
			const result = await onSubmit(parsed);
			const message = result ?? 'Submission Successful!';

			setStatus({ type: 'success', message });
			setTimeout(() => setStatus({ type: 'idle' }), 2500);
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
						(typeof name === 'string' &&
							!Object.keys(fieldInput).includes(name))
					);
				});
				const message = otherIssue
					? `${otherIssue.path.join('.')}: ${otherIssue.message}`
					: null;
				setStatus({ type: 'error', message, fieldErrors });
			} else {
				setStatus({
					type: 'error',
					message: getCatchMessage(error),
					fieldErrors: {},
				});
			}
		}
	};

	const buttonProps = {
		icon: 'submit',
		label: status.type === 'submitting' ? 'Submitting...' : 'Submit',
		loading: status.type === 'submitting',
		disabled: status.type !== 'idle',
		onPress: handleSubmit,
	} satisfies ButtonProps;

	return {
		state,
		status,
		fields,
		statusJsx,
		buttonProps,
		handleSubmit,
	};
};
