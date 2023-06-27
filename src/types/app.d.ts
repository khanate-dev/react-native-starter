import type { StyleProp, ViewStyle } from 'react-native';

export namespace App {
	export type propsWithStyle<T extends Record<string, unknown> = {}> = T & {
		/** the styles to apply to the component */
		style?: StyleProp<ViewStyle>;
	};
}
