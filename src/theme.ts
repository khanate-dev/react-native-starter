import {
	MD3DarkTheme,
	MD3LightTheme,
	configureFonts,
} from 'react-native-paper';

import type { MD3Theme } from 'react-native-paper';
import type { Utils } from '~/types/utils.types';

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

const fonts = configureFonts({
	config: {
		displaySmall: { fontFamily: 'InterRegular' },
		displayMedium: { fontFamily: 'InterRegular' },
		displayLarge: { fontFamily: 'InterRegular' },
		headlineSmall: { fontFamily: 'InterBold' },
		headlineMedium: { fontFamily: 'InterBold' },
		headlineLarge: { fontFamily: 'InterBold' },
		titleSmall: { fontFamily: 'InterBold' },
		titleMedium: { fontFamily: 'InterBold' },
		titleLarge: { fontFamily: 'InterBold' },
		labelSmall: { fontFamily: 'InterRegular' },
		labelMedium: { fontFamily: 'InterRegular' },
		labelLarge: { fontFamily: 'InterRegular' },
		bodySmall: { fontFamily: 'InterRegular' },
		bodyMedium: { fontFamily: 'InterRegular' },
		bodyLarge: { fontFamily: 'InterRegular' },
	},
});

export const lightTheme: AppTheme = {
	...MD3LightTheme,
	colors: {
		primary: 'rgb(104, 71, 191)',
		onPrimary: 'rgb(255, 255, 255)',
		primaryContainer: 'rgb(232, 221, 255)',
		onPrimaryContainer: 'rgb(33, 0, 94)',
		secondary: 'rgb(112, 93, 0)',
		onSecondary: 'rgb(255, 255, 255)',
		secondaryContainer: 'rgb(255, 225, 115)',
		onSecondaryContainer: 'rgb(34, 27, 0)',
		tertiary: 'rgb(143, 67, 125)',
		onTertiary: 'rgb(255, 255, 255)',
		tertiaryContainer: 'rgb(255, 215, 239)',
		onTertiaryContainer: 'rgb(58, 0, 50)',
		error: 'rgb(182, 33, 44)',
		onError: 'rgb(255, 255, 255)',
		errorContainer: 'rgb(255, 218, 215)',
		onErrorContainer: 'rgb(65, 0, 5)',
		background: 'rgb(255, 251, 255)',
		onBackground: 'rgb(28, 27, 30)',
		surface: 'rgb(255, 251, 255)',
		onSurface: 'rgb(28, 27, 30)',
		surfaceVariant: 'rgb(230, 224, 236)',
		onSurfaceVariant: 'rgb(72, 69, 78)',
		outline: 'rgb(121, 117, 127)',
		outlineVariant: 'rgb(202, 196, 207)',
		shadow: 'rgb(0, 0, 0)',
		scrim: 'rgb(0, 0, 0)',
		inverseSurface: 'rgb(49, 48, 51)',
		inverseOnSurface: 'rgb(244, 239, 244)',
		inversePrimary: 'rgb(206, 189, 255)',
		elevation: {
			level0: 'transparent',
			level1: 'rgb(247, 242, 252)',
			level2: 'rgb(243, 237, 250)',
			level3: 'rgb(238, 231, 248)',
			level4: 'rgb(237, 229, 247)',
			level5: 'rgb(234, 226, 246)',
		},
		surfaceDisabled: 'rgba(28, 27, 30, 0.12)',
		onSurfaceDisabled: 'rgba(28, 27, 30, 0.38)',
		backdrop: 'rgba(50, 47, 56, 0.4)',
		success: 'rgb(16, 109, 32)',
		onSuccess: 'rgb(255, 255, 255)',
		successContainer: 'rgb(157, 248, 152)',
		onSuccessContainer: 'rgb(0, 34, 4)',
		info: 'rgb(0, 99, 154)',
		onInfo: 'rgb(255, 255, 255)',
		infoContainer: 'rgb(206, 229, 255)',
		onInfoContainer: 'rgb(0, 29, 50)',
		warning: 'rgb(150, 73, 0)',
		onWarning: 'rgb(255, 255, 255)',
		warningContainer: 'rgb(255, 220, 198)',
		onWarningContainer: 'rgb(49, 19, 0)',
	},
	fonts,
};

export const darkTheme: AppTheme = {
	...MD3DarkTheme,
	colors: {
		primary: 'rgb(206, 189, 255)',
		onPrimary: 'rgb(56, 7, 144)',
		primaryContainer: 'rgb(79, 44, 166)',
		onPrimaryContainer: 'rgb(232, 221, 255)',
		secondary: 'rgb(228, 197, 74)',
		onSecondary: 'rgb(59, 47, 0)',
		secondaryContainer: 'rgb(85, 70, 0)',
		onSecondaryContainer: 'rgb(255, 225, 115)',
		tertiary: 'rgb(255, 173, 230)',
		onTertiary: 'rgb(88, 18, 75)',
		tertiaryContainer: 'rgb(115, 43, 99)',
		onTertiaryContainer: 'rgb(255, 215, 239)',
		error: 'rgb(255, 179, 175)',
		onError: 'rgb(104, 0, 14)',
		errorContainer: 'rgb(147, 0, 24)',
		onErrorContainer: 'rgb(255, 218, 215)',
		background: 'rgb(28, 27, 30)',
		onBackground: 'rgb(230, 225, 230)',
		surface: 'rgb(28, 27, 30)',
		onSurface: 'rgb(230, 225, 230)',
		surfaceVariant: 'rgb(72, 69, 78)',
		onSurfaceVariant: 'rgb(202, 196, 207)',
		outline: 'rgb(147, 143, 153)',
		outlineVariant: 'rgb(72, 69, 78)',
		shadow: 'rgb(0, 0, 0)',
		scrim: 'rgb(0, 0, 0)',
		inverseSurface: 'rgb(230, 225, 230)',
		inverseOnSurface: 'rgb(49, 48, 51)',
		inversePrimary: 'rgb(104, 71, 191)',
		elevation: {
			level0: 'transparent',
			level1: 'rgb(37, 35, 41)',
			level2: 'rgb(42, 40, 48)',
			level3: 'rgb(48, 45, 55)',
			level4: 'rgb(49, 46, 57)',
			level5: 'rgb(53, 50, 62)',
		},
		surfaceDisabled: 'rgba(230, 225, 230, 0.12)',
		onSurfaceDisabled: 'rgba(230, 225, 230, 0.38)',
		backdrop: 'rgba(50, 47, 56, 0.4)',
		success: 'rgb(130, 219, 126)',
		onSuccess: 'rgb(0, 57, 10)',
		successContainer: 'rgb(0, 83, 18)',
		onSuccessContainer: 'rgb(157, 248, 152)',
		info: 'rgb(150, 204, 255)',
		onInfo: 'rgb(0, 51, 83)',
		infoContainer: 'rgb(0, 74, 117)',
		onInfoContainer: 'rgb(206, 229, 255)',
		warning: 'rgb(255, 183, 134)',
		onWarning: 'rgb(80, 36, 0)',
		warningContainer: 'rgb(114, 54, 0)',
		onWarningContainer: 'rgb(255, 220, 198)',
	},
	fonts,
};

export type ThemeColor =
	| 'primary'
	| 'secondary'
	| 'tertiary'
	| 'error'
	| 'success'
	| 'warning'
	| 'info';
