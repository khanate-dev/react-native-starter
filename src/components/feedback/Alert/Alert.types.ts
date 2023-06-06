import type { StyleProp, ViewStyle } from 'react-native';
import type { AlertStatus, ThemeColors } from 'types/general';

export type AlertBaseProps = {
	style?: StyleProp<ViewStyle>;
	text?: string;
	type?: ThemeColors;
	state?: AlertStatus;
	hasIcon?: boolean;
	onClose?: () => void;
};

export type AlertWithStateProps = {
	text?: undefined;
	type?: undefined;
	state: AlertStatus;
} & AlertBaseProps;

export type AlertWithoutStateProps = {
	text: string;
	type: ThemeColors;
	state?: undefined;
} & AlertBaseProps;

export type AlertProps = AlertWithStateProps | AlertWithoutStateProps;
