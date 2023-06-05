import { ExpoConfig, ConfigContext } from '@expo/config';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { z } from 'zod';

import { Environment } from 'types/env';

const environment =
	process.env.ENV === 'development' ? 'development' : 'production';

const config = dotenv.config({
	path: `./.env.${environment}`,
});
dotenvExpand.expand(config);

export const parseEnvironment = (input: unknown): Environment => {
	try {
		const environmentSchema = z
			.object({
				ENV: z.preprocess(
					(value) =>
						value === 'development' ? 'development' : 'production',
					z.enum(['development', 'production'])
				),
				BACKEND_API_PATH: z.string().url(),
				GOGGLE_MAPS_API_KEY: z.string(),
				SENTRY_ORG: z.string(),
				SENTRY_PROJECT: z.string(),
				SENTRY_AUTH_TOKEN: z.string(),
				SENTRY_DSN: z.string(),
			})
			.transform((parsed) => ({
				environment: parsed.ENV,
				sentry: {
					organization: parsed.SENTRY_ORG,
					authToken: parsed.SENTRY_AUTH_TOKEN,
					dsn: parsed.SENTRY_DSN,
					project: parsed.SENTRY_PROJECT,
				},
				googleMapsApiKey: parsed.GOGGLE_MAPS_API_KEY,
				backendApiEndpoint: parsed.BACKEND_API_PATH,
			}));
		return environmentSchema.parse(input);
	} catch (error: any) {
		throw new Error(
			`Invalid Environment:\n${JSON.parse(error.message)
				?.map?.((error: any) => `'${error.path[0]}': ${error.message}`)
				.join('\n')}`
		);
	}
};

const extra = parseEnvironment(process.env);

const { sentry, googleMapsApiKey } = extra;

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
	platforms: ['android', 'ios'],
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
	assetBundlePatterns: ['**/*'],
	androidStatusBar: {
		barStyle: 'light-content',
	},
	ios: {
		bundleIdentifier: 'com.wimetrix.compasspoultry',
		buildNumber: '1.0.1',
		supportsTablet: true,
		infoPlist: {
			NSLocationWhenInUseUsageDescription:
				'Your location will be used by the application to refocus the map to your vicinity',
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
	plugins: ['sentry-expo'],
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
