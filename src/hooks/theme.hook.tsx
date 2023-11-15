import { useTheme as usePaperTheme } from 'react-native-paper';

import { useI18n } from '../contexts/i18n.context';
import { formatToken } from '../helpers/format-token.helpers';

import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { AppTheme, ThemeColor } from '../theme';

export const useTheme = () => {
	const theme = usePaperTheme<AppTheme>();
	const { direction, rtl } = useI18n();

	return {
		...theme,
		getColor: (
			color: ThemeColor,
			variant: 'normal' | 'on-normal' | 'container' | 'on-container' = 'normal',
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
		direction,
		rtl,
		styles: {
			view: {
				row: {
					flexDirection: rtl ? 'row-reverse' : 'row',
					flexWrap: 'nowrap',
					alignItems: 'center',
				},
			} satisfies Record<string, StyleProp<ViewStyle>>,
			text: {
				heading: {
					textAlign: rtl ? 'right' : 'left',
					color: theme.colors.primary,
					marginBottom: 'auto',
					textTransform: 'capitalize',
				},
			} satisfies Record<string, StyleProp<TextStyle>>,
		},
	} as const;
};
