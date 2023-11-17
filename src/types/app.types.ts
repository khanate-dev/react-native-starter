import type { StyleProp, ViewStyle } from 'react-native';
import type { Environment as Env } from '../../app.config.ts';

export declare namespace App {
	type propsWithStyle<T extends Record<string, unknown> = {}> = T & {
		/** the styles to apply to the component */
		style?: StyleProp<ViewStyle>;
	};
	type env = Env;
}
