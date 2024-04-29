import * as Sentry from '@sentry/react-native';
import { default as Constants } from 'expo-constants';
import { Dimensions } from 'react-native';

import type { App } from './types/app.types.ts';

const envConfig = Constants.expoConfig?.extra as App.env;

if (envConfig.env === 'production') {
	Sentry.init({
		dsn: envConfig.sentry.dsn,
		debug: false,
		tracesSampleRate: 1.0,
	});
}

const config = {
	...envConfig,
	isSmallerScreen: Dimensions.get('screen').width <= 400,
};

export { config };
