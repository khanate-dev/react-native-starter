import type { Config } from 'jest';

const config: Config = {
	testEnvironment: 'jsdom',
	preset: 'jest-expo',
	transformIgnorePatterns: [
		'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
	],
	collectCoverage: true,
	collectCoverageFrom: [
		'**/*.{js,jsx,ts,tsx}',
		'!**/coverage/**',
		'!**/node_modules/**',
		'!**/.eslintrc.cjs',
		'!**/babel.config.cjs',
		'!**/jest.setup.js',
	],
	setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
	clearMocks: true,
	globals: {
		'ts-jest': {
			tsconfig: {
				jsx: 'react',
			},
		},
	},
};

// eslint-disable-next-line import/no-default-export
export default config;
