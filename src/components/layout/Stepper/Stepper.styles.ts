import { StyleSheet } from 'react-native';

export const stepperStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'stretch',
		justifyContent: 'space-between',
	},
	step: {
		flex: 1,
		padding: 5,
		opacity: 0.8,
	},
	label: {
		color: 'color-basic-600',
		textTransform: 'capitalize',
	},
	underline: {
		backgroundColor: 'color-basic-600',
		height: 3,
	},
	labelComplete: {
		color: 'color-success-500',
	},
	labelActive: {
		color: 'color-primary-500',
	},
	underlineComplete: {
		backgroundColor: 'color-success-500',
	},
	underlineActive: {
		backgroundColor: 'color-primary-500',
	},
});
