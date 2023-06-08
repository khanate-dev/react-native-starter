import { useState, forwardRef } from 'react';
import { View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';

import { IconButton } from 'components/controls/icon-button';
import { isSmallerScreen } from 'src/config';
import { AppIcon } from 'components/media/app-icon';

import type { TextInputProps } from 'react-native-paper';
import type { ForwardedRef } from 'react';
import type {
	KeyboardTypeOptions,
	TextInput as NativeTextInput,
	StyleProp,
	ViewStyle,
} from 'react-native';
import type { App } from 'types/app';
import type { AppIconName } from 'components/media/app-icon';

type FormInputType =
	| 'string'
	| 'int'
	| 'float'
	| 'email'
	| 'password'
	| 'phone'
	| 'search'
	| 'date'
	| 'time';

const keyboardTypes: Record<FormInputProps['type'], KeyboardTypeOptions> = {
	email: 'email-address',
	float: 'decimal-pad',
	int: 'number-pad',
	phone: 'phone-pad',
	password: 'default',
	string: 'default',
	search: 'default',
	date: 'default',
	time: 'default',
};

const icons: Record<FormInputProps['type'], AppIconName> = {
	email: 'email-at',
	float: 'number',
	int: 'number',
	phone: 'phone',
	password: 'password',
	string: 'text',
	search: 'search',
	date: 'date',
	time: 'time',
};

export type FormInputProps = Omit<
	TextInputProps,
	| 'onChangeText'
	| 'onChange'
	| 'value'
	| 'error'
	| 'left'
	| 'right'
	| 'disabled'
> &
	App.PropsWithStyle<{
		/** the styles to apply to the component */
		containerStyle?: StyleProp<ViewStyle>;

		/** the type of the input field */
		type: FormInputType;

		/** the current value of the input field */
		value: string;

		/** the function to call when the input changes */
		onChange: (value: string) => void;

		/** the error message to show beneath the input */
		error?: string;

		/** the caption to show beneath the input */
		caption?: string;

		/** should the input have an icon to the left side */
		hasIcon?: boolean;

		/** should the input have no vertical margins? */
		noMargin?: boolean;

		/** is the input the last in the form? */
		isLast?: boolean;

		/** should the input be disabled? */
		disabled?: boolean | ((value: string) => boolean);
	}>;

const FormInputComponent = (
	{
		containerStyle,
		type,
		value,
		error,
		caption,
		onChange,
		hasIcon,
		noMargin,
		isLast,
		disabled: disabledProp,
		...textInputProps
	}: FormInputProps,
	ref: ForwardedRef<NativeTextInput>
) => {
	const [isSecret, setIsSecret] = useState<boolean>(true);
	const [showingPicker, setShowingPicker] = useState<boolean>(false);

	const disabled =
		typeof disabledProp === 'function' ? disabledProp(value) : disabledProp;

	return (
		<View
			style={[
				{ marginBottom: noMargin ? 0 : isSmallerScreen ? 10 : 20 },
				containerStyle,
			]}
		>
			<TextInput
				ref={ref}
				{...textInputProps}
				value={value}
				keyboardType={keyboardTypes[type]}
				returnKeyType={isLast ? 'done' : 'next'}
				secureTextEntry={type === 'password' && isSecret}
				error={Boolean(error)}
				disabled={disabled}
				editable={type === 'date' || type === 'time'}
				left={hasIcon ? <AppIcon name={icons[type]} /> : undefined}
				right={
					type === 'password' ? (
						<IconButton
							icon={isSecret ? 'hidden' : 'visible'}
							onPress={() => setIsSecret((prev) => !prev)}
						/>
					) : type === 'date' || type === 'time' ? (
						<IconButton
							icon={type}
							disabled={disabled}
							onPress={() => setShowingPicker(true)}
						/>
					) : undefined
				}
				onChangeText={onChange}
			/>
			<HelperText
				type={error ? 'error' : 'info'}
				visible={Boolean(error || caption)}
				disabled={disabled}
			>
				{error || caption}
			</HelperText>
			{type === 'date' && (
				<DatePickerModal
					locale='en'
					mode='single'
					visible={showingPicker}
					date={new Date(value)}
					onDismiss={() => setShowingPicker(false)}
					onConfirm={(val) => onChange(val.date?.toISOString() ?? '')}
				/>
			)}
			{type === 'time' && (
				<TimePickerModal
					locale='en'
					visible={showingPicker}
					hours={Number(value.split(':')[0] ?? '')}
					minutes={Number(value.split(':')[1] ?? '')}
					onDismiss={() => setShowingPicker(false)}
					onConfirm={(val) => onChange(`${val.hours}:${val.minutes}`)}
				/>
			)}
		</View>
	);
};

export const FormInput = forwardRef(FormInputComponent);
