import { StyleSheet } from 'react-native';

export const authStartStyles = StyleSheet.create({
	container: {
		flex: 1,
	},
	background: {
		opacity: 0.8,
		position: 'absolute',
	},
	content: {
		flex: 1,
		padding: 40,
	},
	logo: {
		borderWidth: 2,
		borderColor: 'color-primary-500',
		padding: 10,
		width: 80,
		height: 80,
		aspectRatio: 1,
		borderRadius: 10,
		overflow: 'hidden',
		backgroundColor: 'color-basic-100',
		shadowRadius: 6.27,
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		elevation: 10,
		marginBottom: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		color: 'color-basic-100',
		fontWeight: 'normal',
		textShadowColor: 'color-primary-900',
		textShadowRadius: 10,
		textShadowOffset: {
			width: 1,
			height: 3,
		},
		marginBottom: 'auto',
	},
	buttons: {
		flexGrow: 1,
		justifyContent: 'center',
	},
	registerButton: {
		marginBottom: 20,
		backgroundColor: 'color-basic-transparent-400',
		borderColor: 'color-basic-100',
	},
	loginButton: {
		backgroundColor: 'color-basic-100',
	},
	forgotButton: {
		width: 200,
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 15,
	},
});
