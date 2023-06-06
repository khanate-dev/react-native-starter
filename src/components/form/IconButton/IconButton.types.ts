import type { StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native';
import type { ThemeColors } from 'types/general';

export type IconButtonProps = {
	/** the styles to apply to the Icon component */
	iconStyle?: StyleProp<ViewStyle>;

	/** the type of the button. @default 'basic' */
	type?: ThemeColors;

	/** the name of the icon to use. picks the icon from eva icons with the given name */
	name: string;

	/** the fill color of the icon. overrides fill set by type prop */
	iconFill?: string;

	/** the width and height of the icon. @default 35 */
	size?: number;

	/** the appearance variant to use. @default 'ghost' */
	appearance?: 'filled' | 'outline' | 'ghost';

	/** should the button be round? */
	isRound?: boolean;

	/** should the button size itself */
	autoSize?: boolean;

	/** does the button have a border? */
	hasBorder?: boolean;

	/** is the the button elevated? */
	elevated?: boolean;
} & TouchableOpacityProps;
