import { StyleSheet } from 'react-native';
import { isSmallerScreen } from 'src/config';

export const viewShedsStyles = StyleSheet.create({
	container: {
		flex: 1,
	},
	heading: {
		fontSize: isSmallerScreen ? 20 : 26,
		fontWeight: '700',
		paddingHorizontal: isSmallerScreen ? 15 : 20,
		color: 'text-alternate-color',
	},
	search: {
		borderRadius: 50,
		borderWidth: 0,
		margin: 0,
		padding: 0,
		paddingHorizontal: isSmallerScreen ? 10 : 30,
		paddingTop: isSmallerScreen ? 10 : 25,
	},
	shedGrid: {
		width: '100%',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		padding: isSmallerScreen ? 5 : 15,
		paddingTop: 0,
	},
});
