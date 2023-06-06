import { StyleSheet } from 'react-native';
import { isSmallerScreen } from 'src/config';

export const forgotPasswordStyles = StyleSheet.create({
	header: {
		backgroundColor: 'color-primary-500',
		flexDirection: 'row',
		padding: isSmallerScreen ? 20 : 40,
	},
	headerIcon: {
		width: isSmallerScreen ? 50 : 75,
		height: isSmallerScreen ? 50 : 75,
		marginRight: isSmallerScreen ? 10 : 20,
	},
	headerText: {
		color: 'color-primary-100',
	},
	heading: {
		fontSize: isSmallerScreen ? 23 : 30,
	},
	subtitle: {
		fontSize: isSmallerScreen ? 13 : 20,
	},
	form: {
		padding: isSmallerScreen ? 15 : 30,
	},
	inputAction: {
		width: isSmallerScreen ? 125 : 175,
	},
});
