import { Button as Component } from 'react-native-paper';

import { appIconMap } from '../../assets/icons.js';
import { fixedForwardRef } from '../../helpers/ref.helpers.js';
import { useTheme } from '../../hooks/theme.hook.js';

import type { ElementRef, ReactNode, Ref } from 'react';
import type { ButtonProps as Props } from 'react-native-paper';
import type { IconName } from '../../assets/icons.js';
import type { ThemeColor } from '../../theme';

export type ButtonProps = Omit<Props, 'icon' | 'children'> & {
	/** the label to show on the button */
	label: ReactNode;

	/** the icon to show to the left of the button label */
	icon?: IconName;

	/** the theme color of the button */
	color?: ThemeColor;
};

export const Button = fixedForwardRef(
	(
		{
			style,
			color = 'primary',
			label,
			mode = 'contained',
			disabled,
			icon: iconName,
			...restProps
		}: ButtonProps,
		ref: Ref<ElementRef<typeof Component>>,
	) => {
		const { getColor, rtl } = useTheme();

		const icon: Props['icon'] | undefined = iconName
			? appIconMap[iconName]
			: undefined;

		return (
			<Component
				{...restProps}
				ref={ref}
				mode={mode}
				disabled={disabled || restProps.loading}
				labelStyle={{ textTransform: 'capitalize' }}
				icon={icon}
				contentStyle={{ flexDirection: rtl ? 'row-reverse' : 'row' }}
				style={[
					{ borderRadius: 10, borderColor: getColor(color, 'normal') },
					style,
				]}
				theme={{
					colors: {
						primary: getColor(color, 'normal'),
						onPrimary: getColor(color, 'on-normal'),
						primaryContainer: getColor(color, 'container'),
						onPrimaryContainer: getColor(color, 'on-container'),
						secondary: getColor(color, 'normal'),
						onSecondary: getColor(color, 'on-normal'),
						secondaryContainer: getColor(color, 'container'),
						onSecondaryContainer: getColor(color, 'on-container'),
					},
				}}
			>
				{label}
			</Component>
		);
	},
);
