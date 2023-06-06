import { View, StyleSheet } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import { Text, useTheme } from 'react-native-paper';

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	label: {
		position: 'absolute',
		textAlign: 'center',
		fontWeight: '900',
	},
});

export type ProgressProps = {
	completed: number;
	size?: number;
	backgroundColor?: string;
	foregroundColor?: string;
	labelColor?: string;
};

export const Progress = ({
	completed,
	size = 70,
	backgroundColor,
	foregroundColor,
	labelColor,
}: ProgressProps) => {
	const theme = useTheme();

	const radius = 70;
	const strokeWidth = Math.min(Math.floor(size / 3), 25);
	const fontSize = Math.min(Math.floor(size / 4.5), 25);
	const circleCircumference = 2 * Math.PI * radius;
	const completePercent = Math.max(Math.min(completed, 100), 0);
	const completeStrokeDashoffset =
		circleCircumference - (circleCircumference * completePercent) / 100;

	const background = backgroundColor ?? theme['color-basic-300'];
	const foreground = foregroundColor ?? theme['color-basic-700'];
	const label = labelColor ?? foreground;

	return (
		<View style={[styles.container]}>
			<Svg
				width={size}
				height={size}
				viewBox='0 0 180 180'
			>
				<Circle
					cx='50%'
					cy='50%'
					r={radius}
					stroke={background}
					strokeWidth={strokeWidth}
				/>

				<Circle
					cx='50%'
					cy='50%'
					r={radius}
					stroke={foreground}
					strokeWidth={strokeWidth}
					strokeDasharray={circleCircumference}
					strokeDashoffset={completeStrokeDashoffset}
					strokeLinecap='round'
					rotation='-90'
					originX='90'
					originY='90'
				/>
			</Svg>

			<Text style={[styles.label, { fontSize, color: label }]}>
				{completePercent.toFixed(0)}%
			</Text>
		</View>
	);
};
