import { StyleSheet } from 'react-native';
import { isSmallerScreen } from 'src/config';

import { sharedStyles } from 'styles/shared';

export const getAlertStyles = (
	foregroundColor: string,
	backgroundColor: string,
	iconSize?: number,
	hasIcon?: boolean
) =>
	StyleSheet.create({
		container: {
			...sharedStyles.rowFlex,
			borderRadius: 10,
			borderWidth: 2,
			paddingHorizontal: 10,
			minHeight: isSmallerScreen ? 40 : 50,
			maxHeight: isSmallerScreen ? 40 : 50,
			backgroundColor,
			borderColor: foregroundColor,
		},
		icon: {
			width: iconSize,
			height: iconSize,
			color: foregroundColor,
		},
		text: {
			flex: 1,
			fontSize: isSmallerScreen ? 12 : 13,
			paddingLeft: hasIcon ? 10 : undefined,
			color: foregroundColor,
			textTransform: 'capitalize',
		},
	});
