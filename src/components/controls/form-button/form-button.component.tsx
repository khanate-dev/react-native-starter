import { forwardRef } from 'react';
import { Button } from 'react-native-paper';

import { isSmallerScreen } from 'src/config';

import type { AppIconName } from 'components/media/app-icon';
import type { ButtonProps } from 'react-native-paper';
import type { ReactNode, ForwardedRef } from 'react';
import type { View } from 'react-native';

export type FormButtonProps = Omit<ButtonProps, 'icon' | 'color' | 'children'> & {
	/** the label to show on the button */
	label: ReactNode;

	/** the icon to show to the left of the button label */
	icon?: AppIconName;

	/** should the button have no vertical margins? */
	noMargin?: boolean;
};

const FormButtonComponent = (
	props: FormButtonProps,
	ref: ForwardedRef<View>
) => {
	const {
		style,
		label,
		mode = 'contained',
		noMargin,
		disabled,
		...restProps
	} = props;
	return (
		<Button
			{...restProps}
			ref={ref}
			mode={mode}
			disabled={disabled || restProps.loading}
			style={[
				{ marginTop: !noMargin ? (isSmallerScreen ? 10 : 20) : undefined },
				style,
			]}
		>
			{label}
		</Button>
	);
};

export const FormButton = forwardRef(FormButtonComponent);
