import { StyleSheet } from 'react-native';
import { isSmallerScreen } from 'src/config';

export const bookSalesStyles = StyleSheet.create({
	container: {
		flex: 1,
		padding: isSmallerScreen ? 5 : 10,
	},
	heading: {
		fontSize: isSmallerScreen ? 20 : 22,
		fontWeight: '700',
		marginBottom: isSmallerScreen ? 10 : 20,
		textTransform: 'capitalize',
		color: 'text-alternate-color',
		paddingHorizontal: isSmallerScreen ? 7 : 10,
	},
	contracts: {
		flexGrow: 1,
		flexShrink: 1,
	},
	contractContainer: {
		padding: isSmallerScreen ? 7 : 10,
	},
	contract: {
		width: '100%',
		borderRadius: 15,
		paddingHorizontal: isSmallerScreen ? 10 : 15,
		paddingVertical: isSmallerScreen ? 5 : 10,
		flexDirection: 'row',
		flexWrap: 'nowrap',
		alignItems: 'center',
		justifyContent: 'space-between',
		elevation: 3,
	},
	contractLabel: {
		fontSize: 22,
		fontWeight: '600',
		color: 'color-basic-100',
	},
	summaryTable: {
		padding: isSmallerScreen ? 5 : 10,
	},
	summaryContainer: {
		flexShrink: 0,
	},
});
