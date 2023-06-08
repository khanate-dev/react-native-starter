import { Text, useTheme } from 'react-native-paper';
import Animated, { SlideInDown, SlideOutUp } from 'react-native-reanimated';
import { View } from 'react-native';

import { getThemeColor, themeColorIcons } from 'styles/theme';
import { AppIcon } from 'components/media/app-icon';
import { isSmallerScreen } from 'src/config';
import { IconButton } from 'components/controls/icon-button';

import type { ThemeColor } from 'styles/theme';

export type AlertProps = {
	/** the title of the alert. Omitting this prop will not render a title */
	title?: string;

	/** the text content for the alert */
	text: string;

	/** the type of the alert. @default `error` */
	type?: ThemeColor;

	/** the callback for when the alert is closed. Omitting would not render a close button */
	onClose?: () => void;

	/** should the icon be shown?  */
	noIcon?: boolean;
};

export const Alert = ({
	title,
	text,
	type = 'error',
	onClose,
	noIcon,
}: AlertProps) => {
	const theme = useTheme();

	const background = getThemeColor(theme, type, 'container');
	const foreground = getThemeColor(theme, type, 'container-contrast');

	const textJsx = (
		<Text
			variant='bodyMedium'
			numberOfLines={1}
			style={{ color: foreground }}
		>
			{text}
		</Text>
	);

	return (
		<Animated.View
			entering={SlideInDown}
			exiting={SlideOutUp}
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				flexWrap: 'nowrap',
				backgroundColor: background,
				padding: isSmallerScreen ? 10 : 15,
				gap: isSmallerScreen ? 5 : 10,
			}}
		>
			{!noIcon && (
				<AppIcon
					name={themeColorIcons[type]}
					size={25}
					color={foreground}
				/>
			)}

			{title ? (
				<View style={{ gap: 5 }}>
					<Text
						variant='titleSmall'
						numberOfLines={1}
						style={{ color: foreground }}
					>
						{title}
					</Text>
					{textJsx}
				</View>
			) : (
				textJsx
			)}

			{onClose && (
				<IconButton
					icon='close'
					iconColor={foreground}
					style={{ marginLeft: 'auto' }}
					onPress={onClose}
				/>
			)}
		</Animated.View>
	);
};
