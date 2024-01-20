import { loadAsync } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useUpdates } from 'expo-updates';
import { useEffect, useState } from 'react';
import { PaperProvider } from 'react-native-paper';

import { env } from '../config.ts';
import { AlertProvider, addAlert } from '../contexts/alert.context.tsx';
import { LoadingProvider } from '../contexts/loading.context.tsx';
import { useMode } from '../hooks/mode.hook.tsx';
import { darkTheme, lightTheme } from '../theme.ts';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
	const mode = useMode();
	const { isUpdateAvailable } = useUpdates();

	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (env !== 'production' || typeof Updates.addListener !== 'function')
			return;
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
	}, []);

	useEffect(() => {
		loadAsync({
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			InterRegular: require('../assets/fonts/inter-regular.otf') as string,
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			InterBold: require('../assets/fonts/inter-bold.otf') as string,
		}).then(() => {
			setLoaded(true);
			SplashScreen.hideAsync();
		});
	}, []);

	if (!loaded) return null;

	return (
		<PaperProvider theme={mode.setting === 'dark' ? darkTheme : lightTheme}>
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
	);
};

export default RootLayout;
