import { isDayjs } from 'dayjs';
import { forwardRef, useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';

import { appIconMap } from '~/components/app/icon';
import { Button } from '~/components/controls/button';
import { FormControlWrapper } from '~/components/controls/form-control-wrapper';
import { isSmallerScreen } from '~/config';
import { dayjsUtc } from '~/helpers/date';
import { useTheme } from '~/hooks/theme';

import type { Dayjs } from 'dayjs';
import type { ForwardedRef, RefObject } from 'react';
import type {
	KeyboardTypeOptions,
	TextInput as RefType,
	StyleProp,
	ViewStyle,
} from 'react-native';
import type { TextInputProps } from 'react-native-paper';
import type { TextInputLabelProp } from 'react-native-paper/lib/typescript/src/components/TextInput/types';
import type { z } from 'zod';
import type { IconName } from '~/components/app/icon';
import type { ButtonProps } from '~/components/controls/button';
import type { ZodTime } from '~/helpers/schema';

export const formControlType = [
	'email',
	'float',
	'int',
	'phone',
	'password',
	'string',
	'search',
	'date',
	'time',
] as const;

export type FormControlType = (typeof formControlType)[number];

const keyboardTypes: Record<FormControlType, KeyboardTypeOptions> = {
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

const icons: Record<FormControlType, IconName> = {
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

type styles = {
	container?: StyleProp<ViewStyle>;
	icon?: StyleProp<ViewStyle>;
	button?: StyleProp<ViewStyle>;
	control?: {
		style: TextInputProps['style'];
		outline?: TextInputProps['outlineStyle'];
		content?: TextInputProps['contentStyle'];
		underline?: TextInputProps['underlineStyle'];
	};
};

export type FormControlProps = Pick<TextInputProps, 'disabled'> & {
	/** the type of the input field */
	type: unknown;

	/** the current value of the input field */
	value: unknown;

	/** the function to call when the input changes */
	onChange: unknown;

	/** the styles to apply the control */
	styles?: styles;

	label: TextInputLabelProp;

	/** the error message to show beneath the input */
	error?: string;

	/** the caption to show beneath the input */
	caption?: string;

	/** the button to show on the right side of the input */
	button?: Pick<
		ButtonProps,
		'color' | 'label' | 'onPress' | 'icon' | 'style' | 'disabled' | 'loading'
	>;

	/** the text input to select after this */
	next?: RefObject<RefType> | (() => RefType | null);

	/** the props to apply to the TextInput */
	inputProps?: Omit<
		TextInputProps,
		| 'disabled'
		| 'label'
		| 'underlineStyle'
		| 'outlineStyle'
		| 'contentStyle'
		| 'style'
		| 'type'
		| 'value'
		| 'onChangeText'
		| 'left'
		| 'right'
		| 'keyboardType'
		| 'secureTextEntry'
		| 'error'
		| 'dense'
		| 'editable'
		| 'returnKeyType'
		| 'onSubmitEditing'
	>;

	/** is the form field not required? */
	notRequired?: boolean;

	/** should the input have an icon to the left side */
	hasIcon?: boolean;
} & (
		| {
				type: 'date';
				value: Dayjs | null;
				onChange: (value: Dayjs | null) => void;
		  }
		| {
				type: 'time';
				value: z.infer<ZodTime> | null;
				onChange: (value: z.infer<ZodTime> | null) => void;
		  }
		| {
				type: Exclude<FormControlType, 'date' | 'time' | 'boolean'>;
				value: string;
				onChange: (value: string) => void;
		  }
	);

const FormControlComponent = (
	{
		type,
		value,
		onChange,
		styles,
		label,
		error,
		caption,
		button,
		inputProps,
		next,
		notRequired,
		hasIcon,
		disabled,
	}: FormControlProps,
	ref: ForwardedRef<RefType>,
) => {
	const theme = useTheme();

	const [isSecret, setIsSecret] = useState<boolean>(true);
	const [showingPicker, setShowingPicker] = useState<boolean>(false);

	const inputJsx = (
		<TextInput
			{...inputProps}
			{...styles?.control}
			ref={ref}
			style={[button && { flex: 1 }, styles?.control?.style]}
			mode={inputProps?.mode ?? 'outlined'}
			keyboardType={keyboardTypes[type]}
			secureTextEntry={type === 'password' && isSecret}
			error={Boolean(error)}
			disabled={disabled}
			editable={!['date', 'time'].includes(type)}
			returnKeyType={next ? 'next' : 'done'}
			blurOnSubmit={!next}
			left={
				hasIcon ? (
					<TextInput.Icon
						icon={appIconMap[icons[type]]}
						style={styles?.icon}
					/>
				) : undefined
			}
			label={
				<>
					{label}
					{!notRequired && ' *'}
				</>
			}
			value={
				isDayjs(value)
					? value.format('YYYY-MM-DD')
					: typeof value === 'string'
					? value
					: value
					? `${value.hours}:${value.minutes}`
					: ''
			}
			right={
				type === 'password' ? (
					<TextInput.Icon
						icon={appIconMap[isSecret ? 'hidden' : 'visible']}
						disabled={disabled}
						onPress={() => {
							setIsSecret((prev) => !prev);
						}}
					/>
				) : type === 'date' || type === 'time' ? (
					<TextInput.Icon
						icon={appIconMap[type]}
						disabled={disabled}
						onPress={() => {
							setShowingPicker(true);
						}}
					/>
				) : undefined
			}
			dense
			onChangeText={type === 'date' || type === 'time' ? undefined : onChange}
			onSubmitEditing={() =>
				(typeof next === 'function' ? next() : next?.current)?.focus()
			}
		/>
	);

	return (
		<FormControlWrapper
			style={styles?.container}
			caption={caption}
			error={error}
			disabled={disabled}
		>
			{button ? (
				<View style={[theme.styles.view.row, { gap: 5 }]}>
					{inputJsx}
					<Button
						{...button}
						labelStyle={{ fontSize: isSmallerScreen ? 11 : 14 }}
						style={[
							{ borderRadius: 5, marginTop: 5 },
							styles?.button,
							button.style,
						]}
						compact
					/>
				</View>
			) : (
				inputJsx
			)}

			{type === 'date' && (
				<DatePickerModal
					locale='en'
					mode='single'
					visible={showingPicker}
					date={value?.toDate()}
					inputEnabled={false}
					disableStatusBar
					onDismiss={() => {
						setShowingPicker(false);
					}}
					onConfirm={({ date }) => {
						onChange(date ? dayjsUtc.utc(date) : null);
						setShowingPicker(false);
					}}
				/>
			)}

			{type === 'time' && (
				<TimePickerModal
					visible={showingPicker}
					hours={value?.hours}
					minutes={value?.minutes}
					onDismiss={() => {
						setShowingPicker(false);
					}}
					onConfirm={(val) => {
						onChange(val);
						setShowingPicker(false);
					}}
				/>
			)}
		</FormControlWrapper>
	);
};

export const FormControl = forwardRef(FormControlComponent);
