import { View } from 'react-native';
import { Switch, Text, useTheme } from 'react-native-paper';

import { isSmallerScreen } from 'src/config';
import { AppIcon } from 'components/media/app-icon';
import { FormControlWrapper } from 'components/controls/form-control-wrapper';

import type { SwitchProps } from 'react-native-paper';
import type { StyleProp, ViewStyle } from 'react-native';

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
	return (
		<FormControlWrapper
			style={styles?.container}
			caption={caption}
			error={error}
			disabled={disabled}
		>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					flexWrap: 'nowrap',
					alignContent: 'center',
					gap: isSmallerScreen ? 5 : 10,
					borderWidth: 1.5,
					borderColor: value
						? theme.colors.primary
						: theme.colors.inverseSurface,
				}}
			>
				{hasIcon ? (
					<AppIcon
						style={styles?.icon}
						name={'check'}
					/>
				) : undefined}
				<Text variant='labelMedium'>{label}</Text>
				<Switch
					style={styles?.control}
					value={value}
					disabled={disabled}
					onValueChange={onChange}
				/>
			</View>
		</FormControlWrapper>
	);
};
