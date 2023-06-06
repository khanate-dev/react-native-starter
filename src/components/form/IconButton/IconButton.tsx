import { useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, useTheme } from '@ui-kitten/components';

import { getIconButtonStyles as getStyles } from './IconButton.styles';

import type { IconButtonProps } from './IconButton.types';

export const IconButton = ({
	iconStyle,
	type = 'basic',
	name,
	iconFill,
	size = 35,
	appearance = 'ghost',
	isRound,
	autoSize,
	hasBorder,
	elevated,
	...parentProps
}: IconButtonProps) => {
	const theme = useTheme();
	const ref = useRef<TouchableOpacity>(null);
	const styles = getStyles(
		theme,
		size,
		appearance,
		type,
		autoSize,
		isRound,
		hasBorder,
		elevated
	);

	const iconColor = theme[`color-${type}-${type === 'basic' ? 900 : 600}`];

	return (
		<TouchableOpacity
			{...parentProps}
			ref={ref}
			activeOpacity={0.5}
			style={[styles.button, parentProps.style]}
		>
			<Icon
				style={[iconStyle, styles.icon]}
				fill={iconFill ?? iconColor}
				name={name}
			/>
		</TouchableOpacity>
	);
};
