/** @type {(import('@babel/core').ConfigFunction)} */
module.exports = function (api) {
	api.cache.using(() => process.env.ENV);
	return {
		presets: ['babel-preset-expo'],
		plugins: ['react-native-reanimated/plugin', 'expo-router/babel'],
	};
};
