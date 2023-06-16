import { formatToken } from 'helpers/string';

import type { AppTheme, ThemeColor } from 'styles/theme';

export const useTheme = () => {
	const theme = useTheme() as AppTheme;

	return {
		...theme,
		getColor: (
			color: ThemeColor,
			variant: 'normal' | 'on-normal' | 'container' | 'on-container' = 'normal'
		): string => {
			switch (variant) {
				case 'normal':
					return theme.colors[color];
				case 'on-normal':
					return theme.colors[`on${formatToken(color, 'pascal')}`];
				case 'container':
					return theme.colors[`${color}Container`];
				case 'on-container':
					return theme.colors[`on${formatToken(color, 'pascal')}Container`];
				default:
					throw new Error('invalid variant');
			}
		},
		icons: {
			primary: 'notifications',
			secondary: 'notifications',
			tertiary: 'notifications',
			error: 'error',
			success: 'success',
			info: 'info',
			warning: 'warning',
		},
	} as const;
};
