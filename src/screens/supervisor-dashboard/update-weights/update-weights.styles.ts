import { StyleSheet } from 'react-native';
import { isSmallerScreen } from 'src/config';

const gap = isSmallerScreen ? 10 : 20;

export const updateWeightsStyles = StyleSheet.create({
	container: {
		padding: gap,
		flexGrow: 1,
		flexShrink: 1,
		overflow: 'hidden',
	},
	table: {
		height: 'auto',
	},
	tableHead: {
		backgroundColor: 'transparent',
		color: 'red',
	},
	addButton: {
		marginTop: gap,
		marginBottom: gap,
		maxWidth: 200,
		borderRadius: 20,
	},
	submitButton: {
		marginTop: 'auto',
		width: 250,
		marginLeft: 'auto',
		marginRight: 'auto',
		borderRadius: 20,
	},
	summaryContainer: {
		flexShrink: 0,
	},
	summaryTable: {
		marginTop: gap,
		flex: 0,
		width: '75%',
		marginLeft: 'auto',
		marginRight: 'auto',
		flexShrink: 0,
	},
});
