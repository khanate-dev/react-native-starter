/** @type {(import('@babel/core').ConfigFunction)} */
module.exports = function (api) {
	api.cache.using(() => process.env.ENV);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			'react-native-reanimated/plugin',
			[
				'module-resolver',
				{
					alias: {
						assets: './assets',
						components: './src/components',
						config: './src/config',
						contexts: './src/contexts',
						errors: './src/errors',
						helpers: './src/helpers',
						hooks: './src/hooks',
						media: './src/media',
						navigation: './src/navigation',
						screens: './src/screens',
						styles: './src/styles',
						types: './src/types',
						mocks: './src/mocks',
						schemas: './src/schemas',
						endpoints: './src/endpoints',
						env: './src/env',
					},
					extensions: ['.js', '.jsx', '.ts', '.tsx', 'json'],
				},
			],
		],
		env: {
			production: {
				plugins: ['react-native-paper/babel'],
			},
		},
	};
};
