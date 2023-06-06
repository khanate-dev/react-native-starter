import { Text, useTheme } from 'react-native-paper';
import Animated, { SlideInLeft, SlideOutRight } from 'react-native-reanimated';
import { themeColorIcons } from 'helpers/theme';
import { StyleSheet } from 'react-native';
import { isSmallerScreen } from 'src/config';

import { IconButton } from 'components/form/IconButton';
import { sharedStyles } from 'styles/shared';

import type { StyleProp, ViewStyle } from 'react-native';
import type { AlertStatus, ThemeColors } from 'types/general';

const getStyles = (
	foregroundColor: string,
	backgroundColor: string,
	iconSize?: number,
	hasIcon?: boolean
) =>
	StyleSheet.create({
		container: {
			...sharedStyles.rowFlex,
			borderRadius: 10,
			borderWidth: 2,
			paddingHorizontal: 10,
			minHeight: isSmallerScreen ? 40 : 50,
			maxHeight: isSmallerScreen ? 40 : 50,
			backgroundColor,
			borderColor: foregroundColor,
		},
		icon: {
			width: iconSize,
			height: iconSize,
			color: foregroundColor,
		},
		text: {
			flex: 1,
			fontSize: isSmallerScreen ? 12 : 13,
			paddingLeft: hasIcon ? 10 : undefined,
			color: foregroundColor,
			textTransform: 'capitalize',
		},
	});

type AlertBaseProps = {
	style?: StyleProp<ViewStyle>;
	hasIcon?: boolean;
	onClose?: () => void;
};

type AlertWithStateProps = AlertBaseProps & {
	state: AlertStatus;
	text?: undefined;
	type?: undefined;
};

type AlertWithoutStateProps = AlertBaseProps & {
	state?: undefined;
	text: string;
	type: ThemeColors;
};

export type AlertProps = AlertWithStateProps | AlertWithoutStateProps;

export const Alert = ({
	style,
	text,
	type,
	state,
	onClose,
	hasIcon,
}: AlertProps) => {
	const typeToUse: ThemeColors = state
		? typeof state === 'string'
			? 'danger'
			: state.type
		: type ?? 'basic';
	const textToUse: string = state
		? typeof state === 'string'
			? state
			: state.text
		: text ?? '';

	const iconSize = 25;

	const theme = useTheme();
	const foregroundColor = theme[`color-${typeToUse}-600`] ?? '';
	const backgroundColor = theme[`color-${typeToUse}-100`] ?? '';

	const styles = getStyles(foregroundColor, backgroundColor, iconSize, hasIcon);

	if (state === null) return null;

	return (
		<Animated.View
			entering={SlideInLeft.springify()}
			exiting={SlideOutRight.springify()}
			style={[styles.container, style]}
		>
			{hasIcon && (
				<Icon
					style={styles.icon}
					fill={theme[`color-${typeToUse}-600`]}
					name={themeColorIcons[typeToUse]}
				/>
			)}

			<Text
				style={styles.text}
				numberOfLines={1}
			>
				{textToUse}
			</Text>

			{onClose && (
				<IconButton
					name='close-circle-outline'
					iconFill={foregroundColor}
					size={iconSize}
					isRound
					onPress={onClose}
				/>
			)}
		</Animated.View>
	);
};
