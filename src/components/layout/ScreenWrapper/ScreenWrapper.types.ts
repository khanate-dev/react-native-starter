import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { screenWrapperStyles } from './ScreenWrapper.styles';

export type ScreenWrapperUserControlsProps = {
	styles: typeof screenWrapperStyles;
};

export type ScreenWrapperProps = {
	children: ReactNode;

	/** the styles to apply to the container */
	containerStyle?: StyleProp<ViewStyle>;

	/** the title to show on the page header */
	title?: string;

	/**
	 * the function to call when the header back button is pressed
	 * back button is not rendered if excluded
	 */
	onBack?: () => void;

	/** should the background be dark? */
	darkBackground?: boolean;

	/** should the screen render a plain white background instead of the gradient? */
	hasPlainBackground?: boolean;
};
