// eslint-disable-next-line no-restricted-imports
import { Button as Component } from 'react-native-paper';

import { appIconMap } from 'components/app/app-icon';
import { useTheme } from 'hooks/theme';

import type { AppIconName } from 'components/app/app-icon';
import type { ButtonProps as Props } from 'react-native-paper';
import type { ReactNode } from 'react';
import type { ThemeColor } from 'styles/theme';

export type ButtonProps = Omit<Props, 'icon' | 'children'> & {
	/** the label to show on the button */
	label: ReactNode;

	/** the icon to show to the left of the button label */
	icon?: AppIconName;

	/** the theme color of the button */
	color?: ThemeColor;
};

export const Button = ({
	style,
	color,
	label,
	mode = 'contained',
	disabled,
	icon,
	...restProps
}: ButtonProps) => {
	const theme = useTheme();

	const name = icon && appIconMap[icon];

	return (
		<Component
			{...restProps}
			icon={name}
			mode={mode}
			disabled={disabled || restProps.loading}
			style={style}
			theme={
				color
					? {
							colors: {
								primary: theme.getColor(color, 'normal'),
								onPrimary: theme.getColor(color, 'on-normal'),
								primaryContainer: theme.getColor(color, 'container'),
								onPrimaryContainer: theme.getColor(color, 'on-container'),
								secondary: theme.getColor(color, 'normal'),
								onSecondary: theme.getColor(color, 'on-normal'),
								secondaryContainer: theme.getColor(color, 'container'),
								onSecondaryContainer: theme.getColor(color, 'on-container'),
							},
					  }
					: undefined
			}
		>
			{label}
		</Component>
	);
};
