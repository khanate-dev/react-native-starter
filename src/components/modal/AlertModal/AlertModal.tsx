import { DeviceEventEmitter, View } from 'react-native';
import { Icon, Modal, Text, useTheme } from 'react-native-paper';
import Animated, { SlideInLeft, SlideOutRight } from 'react-native-reanimated';
import { themeColorIcons } from 'helpers/theme';

import { FormButton } from 'components/form/FormButton';

import { getAlertModalStyles as getStyles } from './AlertModal.styles';

import type { ModalProps } from 'react-native-paper';
import type { ThemeColors } from 'types/general';
import type { FormButtonProps } from 'components/form/FormButton';

export type AlertModalProps = {
	title?: string;
	text: string;
	type?: Exclude<ThemeColors, 'control'>;
	closeLabel?: string;
	actions?: FormButtonProps[];
	onClose?: () => void;
	noIcon?: boolean;
} & Pick<ModalProps, 'style' | 'backdropStyle'>;

export const AlertModal = ({
	style,
	backdropStyle,
	title: passedTitle,
	text,
	type = 'danger',
	closeLabel,
	actions: passedActions,
	onClose,
	noIcon,
}: AlertModalProps) => {
	const theme = useTheme();
	const styles = getStyles(theme, type, noIcon);

	const actions: AlertModalProps['actions'] = [
		...(passedActions ?? []),
		{
			label: closeLabel ?? 'Close',
			onPress: onClose,
			status: type === 'basic' ? 'basic' : 'control',
		},
	];

	const handleClose = () => {
		DeviceEventEmitter.emit('remove-alert');
		onClose?.();
	};

	const title = passedTitle ?? (type === 'danger' ? 'Error' : 'Alert');

	return (
		<Modal
			style={[styles.modal, style]}
			backdropStyle={[styles.backdrop, backdropStyle]}
			visible
			onBackdropPress={handleClose}
		>
			<Animated.View
				style={styles.header}
				entering={SlideInLeft}
				exiting={SlideOutRight}
			>
				{!noIcon && (
					<View style={styles.iconContainer}>
						<Icon
							fill='#ffffff'
							name={themeColorIcons[type]}
						/>
					</View>
				)}

				<Text
					style={styles.title}
					category='h6'
					numberOfLines={1}
				>
					{title}
				</Text>
			</Animated.View>

			<Animated.ScrollView
				contentContainerStyle={styles.body}
				entering={SlideInLeft}
				exiting={SlideOutRight}
			>
				<Text
					style={styles.text}
					category='s1'
				>
					{text}
				</Text>
			</Animated.ScrollView>

			<Animated.View
				style={styles.actions}
				entering={SlideInLeft}
				exiting={SlideOutRight}
			>
				{actions.map((action, index) => (
					<FormButton
						key={index}
						{...action}
						borders={action.borders ?? 'curved'}
						status={action.status ?? (type === 'basic' ? 'primary' : type)}
						appearance={action.appearance ?? 'filled'}
						size={action.size ?? 'medium'}
						style={[styles.action, action.style, index > 0 && styles.notFirst]}
						noMargin
						onPress={(event) => {
							action.onPress?.(event);
							handleClose();
						}}
					/>
				))}
			</Animated.View>
		</Modal>
	);
};
