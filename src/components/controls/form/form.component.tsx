import { useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
	updateForm,
	handleInputSubmitEditing,
	trySubmission,
} from 'helpers/form';
import { getDefaultFormState } from 'helpers/defaults';
import { Alert } from 'components/feedback/Alert';

import { isSmallerScreen } from 'src/config';
import { humanizeToken } from 'helpers/string';
import { objectEntries } from 'helpers/object';
import { FormInput } from 'components/controls/form-input';
import { FormButton } from 'components/controls/form-button';

import type { FormErrors, FormState, SchemaFields } from 'types/form';
import type { AlertStatus } from 'types/general';
import type { FormProps } from './form.types';
import type { Datepicker, Input } from '@ui-kitten/components';

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
	const formRefs = useRef<(null | Input | Datepicker)[]>([]);

	const [form, setForm] = useState<FormState<keyof Fields>>(
		getDefaultFormState(fields, defaultValues)
	);
	const [errors, setErrors] = useState<FormErrors<keyof Fields>>({});
	const [status, setStatus] = useState<null | AlertStatus>(null);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const entries = objectEntries(fields);

	const handleSubmit = () =>
		trySubmission(
			fields,
			setErrors,
			setStatus,
			setIsSubmitting,
			form,
			onSubmit
		);

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
						size={isSmallerScreen ? 'medium' : 'large'}
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

			{Boolean(status) && (
				<Alert
					state={status}
					hasIcon
				/>
			)}

			<FormButton
				status='secondary'
				borders='rounded'
				size={isSmallerScreen ? 'medium' : 'large'}
				iconLeft={submitIcon ?? hasIcons ? 'flash-outline' : undefined}
				label={
					submitLabel
						? typeof submitLabel === 'string'
							? submitLabel
							: submitLabel(isSubmitting)
						: 'Submit'
				}
				isLoading={
					(typeof isBusy === 'function' ? isBusy(form as any) : isBusy) ||
					isSubmitting
				}
				disabled={
					(typeof disabled === 'function' ? disabled(form as any) : disabled) ||
					(typeof status === 'object' && status?.type === 'success')
				}
				elevated
				onPress={handleSubmit}
				{...submitProps}
			/>
		</View>
	);
};
