import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

import { formatToken } from 'helpers/string';

import type { MD3Theme } from 'react-native-paper';
import type { AppIconName } from 'components/media/app-icon';

export const lightTheme: MD3Theme = {
	...MD3LightTheme,
	colors: {
		primary: 'rgb(104, 71, 192)',
		onPrimary: 'rgb(255, 255, 255)',
		primaryContainer: 'rgb(232, 221, 255)',
		onPrimaryContainer: 'rgb(33, 0, 93)',
		secondary: 'rgb(115, 92, 0)',
		onSecondary: 'rgb(255, 255, 255)',
		secondaryContainer: 'rgb(255, 224, 136)',
		onSecondaryContainer: 'rgb(36, 26, 0)',
		tertiary: 'rgb(56, 107, 1)',
		onTertiary: 'rgb(255, 255, 255)',
		tertiaryContainer: 'rgb(183, 244, 129)',
		onTertiaryContainer: 'rgb(13, 32, 0)',
		error: 'rgb(186, 26, 26)',
		onError: 'rgb(255, 255, 255)',
		errorContainer: 'rgb(255, 218, 214)',
		onErrorContainer: 'rgb(65, 0, 2)',
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
	},
};

export const darkTheme: MD3Theme = {
	...MD3DarkTheme,
	colors: {
		primary: 'rgb(206, 189, 255)',
		onPrimary: 'rgb(57, 5, 144)',
		primaryContainer: 'rgb(80, 43, 167)',
		onPrimaryContainer: 'rgb(232, 221, 255)',
		secondary: 'rgb(233, 195, 72)',
		onSecondary: 'rgb(60, 47, 0)',
		secondaryContainer: 'rgb(87, 69, 0)',
		onSecondaryContainer: 'rgb(255, 224, 136)',
		tertiary: 'rgb(156, 215, 105)',
		onTertiary: 'rgb(26, 55, 0)',
		tertiaryContainer: 'rgb(40, 80, 0)',
		onTertiaryContainer: 'rgb(183, 244, 129)',
		error: 'rgb(255, 180, 171)',
		onError: 'rgb(105, 0, 5)',
		errorContainer: 'rgb(147, 0, 10)',
		onErrorContainer: 'rgb(255, 180, 171)',
		background: 'rgb(28, 27, 30)',
		onBackground: 'rgb(230, 225, 230)',
		surface: 'rgb(28, 27, 30)',
		onSurface: 'rgb(230, 225, 230)',
		surfaceVariant: 'rgb(72, 69, 78)',
		onSurfaceVariant: 'rgb(202, 196, 207)',
		outline: 'rgb(148, 143, 153)',
		outlineVariant: 'rgb(72, 69, 78)',
		shadow: 'rgb(0, 0, 0)',
		scrim: 'rgb(0, 0, 0)',
		inverseSurface: 'rgb(230, 225, 230)',
		inverseOnSurface: 'rgb(49, 48, 51)',
		inversePrimary: 'rgb(104, 71, 192)',
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
	},
};

const themeColorMap = {
	primary: 'primary',
	secondary: 'secondary',
	error: 'error',
	success: 'tertiary',
	warning: 'secondary',
} as const;

export type ThemeColor = keyof typeof themeColorMap;

export const themeColorIcons: Record<ThemeColor, AppIconName> = {
	primary: 'notifications',
	secondary: 'notifications',
	success: 'success-circle',
	error: 'error-circle',
	warning: 'error-circle',
};

export const getThemeColor = (
	theme: MD3Theme,
	color: ThemeColor,
	variant: 'normal' | 'hover' | 'container' | 'container-hover' = 'normal'
): string => {
	const name = themeColorMap[color];
	switch (variant) {
		case 'normal':
			return theme.colors[name];
		case 'hover':
			return theme.colors[`on${formatToken(name, 'pascal')}`];
		case 'container':
			return theme.colors[`${name}Container`];
		case 'container-hover':
			return theme.colors[`on${formatToken(name, 'pascal')}Container`];
	}
};
