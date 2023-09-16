import { DeviceEventEmitter, Dimensions, ScrollView, View } from 'react-native';
import { Dialog, Portal, Text } from 'react-native-paper';

import { Icon } from '~/components/app/icon.component';
import { Button } from '~/components/controls/button.component';
import { isSmallerScreen } from '~/config';
import { useI18n } from '~/contexts/i18n.context';
import { useTheme } from '~/hooks/theme';

import type { DialogProps } from 'react-native-paper';
import type { ButtonProps } from '~/components/controls/button.component';
import type { ThemeColor } from '~/theme';

export type AlertModalProps = Pick<
	DialogProps,
	'dismissable' | 'dismissableBackButton'
> & {
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

export const AlertModal = ({
	title: passedTitle,
	text,
	type = 'error',
	closeLabel,
	actions: passedActions,
	onClose,
	noIcon,
	dismissable,
	dismissableBackButton,
}: AlertModalProps) => {
	const theme = useTheme();
	const { content } = useI18n();

	const actions: AlertModalProps['actions'] = [
		...(passedActions ?? []),
		{
			label: closeLabel ?? content.action.close,
			color: 'error',
			icon: 'close',
			onPress: onClose,
		},
	];

	const handleClose = () => {
		DeviceEventEmitter.emit('remove-alert');
		onClose?.();
	};

	const title = passedTitle ?? (type === 'error' ? 'Error' : 'Alert');

	const screenWidth = Dimensions.get('screen').width;
	const screenHeight = Dimensions.get('screen').height;

	return (
		<Portal>
			<Dialog
				dismissable={dismissable}
				dismissableBackButton={dismissableBackButton}
				style={{
					width: screenWidth - (isSmallerScreen ? 50 : 100),
					height: screenHeight - (isSmallerScreen ? 80 : 160),
					marginTop: 'auto',
					marginBottom: 'auto',
					marginLeft: 'auto',
					marginRight: 'auto',
					borderRadius: 10,
					overflow: 'hidden',
					opacity: 0.95,
				}}
				visible
				onDismiss={handleClose}
			>
				<View
					style={[
						theme.styles.view.row,
						{
							backgroundColor: theme.getColor(type),
							padding: 10,
							marginTop: 0,
							gap: 10,
						},
					]}
				>
					{!noIcon && (
						<Icon
							name={theme.icons[type]}
							size={25}
							color={theme.getColor(type, 'on-normal')}
						/>
					)}
					<Text
						variant='titleMedium'
						numberOfLines={1}
						style={{
							textAlign: 'center',
							textTransform: 'capitalize',
							color: theme.getColor(type, 'on-normal'),
						}}
					>
						{title}
					</Text>
				</View>

				<ScrollView
					contentContainerStyle={{
						padding: 15,
						flexGrow: 1,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text
						variant='bodyLarge'
						style={{
							textAlign: 'center',
							fontWeight: 'normal',
							color: theme.getColor(type, 'on-container'),
							lineHeight: 25,
						}}
					>
						{text}
					</Text>
				</ScrollView>

				<View
					style={[
						theme.styles.view.row,
						{ justifyContent: 'center', padding: 10, gap: 10 },
					]}
				>
					{actions.map((action, index) => (
						<Button
							key={index}
							{...action}
							style={[{ flex: 1, maxWidth: 200 }, action.style]}
							onPress={(event) => {
								action.onPress?.(event);
								handleClose();
							}}
						/>
					))}
				</View>
			</Dialog>
		</Portal>
	);
};
