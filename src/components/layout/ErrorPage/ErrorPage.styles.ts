import { StyleSheet } from 'react-native';
import { isSmallerScreen } from 'src/config';

export const errorPageStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		width: isSmallerScreen ? 130 : 150,
		height: isSmallerScreen ? 130 : 150,
	},
	heading: {
		maxWidth: '70%',
		textAlign: 'center',
		fontWeight: '400',
		textTransform: 'capitalize',
		fontSize: isSmallerScreen ? 28 : 30,
	},
	error: {
		maxWidth: '70%',
		marginVertical: isSmallerScreen ? 20 : 30,
		textAlign: 'center',
		fontWeight: '400',
		fontSize: isSmallerScreen ? 14 : 18,
		textTransform: 'capitalize',
		lineHeight: 25,
	},
	button: {
		minWidth: 150,
	},
});
