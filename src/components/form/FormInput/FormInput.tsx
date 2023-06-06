import { useState, forwardRef } from 'react';
import { View } from 'react-native';
import { Icon, Input, useStyleSheet } from '@ui-kitten/components';

import { IconButton } from 'components/form/IconButton';
import { FormButton } from 'components/form/FormButton';
import { FormDatePicker } from 'components/form/FormDatePicker';

import { formInputStyles } from './FormInput.styles';

import type { FormInputProps } from './FormInput.types';
import type { KeyboardTypeOptions } from 'react-native';

const keyboardTypes: Record<FormInputProps['type'], KeyboardTypeOptions> = {
	email: 'email-address',
	float: 'decimal-pad',
	int: 'number-pad',
	phone: 'phone-pad',
	password: 'default',
	string: 'default',
	search: 'default',
	date: 'default',
};

const icons: Record<FormInputProps['type'], string> = {
	email: 'at-outline',
	float: 'hash-outline',
	int: 'hash-outline',
	phone: 'phone-outline',
	password: 'keypad-outline',
	string: 'edit-outline',
	search: 'search-outline',
	date: 'calendar-outline',
};

export const FormInput = forwardRef<Input, FormInputProps>(
	(
		{
			style,
			controlStyle,
			type,
			value,
			error,
			onChange,
			size,
			status,
			button,
			hasIcon,
			noCaption,
			noMargin,
			isLast,
			disabled,
			...textInputProps
		},
		ref
	) => {
		const styles = useStyleSheet(formInputStyles);
		const [isSecret, setIsSecret] = useState<boolean>(true);

		let input: JSX.Element;

		const inputStatus = error ? 'danger' : status;

		if (type === 'date') {
			input = (
				<FormDatePicker
					ref={ref}
					{...(textInputProps as any)}
					value={value}
					size={size ?? 'large'}
					status={inputStatus}
					hasIcon={hasIcon}
					noCaption={noCaption}
					noMargin={noMargin}
					disabled={false}
					style={[
						!noMargin && !button && styles.bottomMargin,
						button && styles.inputWithAction,
						style,
					]}
					controlStyle={[styles.input, controlStyle]}
					onChange={onChange}
				/>
			);
		} else {
			input = (
				<Input
					ref={ref}
					{...textInputProps}
					value={value}
					caption={!noCaption ? error : undefined}
					size={size ?? 'large'}
					keyboardType={keyboardTypes[type]}
					status={inputStatus}
					returnKeyType={isLast ? 'done' : 'next'}
					secureTextEntry={type === 'password' && isSecret}
					style={[
						styles.input,
						!noMargin && !button && styles.bottomMargin,
						button && styles.inputWithAction,
						style,
						controlStyle,
					]}
					accessoryLeft={
						hasIcon
							? (props) => (
									<Icon
										{...props}
										name={icons[type]}
									/>
							  )
							: undefined
					}
					accessoryRight={
						type === 'password'
							? (props) => (
									<IconButton
										{...props}
										name={isSecret ? 'eye' : 'eye-off'}
										autoSize
										onPress={() => setIsSecret((prevIsSecret) => !prevIsSecret)}
									/>
							  )
							: undefined
					}
					disabled={typeof disabled === 'function' ? disabled(value) : disabled}
					onChangeText={onChange}
				/>
			);
		}

		if (!button) return input;

		return (
			<View style={[styles.actionAndInput, !noMargin && styles.bottomMargin]}>
				{input}
				<FormButton
					{...button}
					status={button.status ?? inputStatus}
					size={button.size ?? size ?? 'small'}
					borders={button.borders ?? 'curved'}
					hasBorder={button.hasBorder ?? true}
					style={[
						styles.action,
						button.style,
						Boolean(textInputProps.label) && styles.actionWithLabel,
						Boolean(!noCaption && (error || textInputProps.caption)) &&
							styles.actionWithCaption,
					]}
					disabled={
						(typeof disabled === 'function' ? disabled(value) : disabled) ||
						(typeof button.disabled === 'function'
							? button.disabled(value)
							: button.disabled)
					}
					noMargin
				/>
			</View>
		);
	}
);
