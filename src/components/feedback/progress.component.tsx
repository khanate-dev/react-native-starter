import { useEffect } from 'react';
import { TextInput, View } from 'react-native';
import Animated, {
	useAnimatedProps,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { Circle, default as Svg } from 'react-native-svg';

import { useTheme } from '../../hooks/theme.hook.js';

import type { TextInputProps } from 'react-native';
import type { CircleProps } from 'react-native-svg';
import type { App } from '../../types/app.types.js';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(TextInput);
Animated.addWhitelistedNativeProps({ text: true });

export type ProgressProps = App.propsWithStyle<{
	/** the duration of the progress in ms */
	duration: number;

	/** the size of the progress ring. @default `90` */
	size?: number;

	/** the background color of the circle */
	circleBackground?: CircleProps['fill'];

	/** the background opacity of the circle */
	circleBackgroundOpacity?: CircleProps['fillOpacity'];

	/** the color of the progress circle */
	circleColor?: CircleProps['stroke'];

	/** the opacity of the progress circle */
	circleOpacity?: CircleProps['strokeOpacity'];

	/** the callback function when the animation starts */
	onStart?: () => void;

	/** should a text label showing the progress percentage be shown */
	label?: boolean;
}>;

export const Progress = ({
	style,
	duration,
	size = 45,
	circleBackground,
	circleBackgroundOpacity,
	circleColor,
	circleOpacity,
	onStart,
	label,
}: ProgressProps) => {
	const theme = useTheme();

	const radius = size / 2;
	const circumference = radius * Math.PI * 2;

	const strokeOffset = useSharedValue(circumference);

	const percentage = useDerivedValue(() => {
		const number = ((circumference - strokeOffset.value) / circumference) * 100;
		return withTiming(number, { duration });
	});

	const animatedCircleProps = useAnimatedProps<CircleProps>(() => ({
		strokeDashoffset: withTiming(strokeOffset.value, { duration }),
	}));

	const animatedTextProps = useAnimatedProps<TextInputProps>(() => {
		return {
			text: `${Math.round(percentage.value)}%`,
		} as never;
	});

	useEffect(() => {
		strokeOffset.value = 0;
		onStart?.();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<View
			style={[
				{
					justifyContent: 'center',
					alignItems: 'center',
					width: size,
					height: size,
					position: 'relative',
				},
				style,
			]}
		>
			<Svg
				height='100%'
				width='100%'
				viewBox='0 0 100 100'
			>
				<AnimatedCircle
					animatedProps={animatedCircleProps}
					cx={50}
					cy={50}
					r={radius}
					stroke={circleColor ?? theme.colors.onSurfaceVariant}
					strokeOpacity={circleOpacity}
					fill={circleBackground ?? theme.colors.surfaceVariant}
					fillOpacity={circleBackgroundOpacity}
					strokeWidth={radius / 4}
					strokeDasharray={circumference}
				/>
			</Svg>
			{label && (
				<AnimatedText
					animatedProps={animatedTextProps}
					editable={false}
					underlineColorAndroid='transparent'
					style={{
						position: 'absolute',
						fontSize: radius / 2.5,
						fontWeight: 'bold',
						color: circleColor ?? theme.colors.onSurfaceVariant,
					}}
				/>
			)}
		</View>
	);
};
