import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';

import type { App } from './types/app.types.ts';

const { env, backendPath, sentry } = Constants.expoConfig?.extra as App.env;

export { backendPath, env };

if (env === 'production') {
	Sentry.init({
		dsn: sentry.dsn,
		debug: false,
		tracesSampleRate: 1.0,
	});
}

const isFetchMockedConfig: Record<typeof env, boolean> = {
	development: true,
	production: true,
	test: true,
};

/** should the app use mocked fetch? used for demos and testing */
export const isFetchMocked: boolean = isFetchMockedConfig[env];

export const isSmallerScreen = Dimensions.get('screen').width <= 400;

const disableAuthConfig: Record<typeof env, boolean> = {
	development: true,
	production: true,
	test: true,
};

/** should fetch authentication be disabled? */
export const disableAuth: boolean = disableAuthConfig[env];

const shouldAutoFillConfig: Record<typeof env, boolean> = {
	development: true,
	production: false,
	test: true,
};

/** should the app auto fill inputs with default values? */
export const shouldAutoFill: boolean = shouldAutoFillConfig[env];
