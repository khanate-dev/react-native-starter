import { Dimensions, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { isSmallerScreen } from 'src/config';

import type { ThemeType } from '@ui-kitten/components';
import type { ThemeColors } from 'types/general';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export const getAlertModalStyles = (
	theme: ThemeType,
	type: ThemeColors,
	noIcon?: boolean
) => {
	const background = theme[`color-${type}-100`];
	const foreground = theme[`color-${type}-700`];

	return StyleSheet.create({
		backdrop: {
			backgroundColor: theme[`color-${type}-900`],
			opacity: 0.8,
		},
		modal: {
			width: screenWidth - (isSmallerScreen ? 50 : 150),
			maxHeight:
				screenHeight - Constants.statusBarHeight - (isSmallerScreen ? 50 : 120),
			marginTop: 10,
			flex: 1,
			borderRadius: 15,
			backgroundColor: background,
			opacity: 0.9,
			overflow: 'hidden',
		},
		header: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: background,
			padding: 15,
		},
		iconContainer: {
			width: 35,
			height: 35,
			padding: 5,
			backgroundColor: theme[`color-${type}-500`],
			borderRadius: 25,
		},
		title: {
			textAlign: 'center',
			marginLeft: !noIcon ? 15 : undefined,
			color: theme[`color-${type}-500`],
		},
		body: {
			padding: 15,
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			minHeight: 200,
		},
		text: {
			textAlign: 'center',
			fontWeight: 'normal',
			color: foreground,
			lineHeight: 25,
		},
		actions: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: background,
			padding: 15,
		},
		action: {
			flex: 1,
			maxWidth: 200,
		},
		notFirst: {
			marginLeft: 15,
		},
	});
};
