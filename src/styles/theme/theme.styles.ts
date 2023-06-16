import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

import type { MD3Theme } from 'react-native-paper';
import type { Utils } from 'types/utils';

type ColorObj<T extends string> = {
	[k in
		| `${T}`
		| `on${Capitalize<T>}`
		| `${T}Container`
		| `on${Capitalize<T>}Container`]: string;
};

export type AppTheme = Utils.prettify<
	MD3Theme & {
		colors: Utils.prettify<
			MD3Theme['colors'] & ColorObj<'error' | 'info' | 'success' | 'warning'>
		>;
	}
>;

const statusColors: Record<
	'light' | 'dark',
	ColorObj<'error' | 'info' | 'success' | 'warning'>
> = {
	light: {
		error: 'rgb(186, 26, 32)',
		onError: 'rgb(255, 255, 255)',
		errorContainer: 'rgb(255, 218, 214)',
		onErrorContainer: 'rgb(65, 0, 3)',
		success: 'rgb(27, 109, 36)',
		onSuccess: 'rgb(255, 255, 255)',
		successContainer: 'rgb(163, 246, 156)',
		onSuccessContainer: 'rgb(0, 34, 4)',
		info: 'rgb(0, 99, 154)',
		onInfo: 'rgb(255, 255, 255)',
		infoContainer: 'rgb(206, 229, 255)',
		onInfoContainer: 'rgb(0, 29, 50)',
		warning: 'rgb(156, 68, 0)',
		onWarning: 'rgb(255, 255, 255)',
		warningContainer: 'rgb(255, 219, 202)',
		onWarningContainer: 'rgb(51, 18, 0)',
	},
	dark: {
		error: 'rgb(255, 179, 172)',
		onError: 'rgb(104, 0, 8)',
		errorContainer: 'rgb(147, 0, 16)',
		onErrorContainer: 'rgb(255, 218, 214)',
		success: 'rgb(136, 217, 130)',
		onSuccess: 'rgb(0, 57, 9)',
		successContainer: 'rgb(0, 83, 18)',
		onSuccessContainer: 'rgb(163, 246, 156)',
		info: 'rgb(150, 204, 255)',
		onInfo: 'rgb(0, 51, 83)',
		infoContainer: 'rgb(0, 74, 117)',
		onInfoContainer: 'rgb(206, 229, 255)',
		warning: 'rgb(255, 182, 142)',
		onWarning: 'rgb(84, 34, 0)',
		warningContainer: 'rgb(119, 51, 0)',
		onWarningContainer: 'rgb(255, 219, 202)',
	},
};

export const lightTheme: AppTheme = {
	...MD3LightTheme,
	colors: {
		...statusColors.light,
		primary: 'hsl(256, 49, 52)',
		onPrimary: 'hsl(0, 0, 100)',
		primaryContainer: 'hsl(259, 100, 93)',
		onPrimaryContainer: 'hsl(261, 100, 18)',
		secondary: 'hsl(48, 100, 23)',
		onSecondary: 'hsl(0, 0, 100)',
		secondaryContainer: 'hsl(44, 100, 77)',
		onSecondaryContainer: 'hsl(43, 100, 7)',
		tertiary: 'hsl(89, 98, 21)',
		onTertiary: 'hsl(0, 0, 100)',
		tertiaryContainer: 'hsl(92, 84, 73)',
		onTertiaryContainer: 'hsl(96, 100, 6)',
		background: 'hsl(300, 100, 99)',
		onBackground: 'hsl(260, 5, 11)',
		surface: 'hsl(300, 100, 99)',
		onSurface: 'hsl(260, 5, 11)',
		surfaceVariant: 'hsl(270, 24, 90)',
		onSurfaceVariant: 'hsl(260, 6, 29)',
		outline: 'hsl(264, 4, 48)',
		outlineVariant: 'hsl(273, 10, 79)',
		shadow: 'hsl(0, 0, 0)',
		scrim: 'hsl(0, 0, 0)',
		inverseSurface: 'hsl(260, 3, 19)',
		inverseOnSurface: 'hsl(300, 19, 95)',
		inversePrimary: 'hsl(255, 100, 87)',
		elevation: {
			level0: 'transparent',
			level1: 'hsl(270, 63, 97)',
			level2: 'hsl(268, 57, 95)',
			level3: 'hsl(265, 55, 94)',
			level4: 'hsl(267, 53, 93)',
			level5: 'hsl(264, 53, 93)',
		},
		surfaceDisabled: 'rgba(28, 27, 30, 0.12)',
		onSurfaceDisabled: 'rgba(28, 27, 30, 0.38)',
		backdrop: 'rgba(50, 47, 56, 0.4)',
	},
};

export const darkTheme: AppTheme = {
	...MD3DarkTheme,
	colors: {
		...statusColors.dark,
		primary: 'hsl(255, 100, 87)',
		onPrimary: 'hsl(262, 93, 29)',
		primaryContainer: 'hsl(258, 59, 41)',
		onPrimaryContainer: 'hsl(259, 100, 93)',
		secondary: 'hsl(46, 79, 60)',
		onSecondary: 'hsl(47, 100, 12)',
		secondaryContainer: 'hsl(48, 100, 17)',
		onSecondaryContainer: 'hsl(44, 100, 77)',
		tertiary: 'hsl(92, 58, 63)',
		onTertiary: 'hsl(92, 100, 11)',
		tertiaryContainer: 'hsl(90, 100, 16)',
		onTertiaryContainer: 'hsl(92, 84, 73)',
		background: 'hsl(260, 5, 11)',
		onBackground: 'hsl(300, 9, 89)',
		surface: 'hsl(260, 5, 11)',
		onSurface: 'hsl(300, 9, 89)',
		surfaceVariant: 'hsl(260, 6, 29)',
		onSurfaceVariant: 'hsl(273, 10, 79)',
		outline: 'hsl(270, 5, 58)',
		outlineVariant: 'hsl(260, 6, 29)',
		shadow: 'hsl(0, 0, 0)',
		scrim: 'hsl(0, 0, 0)',
		inverseSurface: 'hsl(300, 9, 89)',
		inverseOnSurface: 'hsl(260, 3, 19)',
		inversePrimary: 'hsl(256, 49, 52)',
		elevation: {
			level0: 'transparent',
			level1: 'hsl(260, 8, 15)',
			level2: 'hsl(255, 9, 17)',
			level3: 'hsl(258, 10, 20)',
			level4: 'hsl(256, 11, 20)',
			level5: 'hsl(255, 11, 22)',
		},
		surfaceDisabled: 'rgba(230, 225, 230, 0.12)',
		onSurfaceDisabled: 'rgba(230, 225, 230, 0.38)',
		backdrop: 'rgba(50, 47, 56, 0.4)',
	},
};

export type ThemeColor =
	| 'primary'
	| 'secondary'
	| 'tertiary'
	| 'error'
	| 'success'
	| 'warning'
	| 'info';
