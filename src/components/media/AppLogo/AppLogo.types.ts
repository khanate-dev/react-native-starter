import type { StyleProp, ViewStyle } from 'react-native';

export type AppLogoProps = {
	/** the styles to apply to the svg element */
	style?: StyleProp<ViewStyle>;

	/** the size of the logo @default 35 */
	size?: number;

	/** the logo's colors @default 'default' */
	type?: 'default' | 'single-color';
};
