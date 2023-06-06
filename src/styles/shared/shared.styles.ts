import { StyleSheet } from 'react-native';

export const sharedStyles = StyleSheet.create({
	rowFlex: {
		flex: 1,
		flexDirection: 'row',
		flexGrow: 1,
		flexWrap: 'nowrap',
		alignItems: 'center',
	},
	rowFlexChild: {
		flex: 1,
	},
	rowFlexChildNotFirst: {
		marginLeft: 10,
	},
});
