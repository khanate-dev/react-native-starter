import { useState } from 'react';
import { Keyboard, ScrollView, View } from 'react-native';
import { ZodError } from 'zod';

import { FormControl } from 'components/controls/form-control';
import { Button } from 'components/controls/button';
import { Alert } from 'components/feedback/alert';
import { getCatchMessage } from 'errors/errors';
import { deepMerge } from 'helpers/object';

import type { StyleProp, TextStyle, ViewStyle, ViewProps } from 'react-native';
import type { ButtonProps } from 'components/controls/button';
import type { ThemeColor } from 'styles/theme';
import type {
	FormSchema,
	FormSchemaMap,
	FormSchemaFieldType,
	FormSchemaWorkingObj,
} from 'schemas';

type baseStyle = {
	container?: StyleProp<ViewStyle>;
	icon?: StyleProp<ViewStyle>;
	button?: StyleProp<ViewStyle>;
};

type componentProps<
	T extends Record<string, FormSchemaMap[FormSchemaFieldType]>
> = {
	container?: Partial<ViewProps>;
	button?: Partial<ButtonProps>;
	control?: {
		common: {
			style?: {
				container?: StyleProp<ViewStyle>;
				icon?: StyleProp<ViewStyle>;
				button?: StyleProp<ViewStyle>;
				control?: StyleProp<ViewStyle>;
			};
		};
		fields: {
			[k in keyof T]?: {
				style?: baseStyle & {
					control?: StyleProp<
						T[k]['_output'] extends boolean | null ? ViewStyle : TextStyle
					>;
				};
				dependsOn: keyof Omit<T, k>;
			};
		};
	};
};

export type FormProps<
	T extends Record<string, FormSchemaMap[FormSchemaFieldType]>
> = {
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

	/** the props to apply the components */
	componentProps?:
		| componentProps<T>
		| ((state: FormSchemaWorkingObj<T>) => componentProps<T>);

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
	schema,
	defaultValues,
	onSubmit,
	componentProps,
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

	const { container, control, button } =
		typeof componentProps === 'function'
			? componentProps(form)
			: componentProps ?? {};

	return (
		<View
			{...container}
			style={[{ flexGrow: 1, flexShrink: 0 }, container?.style]}
		>
			<ScrollView style={{ flexGrow: 1, flexShrink: 0 }}>
				{schema.fieldsArray.map((field, index) => {
					const props = deepMerge(
						control?.common ?? {},
						control?.fields[field.name] ?? {}
					);
					return (
						<FormControl
							{...props}
							key={String(field.name)}
							type={field.type as never}
							value={form[field.name]}
							label={`${field.label}${field.notRequired ? '' : ' *'}`}
							error={errors[field.name]}
							button={field.button}
							hasIcon={hasIcons}
							isLast={index + 1 === schema.fieldsArray.length}
							styles={props.style}
							disabled={
								(typeof isBusy === 'function' ? isBusy(form as any) : isBusy) ||
								isSubmitting ||
								(props.dependsOn && !form[props.dependsOn]) ||
								(typeof status === 'object' && status?.type === 'success')
							}
							onSubmit={handleSubmit}
							onChange={(value: unknown) => {
								setForm((prev) => ({ ...prev, [field.name]: value }));
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
				{...button}
				icon={button?.icon ?? hasIcons ? 'submit' : undefined}
				label={button?.label ?? 'Submit'}
				loading={
					(typeof isBusy === 'function' ? isBusy(form as any) : isBusy) ||
					isSubmitting ||
					button?.loading
				}
				disabled={
					(typeof disabled === 'function' ? disabled(form as any) : disabled) ||
					(typeof status === 'object' && status?.type === 'success') ||
					button?.disabled
				}
				onPress={handleSubmit}
			/>
		</View>
	);
};
