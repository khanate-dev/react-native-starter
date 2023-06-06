import { StyleSheet } from 'react-native';

import { sharedStyles } from 'styles/shared';

const { rowFlex, rowFlexChild, rowFlexChildNotFirst } = sharedStyles;

export const addShedsStyles = StyleSheet.create({
	chipContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginVertical: 10,
	},
	chip: {
		width: '24%',
		maxWidth: '24%',
		minWidth: '24%',
	},
	chipNotFirstRow: {
		marginTop: 5,
	},
	chipNotLastColumn: {
		marginRight: 5,
	},
	rowFlex,
	rowFlexChild,
	rowFlexChildNotFirst,
});
