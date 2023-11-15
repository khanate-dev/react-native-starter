import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { useTheme } from '../../hooks/theme.hook';

import type { App } from '../../types/app.types';

export type StepperProps<T extends readonly string[]> = App.propsWithStyle<{
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
					flexWrap: 'nowrap',
					gap: 5,
				},
				style,
			]}
		>
			{steps.map((step, index) => {
				const color = theme.getColor(
					step === currentStep
						? 'primary'
						: steps.indexOf(currentStep) > index
						? 'success'
						: 'error',
				);
				return (
					<View
						key={step}
						style={{ flex: 1, gap: 2 }}
					>
						<Text
							variant='labelMedium'
							style={{
								textTransform: 'capitalize',
								color,
								textAlign: 'center',
							}}
						>
							{removePrefix ? step.replace(removePrefix, '') : step}
						</Text>

						<View style={{ height: 3, backgroundColor: color }} />
					</View>
				);
			})}
		</View>
	);
};
