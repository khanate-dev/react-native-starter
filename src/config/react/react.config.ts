import { Dimensions } from 'react-native';
import Constants from 'expo-constants';
import * as Sentry from 'sentry-expo';

import { Environment } from 'types/env';

const { environment, backendApiEndpoint, sentry } = Constants.manifest
	?.extra as Environment;

export {
	environment,
	/** the base url path for the backend api's */
	backendApiEndpoint,
};

if (environment === 'production') {
	Sentry.init({
		dsn: sentry.dsn,
		enableInExpoDevelopment: true,
		debug: false,
		tracesSampleRate: 1.0,
	});
}

const isFetchMockedConfig: Record<typeof environment, boolean> = {
	development: true,
	production: true,
};

/** should the app use mocked fetch? used for demos and testing */
export const isFetchMocked: boolean = isFetchMockedConfig[environment];

export const isSmallerScreen = Dimensions.get('screen').width <= 400;

const shouldAutoFillConfig: Record<typeof environment, boolean> = {
	development: false,
	production: false,
};

/** should the app auto fill inputs with default values? */
export const shouldAutoFill: boolean = shouldAutoFillConfig[environment];
