import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { useTheme } from '~/hooks/theme';

import type { App } from '~/types/app';

export type StepperProps<T extends readonly string[]> = App.PropsWithStyle<{
	/** the list of step names */
	steps: T;

	/** the name of the current step */
	currentStep: T[number];

	/** remove this prefix from all step labels */
	removePrefix?: string;
}>;

// TODO AFTER UPDATING TO SDK 49: use const here
export const Stepper = <T extends readonly string[]>({
	style,
	steps,
	currentStep,
	removePrefix,
}: StepperProps<T>) => {
	const theme = useTheme();

	return (
		<View
			style={[
				{
					flexDirection: 'row',
					alignItems: 'stretch',
					justifyContent: 'space-between',
				},
				style,
			]}
		>
			{steps.map((step, index) => (
				<View
					key={step}
					style={{ flex: 1, padding: 5, opacity: 0.8 }}
				>
					<Text
						variant='headlineMedium'
						style={{
							textTransform: 'capitalize',
							opacity: 0.5,
							color: theme.getColor(
								step === currentStep
									? 'primary'
									: steps.indexOf(currentStep) > index
									? 'success'
									: 'error'
							),
						}}
					>
						{removePrefix ? step.replace(removePrefix, '') : step}
					</Text>

					<View
						style={[
							{
								height: 3,
								opacity: 0.5,
								backgroundColor: theme.getColor(
									step === currentStep
										? 'primary'
										: steps.indexOf(currentStep) > index
										? 'success'
										: 'error',
									'container'
								),
							},
						]}
					/>
				</View>
			))}
		</View>
	);
};
