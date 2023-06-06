import { Dimensions, StyleSheet } from 'react-native';

const isSmallerScreen = Dimensions.get('screen').height <= 750;
const headerHeight = isSmallerScreen ? 250 : 300;
const loginBackgroundAspectRatio = 0.560893385;

export const loginStyles = StyleSheet.create({
	header: {
		height: headerHeight,
		maxHeight: headerHeight,
		position: 'relative',
	},
	back: {
		marginTop: 30,
		marginLeft: 30,
		borderRadius: 5,
		marginBottom: 15,
	},
	headerImage: {
		position: 'absolute',
		maxHeight: headerHeight,
		maxWidth: headerHeight * loginBackgroundAspectRatio,
		bottom: 0,
		right: 0,
	},
	headerText: {
		marginLeft: 30,
	},
	form: {
		flexGrow: 1,
		flexShrink: 0,
		padding: isSmallerScreen ? 10 : 30,
	},
	lastInput: {
		marginBottom: 'auto',
	},
	forgotButton: {
		marginTop: 0,
		marginBottom: isSmallerScreen ? 10 : 20,
		padding: 0,
		width: 200,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
});
