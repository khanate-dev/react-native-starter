import { DeviceEventEmitter, Dimensions, View } from 'react-native';
import { Dialog, Portal, Text, useTheme } from 'react-native-paper';
import Animated, { SlideInLeft, SlideOutRight } from 'react-native-reanimated';
import Constants from 'expo-constants';

import { getThemeColor, themeColorIcons } from 'styles/theme';
import { Button } from 'components/controls/button';
import { AppIcon } from 'components/media/app-icon';
import { isSmallerScreen } from 'src/config';

import type { ButtonProps } from 'components/controls/button';
import type { ThemeColor } from 'styles/theme';

export type AlertModalProps = {
	/** the title of the dialog */
	title?: string;

	/** the text content for the alert */
	text: string;

	/** the type of the alert. @default `error` */
	type?: ThemeColor;

	/** the label for the close button. @default `Close` */
	closeLabel?: string;

	/** the actions for the alert */
	actions?: ButtonProps[];

	/** the callback for when the alert is closed */
	onClose?: () => void;

	/** should the icon be shown?  */
	noIcon?: boolean;
};

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export const AlertModal = ({
	title: passedTitle,
	text,
	type = 'error',
	closeLabel,
	actions: passedActions,
	onClose,
	noIcon,
}: AlertModalProps) => {
	const theme = useTheme();

	const actions: AlertModalProps['actions'] = [
		...(passedActions ?? []),
		{
			label: closeLabel ?? 'Close',
			mode: 'outlined',
			onPress: onClose,
		},
	];

	const handleClose = () => {
		DeviceEventEmitter.emit('remove-alert');
		onClose?.();
	};

	const title = passedTitle ?? (type === 'error' ? 'Error' : 'Alert');

	return (
		<Portal>
			<Dialog
				style={{
					width: screenWidth - (isSmallerScreen ? 50 : 150),
					maxHeight:
						screenHeight -
						Constants.statusBarHeight -
						(isSmallerScreen ? 50 : 120),
					marginTop: 10,
					flex: 1,
					borderRadius: 15,
					opacity: 0.9,
					overflow: 'hidden',
				}}
				visible
				onDismiss={handleClose}
			>
				<Animated.View
					entering={SlideInLeft}
					exiting={SlideOutRight}
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: getThemeColor(theme, type, 'container'),
						padding: 15,
					}}
				>
					{!noIcon && (
						<View
							style={{
								width: 35,
								height: 35,
								padding: 5,
								borderRadius: 25,
							}}
						>
							<AppIcon
								name={themeColorIcons[type]}
								size={25}
								color='#fff'
							/>
						</View>
					)}

					<Text
						variant='titleSmall'
						numberOfLines={1}
						style={{
							textAlign: 'center',
							marginLeft: !noIcon ? 15 : undefined,
							color: getThemeColor(theme, type, 'container-contrast'),
						}}
					>
						{title}
					</Text>
				</Animated.View>

				<Animated.ScrollView
					entering={SlideInLeft}
					exiting={SlideOutRight}
					contentContainerStyle={{
						padding: 15,
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						minHeight: 200,
					}}
				>
					<Text
						variant='bodyMedium'
						style={{
							textAlign: 'center',
							fontWeight: 'normal',
							color: getThemeColor(theme, type, 'container-contrast'),
							lineHeight: 25,
						}}
					>
						{text}
					</Text>
				</Animated.ScrollView>

				<Animated.View
					entering={SlideInLeft}
					exiting={SlideOutRight}
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						padding: 15,
					}}
				>
					{actions.map((action, index) => (
						<Button
							key={index}
							{...action}
							mode={action.mode ?? 'contained'}
							style={[
								{ flex: 1, maxWidth: 200 },
								action.style,
								index > 0 && { marginLeft: 15 },
							]}
							onPress={(event) => {
								action.onPress?.(event);
								handleClose();
							}}
						/>
					))}
				</Animated.View>
			</Dialog>
		</Portal>
	);
};
