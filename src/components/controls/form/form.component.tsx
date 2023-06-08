import { useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';

import {
	getDefaultFormState,
	updateForm,
	handleInputSubmitEditing,
	trySubmission,
} from 'helpers/form';
import { humanizeToken } from 'helpers/string';
import { objectEntries } from 'helpers/object';
import { FormInput } from 'components/controls/form-input';
import { FormButton } from 'components/controls/form-button';
import { Alert } from 'components/feedback/alert';

import type { TextInput } from 'react-native';
import type {
	FormErrors,
	FormState,
	SchemaFields,
	SchemaField,
} from 'types/form';
import type { AlertStatus } from 'helpers/form';
import type { FormButtonProps } from 'components/controls/form-button';
import type { App } from 'types/app';
import type { AppIconName } from 'components/media/app-icon';

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

	const [form, setForm] = useState<FormState<keyof Fields>>(
		getDefaultFormState(fields, defaultValues)
	);
	const [errors, setErrors] = useState<FormErrors<keyof Fields>>({});
	const [status, setStatus] = useState<null | AlertStatus>(null);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const entries = objectEntries(fields);

	const handleSubmit = async () => {
		return trySubmission(
			fields,
			setErrors,
			setStatus,
			setIsSubmitting,
			form,
			onSubmit
		);
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
						onSubmitEditing={() =>
							handleInputSubmitEditing(formRefs, index, handleSubmit)
						}
						onChange={(value) => {
							updateForm(setForm, name, value);
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
