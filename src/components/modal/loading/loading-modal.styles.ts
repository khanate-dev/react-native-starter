import { StyleSheet } from 'react-native';

export const loadingModalStyles = StyleSheet.create({
	backdrop: {
		backgroundColor: 'color-primary-900',
		opacity: 0.7,
	},
	modal: {
		padding: 10,
		borderRadius: 100,
		backgroundColor: 'color-primary-100',
		opacity: 0.6,
		shadowRadius: 6.27,
	},
});
