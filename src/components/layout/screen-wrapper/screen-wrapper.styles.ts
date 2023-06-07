import { Dimensions, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const isSmallerScreen = Dimensions.get('screen').height < 750;
const marginLeft = isSmallerScreen ? 10 : 15;

export const screenWrapperStyles = StyleSheet.create({
	safeArea: {
		flex: 1,
		marginTop: Constants.statusBarHeight,
	},
	container: {
		flex: 1,
		position: 'relative',
	},
	dark: {
		backgroundColor: 'background-alternative-color-1',
	},
	background: {
		position: 'absolute',
		zIndex: 0,
		width: '100%',
		height: '100%',
		resizeMode: 'stretch',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 50,
		width: '100%',
		padding: 5,
		flexWrap: 'nowrap',
	},
	headerLeft: {
		flex: 1,
		flexShrink: 1,
		height: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		overflow: 'hidden',
	},
	headerRight: {
		flex: 1,
		flexShrink: 1,
		height: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	back: {
		borderRadius: 5,
	},
	title: {
		marginLeft,
		fontWeight: 'bold',
		color: 'color-primary-600',
		fontSize: 14,
		overflow: 'hidden',
		textTransform: 'capitalize',
	},
	logout: {
		padding: 5,
		borderRadius: 5,
	},
	userIcon: {
		marginLeft,
		width: 30,
		height: 30,
		borderColor: 'color-primary-700',
		borderWidth: 3,
		borderRadius: 20,
		backgroundColor: 'color-primary-300',
	},
	themeToggle: {
		marginLeft,
		padding: 5,
		borderRadius: 5,
	},
	screen: {
		flex: 1,
	},
});
