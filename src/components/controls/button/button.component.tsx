// eslint-disable-next-line no-restricted-imports
import { Button as Component } from 'react-native-paper';

import { appIconMap } from 'components/media/app-icon';

import type { AppIconName } from 'components/media/app-icon';
import type { ButtonProps as Props } from 'react-native-paper';
import type { ReactNode } from 'react';

export type ButtonProps = Omit<Props, 'icon' | 'children'> & {
	/** the label to show on the button */
	label: ReactNode;

	/** the icon to show to the left of the button label */
	icon?: AppIconName;
};

export const Button = ({
	style,
	label,
	mode = 'contained',
	disabled,
	icon,
	...restProps
}: ButtonProps) => {
	const name = icon && appIconMap[icon];
	return (
		<Component
			{...restProps}
			icon={name}
			mode={mode}
			disabled={disabled || restProps.loading}
			style={style}
		>
			{label}
		</Component>
	);
};
