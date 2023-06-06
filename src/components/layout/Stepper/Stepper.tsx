import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import type { StyleProp, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'stretch',
		justifyContent: 'space-between',
	},
	step: {
		flex: 1,
		padding: 5,
		opacity: 0.8,
	},
	label: {
		color: 'color-basic-600',
		textTransform: 'capitalize',
	},
	underline: {
		backgroundColor: 'color-basic-600',
		height: 3,
	},
	labelComplete: {
		color: 'color-success-500',
	},
	labelActive: {
		color: 'color-primary-500',
	},
	underlineComplete: {
		backgroundColor: 'color-success-500',
	},
	underlineActive: {
		backgroundColor: 'color-primary-500',
	},
});

export type StepperProps = {
	style?: StyleProp<ViewStyle>;
	steps: string[];
	currentStep: string;
	removePrefix?: string;
};

export const Stepper = ({
	style,
	steps,
	currentStep,
	removePrefix,
}: StepperProps) => {
	const theme = useTheme();

	return (
		<View style={[style, styles.container]}>
			{steps.map((step, index) => (
				<View
					key={step}
					style={styles.step}
				>
					<Text
						category='c2'
						appearance='hint'
						style={[
							styles.label,
							steps.indexOf(currentStep) > index && styles.labelComplete,
							step === currentStep && styles.labelActive,
						]}
						status={
							steps.indexOf(currentStep) > index
								? 'success'
								: step === currentStep
								? 'primary'
								: 'basic'
						}
					>
						{removePrefix ? step.replace(removePrefix, '') : step}
					</Text>

					<View
						style={[
							styles.underline,
							steps.indexOf(currentStep) > index && styles.underlineComplete,
							step === currentStep && styles.underlineActive,
						]}
					/>
				</View>
			))}
		</View>
	);
};
