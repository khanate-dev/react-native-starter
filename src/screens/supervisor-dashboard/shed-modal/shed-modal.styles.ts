import { StyleSheet } from 'react-native';

export const shedModalStyles = StyleSheet.create({
	backdrop: {
		backgroundColor: 'color-basic-800',
		opacity: 0.7,
	},
	modal: {
		padding: 50,
		borderRadius: 20,
		elevation: 10,
		width: 340,
		maxWidth: '100%',
		minHeight: 425,
		backgroundColor: 'background-basic-color-1',
	},
	heading: {
		textAlign: 'center',
		fontSize: 25,
		marginBottom: 10,
	},
});
