import { View } from 'react-native';
import { Switch, Text, TouchableRipple } from 'react-native-paper';

import { FormControlWrapper } from './form-control-wrapper.component.tsx';

import { useTheme } from '../../hooks/theme.hook.tsx';
import { Icon } from '../app/icon.component.tsx';

import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { SwitchProps } from 'react-native-paper';
import type { FormControlWrapperProps } from './form-control-wrapper.component.tsx';

type styles = {
	container?: StyleProp<ViewStyle>;
	icon?: StyleProp<ViewStyle>;
	button?: StyleProp<ViewStyle>;
	control?: StyleProp<ViewStyle>;
	text?: StyleProp<TextStyle>;
	switch?: StyleProp<ViewStyle>;
};

export type FormSwitchProps = Pick<
	FormControlWrapperProps,
	'caption' | 'error' | 'onlyRenderHelperOnError'
> &
	Pick<SwitchProps, 'disabled'> & {
		/** the current value of the input field */
		value: boolean;

		/** the function to call when the input changes */
		onChange: (value: boolean) => void;

		/** the styles to apply the control */
		styles?: styles;

		/** the label to show on the field */
		label: string;

		/** should the input have an icon to the left side */
		hasIcon?: boolean;
	};

export const FormSwitch = ({
	value,
	onChange,
	styles,
	label,
	error,
	caption,
	hasIcon,
	disabled,
}: FormSwitchProps) => {
	const theme = useTheme();

	const color = value ? theme.colors.primary : theme.colors.inverseSurface;

	return (
		<FormControlWrapper
			style={styles?.container}
			caption={caption}
			error={error}
			disabled={disabled}
		>
			<TouchableRipple
				onPress={() => {
					onChange(!value);
				}}
			>
				<View
					style={[
						{
							flexDirection: 'row',
							alignItems: 'center',
							flexWrap: 'nowrap',
							alignContent: 'center',
							paddingVertical: 0,
							paddingHorizontal: 15,
							gap: 15,
							borderWidth: 1.5,
							borderColor: color,
							borderRadius: 5,
							backgroundColor: value
								? theme.colors.primaryContainer
								: theme.colors.surface,
						},
						styles?.control,
					]}
				>
					{hasIcon ? (
						<Icon
							style={styles?.icon}
							name={'check'}
							size={20}
							color={theme.colors.onPrimaryContainer}
						/>
					) : undefined}
					<Text
						variant='bodyMedium'
						style={[
							{
								fontWeight: '300',
								color: theme.colors.onPrimaryContainer,
								flexGrow: 1,
							},
							styles?.text,
						]}
					>
						{label}
					</Text>
					<Switch
						value={value}
						disabled={disabled}
						style={[
							{
								padding: 0,
								margin: 0,
								height: 40,
							},
							styles?.switch,
						]}
						onValueChange={onChange}
					/>
				</View>
			</TouchableRipple>
		</FormControlWrapper>
	);
};
