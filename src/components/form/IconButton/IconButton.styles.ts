import { StyleSheet } from 'react-native';

import type { ThemeType } from '@ui-kitten/components';
import type { IconButtonProps } from './IconButton.types';

export const getIconButtonStyles = (
	theme: ThemeType,
	size: number,
	appearance: Exclude<IconButtonProps['appearance'], undefined>,
	type: Exclude<IconButtonProps['type'], undefined>,
	autoSize?: boolean,
	isRound?: boolean,
	hasBorder?: boolean,
	elevated?: boolean
) =>
	StyleSheet.create({
		button: {
			width: !autoSize ? size : undefined,
			height: !autoSize ? size : undefined,
			borderRadius: isRound ? (autoSize ? 50 : size / 2) : undefined,
			backgroundColor:
				appearance === 'filled'
					? type === 'basic'
						? theme['background-basic-color-1']
						: theme[`color-${type}-500`]
					: undefined,
			borderColor:
				appearance === 'outline' || (appearance === 'filled' && hasBorder)
					? theme[`color-${type}-600`]
					: undefined,
			borderWidth:
				appearance === 'outline' || (appearance === 'filled' && hasBorder)
					? 2
					: undefined,
			elevation: elevated ? 3 : undefined,
		},
		icon: {
			width: '100%',
			height: '100%',
		},
	});
