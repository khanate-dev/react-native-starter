import { useRef } from 'react';
import { View } from 'react-native';
import { Switch, Text, TouchableRipple } from 'react-native-paper';

import { Icon } from '~/components/app/icon.component';
import { FormControlWrapper } from '~/components/controls/form-control-wrapper.component';
import { useTheme } from '~/hooks/theme.hook';

import type { Switch as RefType, StyleProp, ViewStyle } from 'react-native';
import type { SwitchProps } from 'react-native-paper';

type styles = {
	container?: StyleProp<ViewStyle>;
	icon?: StyleProp<ViewStyle>;
	button?: StyleProp<ViewStyle>;
	control?: StyleProp<ViewStyle>;
};

export type FormSwitchProps = Pick<SwitchProps, 'disabled'> & {
	/** the current value of the input field */
	value: boolean;

	/** the function to call when the input changes */
	onChange: (value: boolean) => void;

	/** the styles to apply the control */
	styles?: styles;

	/** the label to show on the field */
	label: string;

	/** the error message to show beneath the input */
	error?: string;

	/** the caption to show beneath the input */
	caption?: string;

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
	const switchRef = useRef<RefType>(null);

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
					style={{
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
					}}
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
						style={{
							fontWeight: '300',
							color: theme.colors.onPrimaryContainer,
							flexGrow: 1,
						}}
					>
						{label}
					</Text>
					<Switch
						ref={switchRef}
						value={value}
						disabled={disabled}
						style={{
							padding: 0,
							margin: 0,
							height: 40,
						}}
						onValueChange={onChange}
					/>
				</View>
			</TouchableRipple>
		</FormControlWrapper>
	);
};
