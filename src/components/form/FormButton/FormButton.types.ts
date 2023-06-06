import type { ImageProps } from 'react-native';
import type { ButtonProps } from '@ui-kitten/components';
import type { ThemeColors } from 'types/general';

export type FormButtonProps = {
	/** the label to show on the button */
	label: ButtonProps['children'];

	/** the icon to show to the left of the button label */
	iconLeft?: string;

	/** the accent color for the button */
	status?: ThemeColors | 'secondary';

	/** the appearance style of the button */
	appearance?: 'filled' | 'outline' | 'ghost';

	/** the border style of the button */
	borders?: 'rounded' | 'curved' | 'straight';

	/** should the button have no vertical margins? */
	noMargin?: boolean;

	/** does the button have a border? */
	hasBorder?: boolean;

	/** should the button show a loading spinner? */
	isLoading?: boolean;

	/** is the the button elevated? */
	elevated?: boolean;
} & Omit<ButtonProps, 'status' | 'appearance'>;

export type FormButtonAccessoryLeftProps = {
	props: Partial<ImageProps> | undefined;
} & Pick<FormButtonProps, 'iconLeft' | 'isLoading'>;
