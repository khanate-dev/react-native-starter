import { Link } from 'expo-router';

import { Button } from './button.component.tsx';

import type { LinkProps } from 'expo-router';
import type { ButtonProps } from './button.component.tsx';

export type ButtonLinkProps<T extends string> = Omit<LinkProps<T>, 'children'> &
	Pick<ButtonProps, 'label' | 'icon' | 'color' | 'mode'> & {
		buttonProps?: Omit<
			ButtonProps,
			'disabled' | 'label' | 'icon' | 'color' | 'mode'
		>;
	};

export const ButtonLink = <T extends string>({
	color = 'primary',
	label,
	mode = 'contained',
	icon,
	buttonProps,
	...linkProps
}: ButtonLinkProps<T>) => {
	return (
		<Link
			{...linkProps}
			asChild
		>
			<Button
				{...buttonProps}
				color={color}
				label={label}
				mode={mode}
				disabled={linkProps.disabled}
				icon={icon}
			/>
		</Link>
	);
};
