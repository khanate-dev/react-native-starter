import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Animated, { SlideInLeft, SlideOutRight } from 'react-native-reanimated';

import { useTheme } from '../../hooks/theme.hook.tsx';
import { Icon } from '../app/icon.component.tsx';
import { IconButton } from '../controls/icon-button.component.tsx';

import type { ThemeColor } from '../../theme';
import type { App } from '../../types/app.types.ts';

export type AlertProps = App.propsWithStyle<{
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
}>;

export const Alert = ({
	style,
	title,
	text,
	type = 'error',
	onClose,
	noIcon,
}: AlertProps) => {
	const theme = useTheme();

	const background = theme.getColor(type, 'container');
	const foreground = theme.getColor(type, 'on-container');

	const textJsx = (
		<Text
			variant='bodySmall'
			numberOfLines={1}
			style={{
				color: foreground,
				lineHeight: 13,
				flexShrink: 1,
			}}
		>
			{text}
		</Text>
	);

	return (
		<Animated.View
			entering={SlideInLeft}
			exiting={SlideOutRight}
			style={[
				{
					flexDirection: 'row',
					alignItems: 'center',
					flexWrap: 'nowrap',
					backgroundColor: background,
					borderWidth: 1.5,
					borderStyle: 'solid',
					borderColor: foreground,
					borderRadius: 5,
				},
				style,
			]}
		>
			{!noIcon && (
				<Icon
					name={theme.icons[type]}
					size={25}
					color={foreground}
					style={{ padding: 5 }}
				/>
			)}

			{title ? (
				<View>
					<Text
						variant='bodyMedium'
						numberOfLines={1}
						style={{
							color: foreground,
							textTransform: 'capitalize',
							lineHeight: 15,
							fontWeight: 'bold',
							flexShrink: 1,
						}}
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
					containerColor={background}
					size={20}
					style={{ padding: 0, margin: 0, marginLeft: 'auto' }}
					onPress={onClose}
				/>
			)}
		</Animated.View>
	);
};
