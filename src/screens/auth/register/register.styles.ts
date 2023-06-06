import { StyleSheet } from 'react-native';
import { isSmallerScreen } from 'src/config';

export const registerStyles = StyleSheet.create({
	header: {
		paddingHorizontal: isSmallerScreen ? 10 : 30,
		paddingVertical: isSmallerScreen ? 10 : 20,
		flexDirection: 'row',
		alignItems: 'center',
	},
	back: {
		borderRadius: 5,
		marginRight: isSmallerScreen ? 10 : 15,
	},
	marginBottom: {
		marginBottom: 5,
	},
	form: {
		flexGrow: 1,
		flexShrink: 1,
		padding: isSmallerScreen ? 10 : 30,
	},
});
