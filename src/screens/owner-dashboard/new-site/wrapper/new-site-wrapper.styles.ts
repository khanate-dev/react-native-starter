import { StyleSheet } from 'react-native';
import { isSmallerScreen } from 'src/config';

export const addSiteWrapperStyles = StyleSheet.create({
	container: {
		paddingVertical: isSmallerScreen ? 10 : 15,
		paddingHorizontal: isSmallerScreen ? 10 : 15,
		paddingTop: 0,
	},
	marginBottom: {
		marginBottom: 5,
	},
	stepper: {
		marginBottom: 10,
	},
	button: {
		marginTop: 10,
	},
});
