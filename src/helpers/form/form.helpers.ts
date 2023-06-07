import { Keyboard } from 'react-native';
import { ZodError } from 'zod';

import { shouldAutoFill } from 'config';

import type {
	FormErrors,
	SchemaField,
	FormState,
	SchemaFields,
} from 'types/form';
import type { Datepicker, Input } from 'react-native-paper';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';

export const formTypeDefaults: Record<SchemaField<string>['type'], string> = {
	string: 'test',
	int: '25',
	float: '25.255',
	date: '2022-10-20T10:20:00.000Z',
	email: 'testing@test.com',
	password: '12345',
	phone: '090078601',
	search: '',
};

export const formDefaults: Record<string, string> = {
	Cnic: '12345-1234567-1',
};

export const getDefaultFormState = <
	Keys extends string,
	Fields extends SchemaFields<Keys>,
	State = FormState<Keys>
>(
	fields: Fields,
	defaults?: null | Partial<State>
): State => {
	const entries = Object.entries(fields) as [Keys, SchemaField<Keys>][];

	return entries.reduce(
		(object, [key, field]) => ({
			...object,
			[key]:
				(defaults as any)?.[key]?.toString?.() ??
				(shouldAutoFill
					? formDefaults[key] ?? formTypeDefaults[field.type]
					: ''),
		}),
		{} as State
	);
};

export const updateForm = <Keys extends PropertyKey>(
	setForm: Dispatch<SetStateAction<FormState<Keys>>>,
	key: Keys,
	value: string
) => {
	setForm((prevForm) => ({
		...prevForm,
		[key]: value,
	}));
};

export type AlertStatus =
	| null
	| string
	| {
			type: 'danger' | 'success' | 'info' | 'warning';
			text: string;
	  };

export const trySubmission = async <
	Keys extends PropertyKey,
	Fields extends SchemaFields<Keys>
>(
	fields: Fields,
	setErrors: Dispatch<SetStateAction<FormErrors<keyof Fields>>>,
	setStatus: Dispatch<SetStateAction<null | AlertStatus>>,
	setIsSubmitting: Dispatch<SetStateAction<boolean>>,
	form: FormState<keyof Fields>,
	onSubmit: (state: FormState<keyof Fields>) => Promise<void | string>
) => {
	try {
		Keyboard.dismiss();
		setErrors({});
		setStatus(null);

		setIsSubmitting(true);

		const status = await onSubmit(form);

		if (status) {
			setStatus({
				type: 'success',
				text: status,
			});
		}
	} catch (error: any) {
		if (error instanceof ZodError) {
			const newErrors = error.issues.reduce(
				(object, err) => ({
					...object,
					[String(err.path[0])]: err.message,
				}),
				{}
			);
			setErrors(newErrors);
			const otherIssue = error.issues.find(({ code, path }) => {
				const name = path[0];
				return (
					code === 'custom' ||
					(typeof name === 'string' && !Object.keys(fields).includes(name))
				);
			});
			const status = otherIssue
				? `${otherIssue.path.join('.')}: ${otherIssue.message}`
				: null;
			setStatus(status ?? null);
		} else {
			setStatus(error.message ?? error);
		}
	} finally {
		setIsSubmitting(false);
	}
};

const isDatepicker = (ref: Input | Datepicker): ref is Datepicker =>
	Boolean((ref as Datepicker).hide);

export const handleInputSubmitEditing = (
	formRefs: MutableRefObject<(null | Input | Datepicker)[]>,
	index: number,
	submit: () => void
) => {
	const nextField = formRefs.current[index + 1];
	if (!nextField) return submit();
	nextField.focus();
	isDatepicker(nextField) && Keyboard.dismiss();
};
