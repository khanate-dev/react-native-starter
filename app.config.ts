import { ExpoConfig, ConfigContext } from '@expo/config';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { z } from 'zod';

import { environmentSchema, Environment, parseEnvironment } from 'env';

const environment = (
	process.env.ENV === 'development'
		? 'development'
		: 'production'
);

const config = dotenv.config({
	path: `./.env.${environment}`,
});
dotenvExpand.expand(config);

const extra = parseEnvironment(process.env);

const {
	sentry,
	googleMapsApiKey,
} = extra;

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	name: 'Compass Poultry App',
	slug: 'compass-poultry',
	description: 'Compass Poultry Mobile Application',
	version: '1.0.1',
	orientation: 'portrait',
	icon: './assets/icon.png',
	userInterfaceStyle: 'automatic',
	extra: {
		...extra,
		eas: {
			projectId: 'ea224914-8891-44d6-ad18-2a67bc487176',
		},
	},
	githubUrl: 'https://github.com/wimetrixdev/compass-poultry-app',
	platforms: [
		'android',
		'ios',
	],
	primaryColor: '#B591DE',
	splash: {
		image: './assets/splash.png',
		resizeMode: 'contain',
		backgroundColor: '#B591DE',
	},
	updates: {
		enabled: true,
		fallbackToCacheTimeout: 0,
	},
	assetBundlePatterns: [
		'**/*',
	],
	androidStatusBar: {
		barStyle: 'light-content',
	},
	ios: {
		bundleIdentifier: 'com.wimetrix.compasspoultry',
		buildNumber: '1.0.1',
		supportsTablet: true,
		infoPlist: {
			NSLocationWhenInUseUsageDescription: 'Your location will be used by the application to refocus the map to your vicinity',
		},
	},
	android: {
		package: 'com.wimetrix.compasspoultry',
		versionCode: 2,
		config: {
			googleMaps: {
				apiKey: googleMapsApiKey,
			},
		},
		adaptiveIcon: {
			foregroundImage: './assets/adaptive-icon.png',
			backgroundColor: '#FFFFFF',
		},
		permissions: [
			'ACCESS_COARSE_LOCATION',
			'ACCESS_FINE_LOCATION',
			'FOREGROUND_SERVICE',
		],
	},
	plugins: [
		'sentry-expo',
	],
	hooks: {
		postPublish: [
			{
				file: 'sentry-expo/upload-sourcemaps',
				config: {
					organization: sentry.organization,
					project: sentry.project,
					authToken: sentry.authToken,
					setCommits: true,
				},
			},
		],
	},
});
