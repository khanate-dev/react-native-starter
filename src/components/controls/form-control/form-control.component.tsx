import { useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { isDayjs } from 'dayjs';

import { IconButton } from 'components/controls/icon-button';
import { isSmallerScreen } from 'src/config';
import { AppIcon } from 'components/media/app-icon';
import { Button } from 'components/controls/button';
import { dayjsUtc } from 'helpers/date';
import { FormControlWrapper } from 'components/controls/form-control-wrapper';

import type { TextInputProps } from 'react-native-paper';
import type { Dayjs } from 'dayjs';
import type { ButtonProps } from 'components/controls/button';
import type { KeyboardTypeOptions, StyleProp, ViewStyle } from 'react-native';
import type { AppIconName } from 'components/media/app-icon';
import type { ZodTime } from 'helpers/schema';
import type { z } from 'zod';

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

const icons: Record<FormControlType, AppIconName> = {
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

export type FormControlProps = Pick<TextInputProps, 'mode' | 'disabled'> & {
	/** the type of the input field */
	type: unknown;

	/** the current value of the input field */
	value: unknown;

	/** the function to call when the input changes */
	onChange: unknown;

	/** the styles to apply the control */
	styles?: styles;

	/** the label to show on the field */
	label: string;

	/** the error message to show beneath the input */
	error?: string;

	/** the caption to show beneath the input */
	caption?: string;

	/** the button to show on the right side of the input */
	button?: Pick<
		ButtonProps,
		'label' | 'onPress' | 'icon' | 'style' | 'disabled' | 'loading'
	>;

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

export const FormControl = ({
	mode = 'outlined',
	type,
	value,
	onChange,
	styles,
	label,
	error,
	caption,
	button,
	hasIcon,
	disabled,
}: FormControlProps) => {
	const [isSecret, setIsSecret] = useState<boolean>(true);
	const [showingPicker, setShowingPicker] = useState<boolean>(false);

	const lineFlex = {
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'nowrap',
		alignContent: 'center',
		gap: isSmallerScreen ? 5 : 10,
	} satisfies StyleProp<ViewStyle>;

	const iconJsx = hasIcon ? (
		<AppIcon
			style={styles?.icon}
			name={icons[type]}
		/>
	) : undefined;

	const inputJsx = (
		<TextInput
			{...styles?.control}
			mode={mode}
			label={label}
			keyboardType={keyboardTypes[type]}
			secureTextEntry={type === 'password' && isSecret}
			error={Boolean(error)}
			disabled={disabled}
			editable={!['date', 'time'].includes(type)}
			left={iconJsx}
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
			dense
			onChangeText={type === 'date' || type === 'time' ? undefined : onChange}
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
				<View style={lineFlex}>
					{inputJsx}
					<Button
						style={[{ flex: 0 }, styles?.button]}
						{...button}
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
					onDismiss={() => setShowingPicker(false)}
					onConfirm={({ date }) => onChange(date ? dayjsUtc.utc(date) : null)}
				/>
			)}

			{type === 'time' && (
				<TimePickerModal
					locale='en'
					visible={showingPicker}
					hours={value?.hours}
					minutes={value?.minutes}
					onDismiss={() => setShowingPicker(false)}
					onConfirm={(val) => onChange(val)}
				/>
			)}
		</FormControlWrapper>
	);
};
