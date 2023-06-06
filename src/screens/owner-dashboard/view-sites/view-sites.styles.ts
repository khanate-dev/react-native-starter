import { StyleSheet } from 'react-native';
import { isSmallerScreen } from 'src/config';

export const viewSitesStyles = StyleSheet.create({
	container: {
		flex: 1,
	},
	heading: {
		fontSize: isSmallerScreen ? 20 : 26,
		fontWeight: '700',
		paddingHorizontal: isSmallerScreen ? 15 : 20,
	},
	subHeading: {
		fontSize: isSmallerScreen ? 10 : 16,
		fontWeight: '300',
		paddingBottom: isSmallerScreen ? 5 : 10,
		paddingHorizontal: isSmallerScreen ? 15 : 20,
	},
	search: {
		borderRadius: 10,
		borderColor: 'color-basic-600',
		borderWidth: 2,
		margin: 0,
		paddingHorizontal: isSmallerScreen ? 15 : 20,
	},
	shedGrid: {
		width: '100%',
		flexDirection: 'row',
		flexGrow: 1,
		flexShrink: 1,
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		paddingHorizontal: isSmallerScreen ? 5 : 10,
	},
	button: {
		margin: isSmallerScreen ? 15 : 20,
		marginLeft: 'auto',
		padding: 10,
	},
});
