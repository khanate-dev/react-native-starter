import { useState, useRef } from 'react';
import { View } from 'react-native';
import { HelperText, Switch, Text, TextInput } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { isDayjs } from 'dayjs';

import { IconButton } from 'components/controls/icon-button';
import { isSmallerScreen } from 'src/config';
import { AppIcon } from 'components/media/app-icon';
import { FormButton } from 'components/controls/form-button';
import { dayjsUtc } from 'helpers/date';

import type { Dayjs } from 'dayjs';
import type { FormButtonProps } from 'components/controls/form-button';
import type {
	KeyboardTypeOptions,
	TextInput as NativeTextInput,
	StyleProp,
	ViewStyle,
	Switch as NativeSwitch,
} from 'react-native';
import type { AppIconName } from 'components/media/app-icon';
import type { FormSchemaFieldType } from 'schemas/form-schema.class';
import type { ZodTime } from 'helpers/schema';
import type { z } from 'zod';

const keyboardTypes: Record<FormSchemaFieldType, KeyboardTypeOptions> = {
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

const icons: Record<FormSchemaFieldType, AppIconName> = {
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

export type FormControlProps = {
	/** the styles to apply to the component */
	containerStyle?: StyleProp<ViewStyle>;

	/** the type of the input field */
	type: unknown;

	/** the current value of the input field */
	value: unknown;

	/** the function to call when the input changes */
	onChange: unknown;

	/** the function to submit the function. Used to trigger form submission on the last input field submission */
	onSubmit?: () => void;

	/** the label to show on the field */
	label: string;

	/** the error message to show beneath the input */
	error?: string;

	/** the caption to show beneath the input */
	caption?: string;

	/** the button to show on the right side of the input */
	button?: Pick<FormButtonProps, 'label' | 'onPress' | 'icon'>;

	/** should the input have an icon to the left side */
	hasIcon?: boolean;

	/** should the input have no vertical margins? */
	noMargin?: boolean;

	/** is the input the last in the form? */
	isLast?: boolean;

	/** should the input be disabled? */
	disabled?: boolean;
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
			type: 'boolean';
			value: boolean;
			onChange: (value: boolean) => void;
	  }
	| {
			type: Exclude<FormSchemaFieldType, 'date' | 'time' | 'boolean'>;
			value: string;
			onChange: (value: string) => void;
	  }
);

export const FormControl = ({
	containerStyle,
	type,
	value,
	onChange,
	onSubmit,
	label,
	error,
	caption,
	button,
	hasIcon,
	noMargin,
	isLast,
	disabled,
}: FormControlProps) => {
	const [isSecret, setIsSecret] = useState<boolean>(true);
	const [showingPicker, setShowingPicker] = useState<boolean>(false);

	const switchRef = useRef<NativeSwitch>(null);
	const inputRef = useRef<NativeTextInput>(null);

	const lineFlex = {
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'nowrap',
		alignContent: 'center',
		gap: isSmallerScreen ? 5 : 10,
	} satisfies StyleProp<ViewStyle>;

	const inputJsx =
		type === 'boolean' ? (
			<View style={lineFlex}>
				<Text variant='labelMedium'>{label}</Text>
				<Switch
					ref={switchRef}
					value={value}
					disabled={disabled}
					onValueChange={onChange}
				/>
			</View>
		) : (
			<TextInput
				ref={inputRef}
				label={label}
				keyboardType={keyboardTypes[type]}
				returnKeyType={isLast ? 'done' : 'next'}
				secureTextEntry={type === 'password' && isSecret}
				error={Boolean(error)}
				disabled={disabled}
				editable={type === 'date' || type === 'time'}
				left={hasIcon ? <AppIcon name={icons[type]} /> : undefined}
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
				onChangeText={type === 'date' || type === 'time' ? undefined : onChange}
				onSubmitEditing={() => {
					if (!isLast) return;
					onSubmit?.();
				}}
			/>
		);

	return (
		<View
			style={[
				{ marginBottom: noMargin ? 0 : isSmallerScreen ? 10 : 20 },
				containerStyle,
			]}
		>
			{button ? (
				<View style={lineFlex}>
					{inputJsx}
					<FormButton
						style={{ flex: 0 }}
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
