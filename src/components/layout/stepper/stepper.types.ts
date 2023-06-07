import type { StyleProp, ViewStyle } from 'react-native';

export type StepperProps = {
	style?: StyleProp<ViewStyle>;
	steps: string[];
	currentStep: string;
	removePrefix?: string;
};
