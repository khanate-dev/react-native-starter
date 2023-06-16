import type { Config } from 'jest';

const config: Config = {
	preset: 'jest-expo',
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
