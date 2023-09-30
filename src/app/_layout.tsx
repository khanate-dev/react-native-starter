import { loadAsync } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import { useEffect, useState } from 'react';
import { PaperProvider } from 'react-native-paper';

import { env } from '~/config';
import { AlertProvider, addAlert } from '~/contexts/alert.context';
import { DarkModeProvider, useDarkMode } from '~/contexts/dark-mode.context';
import { I18nProvider } from '~/contexts/i18n.context';
import { LoadingProvider } from '~/contexts/loading.context';
import { darkTheme, lightTheme } from '~/theme';

SplashScreen.preventAutoHideAsync();

const Providers = () => {
	const isDarkMode = useDarkMode();

	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		loadAsync({
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			InterRegular: require('~/assets/fonts/inter-regular.otf') as string,
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			InterBold: require('~/assets/fonts/inter-bold.otf') as string,
		}).then(() => {
			setLoaded(true);
			SplashScreen.hideAsync();
		});
	}, []);

	if (!loaded) return null;

	return (
		<I18nProvider>
			<PaperProvider theme={isDarkMode ? darkTheme : lightTheme}>
				<AlertProvider>
					<LoadingProvider>
						<StatusBar
							style='light'
							backgroundColor='#000000'
						/>
						<Slot />
					</LoadingProvider>
				</AlertProvider>
			</PaperProvider>
		</I18nProvider>
	);
};

const RootLayout = () => {
	useEffect(() => {
		if (env !== 'production' || typeof Updates.addListener !== 'function')
			return;

		Updates.addListener((event) => {
			if (event.type !== Updates.UpdateEventType.UPDATE_AVAILABLE) return;

			setTimeout(() => {
				addAlert({
					title: 'Update Available!',
					text: 'A New Update Is Available For The App.\nRestart The Application To Apply Updates.',
					closeLabel: 'Later',
					noIcon: true,
					actions: [
						{
							label: 'Restart & Update',
							onPress: async () => Updates.reloadAsync(),
						},
					],
				});
			}, 1000);
		});
	}, []);

	return (
		<DarkModeProvider>
			<Providers />
		</DarkModeProvider>
	);
};

export default RootLayout;
