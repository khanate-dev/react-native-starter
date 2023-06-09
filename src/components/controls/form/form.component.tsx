import { useState } from 'react';
import { Keyboard, ScrollView, View } from 'react-native';
import { ZodError } from 'zod';

import { FormControl } from 'components/controls/form-control';
import { Button } from 'components/controls/button';
import { Alert } from 'components/feedback/alert';
import { getCatchMessage } from 'errors/errors';

import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { ButtonProps } from 'components/controls/button';
import type { AppIconName } from 'components/media/app-icon';
import type { ThemeColor } from 'styles/theme';
import type {
	FormSchema,
	FormSchemaField,
	FormSchemaMap,
	FormSchemaWorkingType,
	FormSchemaFieldType,
	FormSchemaWorkingObj,
} from 'schemas';

type baseStyle = {
	container?: StyleProp<ViewStyle>;
	icon?: StyleProp<ViewStyle>;
	button?: StyleProp<ViewStyle>;
};

type styles<T extends Record<string, FormSchemaMap[FormSchemaFieldType]>> = {
	container?: StyleProp<ViewStyle>;
	button?: StyleProp<ViewStyle>;
	control?: {
		container?: StyleProp<ViewStyle>;
		icon?: StyleProp<ViewStyle>;
		button?: StyleProp<ViewStyle>;
		control?: StyleProp<ViewStyle>;
	};
	fields?: {
		[k in keyof T]?: baseStyle & {
			control?: StyleProp<
				T[k]['_output'] extends boolean | null ? ViewStyle : TextStyle
			>;
		};
	};
};

export type FormProps<
	T extends Record<string, FormSchemaMap[FormSchemaFieldType]>
> = {
	/** the styles to apply to the component */
	styles?: styles<T>;

	/** the input fields object to use for the form */
	schema: FormSchema<T>;

	/** the default values for form inputs */
	defaultValues?: null | Partial<{ [k in keyof T]: T[k]['_output'] }>;

	/**
	 * the function to call when the submit button is pressed.
	 *
	 * return a string from the promise to show as a success message
	 */
	onSubmit: (state: { [k in keyof T]: T[k]['_output'] }) => Promise<
		void | string
	>;

	/** the function to call when an input's value changes */
	onInputChange?: <Key extends keyof T>(
		field: FormSchemaField<T[Key]>,
		newValue: FormSchemaWorkingType<T[Key]>,
		state: FormSchemaWorkingObj<T>
	) => void;

	/** the label of the submit button */
	submitLabel?: string | ((isSubmitting: boolean) => string);

	/** the icon to show on the submit button */
	submitIcon?: AppIconName;

	/** the props to pass to the submit button */
	submitProps?: Partial<ButtonProps>;

	/** the object describing the fields each fields depends on */
	dependsOn?: { [k in keyof T]?: keyof Omit<T, k> };

	/** should the form fields and submit button show icons? */
	hasIcons?: boolean;

	/** is the form page busy? */
	isBusy?: boolean | ((state: FormSchemaWorkingObj<T>) => boolean);

	/** should the form submission be disabled? */
	disabled?: boolean | ((state: FormSchemaWorkingObj<T>) => boolean);
};

type Status = null | string | { type: ThemeColor; text: string };

export const Form = <
	T extends Record<string, FormSchemaMap[FormSchemaFieldType]>
>({
	styles,
	schema,
	defaultValues,
	submitLabel,
	submitIcon,
	onSubmit,
	onInputChange,
	submitProps,
	dependsOn,
	hasIcons,
	isBusy,
	disabled,
}: FormProps<T>) => {
	const [form, setForm] = useState({
		...schema.defaultValues,
		...defaultValues,
	});
	const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
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
						(typeof name === 'string' &&
							!Object.keys(schema.fields).includes(name))
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
		<View style={[{ flexGrow: 1, flexShrink: 0 }, styles?.container]}>
			<ScrollView style={{ flexGrow: 1, flexShrink: 0 }}>
				{schema.fieldsArray.map((field, index) => {
					const depends = dependsOn?.[field.name] as undefined | keyof T;
					const currStyle = styles?.fields?.[field.name];
					const style = styles?.control;
					return (
						<FormControl
							key={String(field.name)}
							type={field.type as never}
							value={form[field.name]}
							label={`${field.label}${field.notRequired ? '' : ' *'}`}
							error={errors[field.name]}
							button={field.button}
							hasIcon={hasIcons}
							isLast={index + 1 === schema.fieldsArray.length}
							styles={{
								container: currStyle?.container ?? style?.container,
								button: currStyle?.button ?? style?.button,
								icon: currStyle?.icon ?? style?.icon,
								control: currStyle?.control ?? style?.control,
							}}
							disabled={
								(typeof isBusy === 'function' ? isBusy(form as any) : isBusy) ||
								isSubmitting ||
								(depends && !form[depends]) ||
								(typeof status === 'object' && status?.type === 'success')
							}
							onSubmit={handleSubmit}
							onChange={(value: unknown) => {
								setForm((prev) => ({ ...prev, [field.name]: value }));
								onInputChange?.(field, value as never, form);
							}}
						/>
					);
				})}
			</ScrollView>

			{status !== null && (
				<Alert
					text={typeof status === 'string' ? status : status.text}
					type={typeof status === 'string' ? 'error' : status.type}
					noIcon={!hasIcons}
				/>
			)}

			<Button
				style={styles?.button}
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
