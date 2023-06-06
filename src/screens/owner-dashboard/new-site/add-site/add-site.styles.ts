import { Dimensions, StyleSheet } from 'react-native';

const screenHeight = Dimensions.get('screen').height;
const isSmallerScreen = screenHeight < 1000;
const mapHeight = isSmallerScreen ? 400 : screenHeight - 650;
const smallerMapHeight = isSmallerScreen ? mapHeight : mapHeight - 60;

export const addSiteStyles = StyleSheet.create({
	geoLocation: {
		width: 125,
	},
	mapLabel: {
		paddingLeft: 5,
		fontWeight: 'bold',
		paddingVertical: 5,
	},
	mapContainer: {
		height: mapHeight,
		margin: 5,
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
	},
	mapWithStatus: {
		height: smallerMapHeight,
	},
	map: {
		width: '100%',
		height: '100%',
	},
	horizontalLine: {
		position: 'absolute',
		top: '50%',
		left: 0,
		width: '100%',
		height: 0,
		borderWidth: 1,
		borderStyle: 'dotted',
		borderColor: 'color-primary-500',
		zIndex: 10,
	},
	verticalLine: {
		position: 'absolute',
		top: 0,
		left: '50%',
		width: 0,
		height: '100%',
		borderWidth: 1,
		borderStyle: 'dotted',
		borderColor: 'color-primary-500',
		zIndex: 10,
	},
	mapActions: {
		position: 'absolute',
		top: 10,
		left: 10,
		zIndex: 15,
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
	},
	mapActionNotFirst: {
		marginTop: 10,
	},
});
