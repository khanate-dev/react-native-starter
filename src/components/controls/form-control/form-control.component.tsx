import { useState } from 'react';
import { View } from 'react-native';
import { HelperText, Switch, Text, TextInput } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { isDayjs } from 'dayjs';

import { IconButton } from 'components/controls/icon-button';
import { isSmallerScreen } from 'src/config';
import { AppIcon } from 'components/media/app-icon';
import { Button } from 'components/controls/button';
import { dayjsUtc } from 'helpers/date';

import type { TextInputProps } from 'react-native-paper';
import type { Dayjs } from 'dayjs';
import type { ButtonProps } from 'components/controls/button';
import type {
	KeyboardTypeOptions,
	StyleProp,
	ViewStyle,
	TextStyle,
} from 'react-native';
import type { AppIconName } from 'components/media/app-icon';
import type { ZodTime } from 'helpers/schema';
import type { z } from 'zod';
import type { Utils } from 'types/utils';

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
	'boolean',
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
	boolean: 'default',
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
	boolean: 'check',
};

type styles = {
	container?: StyleProp<ViewStyle>;
	icon?: StyleProp<ViewStyle>;
	button?: StyleProp<ViewStyle>;
};

export type FormControlProps = Pick<TextInputProps, 'mode'> & {
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

	/** should the input be disabled? */
	disabled?: boolean;
} & Utils.allOrNone<{
		/** is the input the last in the form? */
		isLast: boolean;

		/** the function to submit the function. Used to trigger form submission on the last input field submission */
		onSubmit: () => void;
	}> &
	(
		| {
				type: 'date';
				value: Dayjs | null;
				onChange: (value: Dayjs | null) => void;
				styles?: styles & { control?: StyleProp<TextStyle> };
		  }
		| {
				type: 'time';
				value: z.infer<ZodTime> | null;
				onChange: (value: z.infer<ZodTime> | null) => void;
				styles?: styles & { control?: StyleProp<TextStyle> };
		  }
		| {
				type: 'boolean';
				value: boolean;
				onChange: (value: boolean) => void;
				styles?: styles & { control?: StyleProp<ViewStyle> };
		  }
		| {
				type: Exclude<FormControlType, 'date' | 'time' | 'boolean'>;
				value: string;
				onChange: (value: string) => void;
				styles?: styles & { control?: StyleProp<TextStyle> };
		  }
	);

export const FormControl = ({
	mode = 'outlined',
	type,
	value,
	onChange,
	onSubmit,
	styles,
	label,
	error,
	caption,
	button,
	hasIcon,
	isLast,
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

	const inputJsx =
		type === 'boolean' ? (
			<View style={lineFlex}>
				{iconJsx}
				<Text variant='labelMedium'>{label}</Text>
				<Switch
					style={styles?.control}
					value={value}
					disabled={disabled}
					onValueChange={onChange}
				/>
			</View>
		) : (
			<TextInput
				mode={mode}
				style={styles?.control}
				label={label}
				keyboardType={keyboardTypes[type]}
				returnKeyType={isLast ? 'done' : 'next'}
				secureTextEntry={type === 'password' && isSecret}
				error={Boolean(error)}
				disabled={disabled}
				editable={!['date', 'time'].includes(type)}
				left={iconJsx}
				blurOnSubmit={isLast}
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
				onSubmitEditing={() => {
					if (!isLast) return;
					onSubmit();
				}}
			/>
		);

	return (
		<View style={styles?.container}>
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
		</View>
	);
};
