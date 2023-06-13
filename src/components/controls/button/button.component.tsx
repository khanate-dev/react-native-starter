// eslint-disable-next-line no-restricted-imports
import { Button as Component } from 'react-native-paper';

import { isSmallerScreen } from 'src/config';
import { appIconMap } from 'components/media/app-icon';

import type { AppIconName } from 'components/media/app-icon';
import type { ButtonProps as Props } from 'react-native-paper';
import type { ReactNode } from 'react';

export type ButtonProps = Omit<Props, 'icon' | 'children'> & {
	/** the label to show on the button */
	label: ReactNode;

	/** the icon to show to the left of the button label */
	icon?: AppIconName;

	/** should the button have no vertical margins? */
	noMargin?: boolean;
};

export const Button = ({
	style,
	label,
	mode = 'contained',
	noMargin,
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
			style={[
				{ marginTop: !noMargin ? (isSmallerScreen ? 10 : 20) : undefined },
				style,
			]}
		>
			{label}
		</Component>
	);
};
