import { useRef, useState } from 'react';
import { Keyboard, ScrollView, View } from 'react-native';
import { ZodError } from 'zod';

import { humanizeToken } from 'helpers/string';
import { objectEntries } from 'helpers/object';
import { FormInput } from 'components/controls/form-input';
import { FormButton } from 'components/controls/form-button';
import { Alert } from 'components/feedback/alert';
import { getCatchMessage } from 'errors/errors';
import { shouldAutoFill } from 'src/config';

import type { TextInput } from 'react-native';
import type {
	FormErrors,
	FormState,
	SchemaFields,
	SchemaField,
} from 'types/form';
import type { FormButtonProps } from 'components/controls/form-button';
import type { App } from 'types/app';
import type { AppIconName } from 'components/media/app-icon';
import type { ThemeColor } from 'styles/theme';

export const formTypeDefaults: Record<SchemaField<string>['type'], string> = {
	string: 'test',
	int: '25',
	float: '25.255',
	date: '2022-10-20T10:20:00.000Z',
	time: '10:20',
	email: 'testing@test.com',
	password: '12345',
	phone: '090078601',
	search: '',
};

export const formDefaults: Record<string, string> = {
	Cnic: '12345-1234567-1',
};

export type FormProps<
	Keys extends string,
	Fields extends SchemaFields<Keys>
> = App.PropsWithStyle<{
	/** the input fields object to use for the form */
	fields: Fields;

	/** the default values for form inputs */
	defaultValues?: null | Partial<FormState<keyof Fields>>;

	/**
	 * the function to call when the submit button is pressed.
	 *
	 * return a string from the promise to show as a success message
	 */
	onSubmit: (state: FormState<keyof Fields>) => Promise<void | string>;

	/** the function to call when an input's value changes */
	onInputChange?: (
		name: Keys,
		field: SchemaField<Keys>,
		newValue: string,
		state: FormState<keyof Fields>
	) => void;

	/** the label of the submit button */
	submitLabel?: string | ((isSubmitting: boolean) => string);

	/** the icon to show on the submit button */
	submitIcon?: AppIconName;

	/** the props to pass to the submit button */
	submitProps?: Partial<FormButtonProps>;

	/** should the form fields and submit button show icons? */
	hasIcons?: boolean;

	/** is the form page busy? */
	isBusy?: boolean | ((state: FormState<keyof Fields>) => boolean);

	/** should the form submission be disabled? */
	disabled?: boolean | ((state: FormState<keyof Fields>) => boolean);
}>;

export type Status = null | string | { type: ThemeColor; text: string };

export const Form = <Keys extends string, Fields extends SchemaFields<Keys>>({
	style,
	fields,
	defaultValues,
	submitLabel,
	submitIcon,
	onSubmit,
	onInputChange,
	submitProps,
	hasIcons,
	isBusy,
	disabled,
}: FormProps<Keys, Fields>) => {
	const formRefs = useRef<(null | TextInput)[]>([]);

	const entries = objectEntries(fields);

	const [form, setForm] = useState(
		entries.reduce(
			(object, [key, field]) => ({
				...object,
				[key]:
					defaultValues?.[key] ??
					(shouldAutoFill
						? formDefaults[key] ?? formTypeDefaults[field.type]
						: ''),
			}),
			{} as FormState<keyof Fields>
		)
	);
	const [errors, setErrors] = useState<FormErrors<keyof Fields>>({});
	const [status, setStatus] = useState<Status>(null);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const handleSubmit = async () => {
		try {
			Keyboard.dismiss();
			setErrors({});
			setStatus(null);

			setIsSubmitting(true);

			const newStatus = await onSubmit(form);
			if (!newStatus) return;
			setStatus({
				type: 'success',
				text: newStatus,
			});
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
				const newStatus = otherIssue
					? `${otherIssue.path.join('.')}: ${otherIssue.message}`
					: null;
				setStatus(newStatus ?? null);
			} else {
				setStatus(getCatchMessage(error));
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<View style={[{ flexGrow: 1, flexShrink: 0 }, style]}>
			<ScrollView style={{ flexGrow: 1, flexShrink: 0 }}>
				{entries.map(([name, field], index) => (
					<FormInput
						key={name}
						{...field.inputProps}
						ref={(element) => {
							formRefs.current[index] = element;
						}}
						type={field.type}
						value={form[name]}
						error={errors[name]}
						hasIcon={hasIcons}
						button={field.button}
						blurOnSubmit={index + 1 === entries.length}
						isLast={index + 1 === entries.length}
						label={[
							field.label ?? humanizeToken(name),
							!field.nullable ? '*' : '',
						].join(' ')}
						disabled={
							(typeof isBusy === 'function' ? isBusy(form as any) : isBusy) ||
							isSubmitting ||
							(field.dependsOn && !form[field.dependsOn]) ||
							(typeof status === 'object' && status?.type === 'success')
						}
						onSubmitEditing={() => {
							const nextField = formRefs.current[index + 1];
							if (!nextField) {
								handleSubmit();
								return;
							}
							nextField.focus();
							!nextField.props.editable && Keyboard.dismiss();
						}}
						onChange={(value) => {
							setForm((prev) => ({ ...prev, [name]: value }));
							onInputChange?.(name, field, value, form as any);
						}}
					/>
				))}
			</ScrollView>

			{status !== null && (
				<Alert
					text={typeof status === 'string' ? status : status.text}
					type={typeof status === 'string' ? 'error' : status.type}
					noIcon={!hasIcons}
				/>
			)}

			<FormButton
				icon={submitIcon ?? hasIcons ? 'submit' : undefined}
				label={
					submitLabel
						? typeof submitLabel === 'string'
							? submitLabel
							: submitLabel(isSubmitting)
						: 'Submit'
				}
				loading={
					(typeof isBusy === 'function' ? isBusy(form as any) : isBusy) ||
					isSubmitting
				}
				disabled={
					(typeof disabled === 'function' ? disabled(form as any) : disabled) ||
					(typeof status === 'object' && status?.type === 'success')
				}
				onPress={handleSubmit}
				{...submitProps}
			/>
		</View>
	);
};
