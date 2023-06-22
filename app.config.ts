import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { z } from 'zod';

import type { ExpoConfig, ConfigContext } from '@expo/config';

const environment =
	process.env.ENV === 'development' ? 'development' : 'production';

const dotenvConfig = dotenv.config({
	path: `./.env.${environment}`,
});
dotenvExpand.expand(dotenvConfig);

export const parseEnvironment = (input: unknown) => {
	const environmentSchema = z.object({
		ENV: z.preprocess(
			(value) => (value === 'development' ? 'development' : 'production'),
			z.enum(['development', 'production'])
		),
		BACKEND_API_PATH: z.string().url(),
		SENTRY_ORG: z.string(),
		SENTRY_PROJECT: z.string(),
		SENTRY_AUTH_TOKEN: z.string(),
		SENTRY_DSN: z.string(),
	});
	const parsed = environmentSchema.safeParse(input);
	if (!parsed.success) {
		console.error(
			'🔥 Invalid environment variables:',
			parsed.error.flatten().fieldErrors,
			`\n🔥 Fix the issues in .env.${environment} file.`,
			`\n💡 Tip: If you recently updated the .env.${environment} file and the error still persists, try restarting the server with the -cc flag to clear the cache.`
		);
		throw new Error('Invalid environment, Check terminal for more details ');
	}

	return {
		environment: parsed.data.ENV,
		sentry: {
			organization: parsed.data.SENTRY_ORG,
			authToken: parsed.data.SENTRY_AUTH_TOKEN,
			dsn: parsed.data.SENTRY_DSN,
			project: parsed.data.SENTRY_PROJECT,
		},
		backendApiEndpoint: parsed.data.BACKEND_API_PATH,
	};
};

const extra = parseEnvironment(process.env);

export type Environment = typeof extra;

const details = {
	id: 'native-starter',
	org: 'khanate',
	name: 'React Native Starter',
	description: 'React Native Starter',
	github: 'https://github.com/kahante-dev/react-native-starter',
	version: '0.0.1',
	easProjectId: 'ea224914-8891-44d6-ad18-2a67bc487176',
	primaryColor: '#6847c0',
} as const;

const semverToInt = (version: `${number}.${number}.${number}`): number => {
	const [major, minor, patch] = version.split('.').map(Number);
	return (major ?? 0) * 10000000 + (minor ?? 0) * 100000 + (patch ?? 0);
};

// eslint-disable-next-line import/no-default-export
export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	scheme: details.id,
	name: details.name,
	slug: details.id,
	description: details.description,
	version: details.version,
	orientation: 'portrait',
	icon: './assets/icon.png',
	userInterfaceStyle: 'automatic',
	extra: {
		...extra,
		eas: {
			projectId: details.easProjectId,
		},
	},
	githubUrl: details.github,
	platforms: ['android', 'ios'],
	primaryColor: details.primaryColor,
	splash: {
		image: './assets/splash.png',
		resizeMode: 'contain',
		backgroundColor: details.primaryColor,
	},
	updates: {
		enabled: true,
		fallbackToCacheTimeout: 0,
	},
	assetBundlePatterns: ['**/*'],
	ios: {
		bundleIdentifier: `com.${details.org}.${details.id}`,
		buildNumber: details.version,
		supportsTablet: true,
	},
	android: {
		package: `com.${details.org}.${details.id.replace(/-/gu, '.')}`,
		versionCode: semverToInt(details.version),
		adaptiveIcon: {
			foregroundImage: './assets/adaptive-icon.png',
		},
	},
	// // web: {
	// // 	bundler: 'metro',
	// // },
	plugins: ['sentry-expo'],
	hooks: {
		postPublish: [
			{
				file: 'sentry-expo/upload-sourcemaps',
				config: {
					organization: extra.sentry.organization,
					project: extra.sentry.project,
					setCommits: true,
				},
			},
		],
	},
});
