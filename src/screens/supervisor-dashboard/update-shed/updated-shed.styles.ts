import { StyleSheet } from 'react-native';
import { isSmallerScreen } from 'src/config';

export const updateShedsStyles = StyleSheet.create({
	container: {
		padding: isSmallerScreen ? 10 : 15,
		flexGrow: 1,
		flexShrink: 1,
	},
	heading: {
		fontSize: isSmallerScreen ? 22 : 24,
		fontWeight: '700',
		marginBottom: isSmallerScreen ? 10 : 20,
		textAlign: 'center',
		textTransform: 'capitalize',
	},
	headingDark: {
		color: 'text-alternate-color',
		fontWeight: '400',
	},
	summaryContainer: {
		flexDirection: 'row',
		flexWrap: 'nowrap',
	},
	summary: {
		padding: isSmallerScreen ? 5 : 10,
		borderRadius: 5,
		borderWidth: 2,
		borderColor: 'color-basic-focus-border',
		backgroundColor: 'background-basic-color-2',
		marginBottom: isSmallerScreen ? 10 : 20,
		flexGrow: 1,
		flexShrink: 1,
	},
	dangerSummary: {
		borderColor: 'text-danger-color',
		backgroundColor: 'color-danger-transparent-focus',
	},
	successSummary: {
		marginLeft: 15,
		borderColor: 'text-success-color',
		backgroundColor: 'color-success-transparent-focus',
	},
	summaryLabel: {
		textAlign: 'center',
		color: 'text-hint-color',
		fontSize: isSmallerScreen ? 13 : 15,
	},
	dangerSummaryLabel: {
		color: 'text-danger-color',
	},
	successSummaryLabel: {
		color: 'text-success-color',
	},
	summaryValue: {
		marginTop: 5,
		textAlign: 'center',
		fontSize: isSmallerScreen ? 13 : 15,
		fontWeight: '900',
		color: 'text-basic-color',
	},
	dangerSummaryValue: {
		color: 'text-danger-color',
	},
	successSummaryValue: {
		color: 'text-success-color',
	},
});
