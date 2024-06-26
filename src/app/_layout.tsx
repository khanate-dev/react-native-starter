import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { fetchUpdateAsync, reloadAsync, useUpdates } from 'expo-updates';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';

import { config } from '../config.ts';
import { AlertProvider, addAlert } from '../contexts/alert.context.tsx';
import { LoadingProvider } from '../contexts/loading.context.tsx';
import { useMode } from '../hooks/mode.hook.tsx';
import { darkTheme, lightTheme } from '../theme.ts';

import type { PropsWithChildren } from 'react';

SplashScreen.preventAutoHideAsync();

const UpdateCheckerProvider = (props: PropsWithChildren) => {
	const { isUpdateAvailable } = useUpdates();
	useEffect(() => {
		if (config.env !== 'production' || !isUpdateAvailable) return;
		addAlert({
			title: 'Update Available!',
			body: 'A New Update Is Available For The App.\nRestart The Application To Apply Updates.',
			closeLabel: 'Later',
			noIcon: true,
			actions: [
				{
					label: 'Restart & Update',
					onPress: async () => {
						await fetchUpdateAsync().then(reloadAsync);
					},
				},
			],
		});
	}, [isUpdateAvailable]);

	return props.children;
};

const RootLayout = () => {
	const mode = useMode();
	const [fontsLoaded, fontError] = useFonts({
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		'inter-regular': require('../assets/fonts/inter-regular.otf') as string,
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		'inter-bold': require('../assets/fonts/inter-bold.otf') as string,
	});

	useEffect(() => {
		if (fontsLoaded || fontError) SplashScreen.hideAsync();
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) return null;

	const theme = mode.setting === 'dark' ? darkTheme : lightTheme;

	return (
		<PaperProvider theme={theme}>
			<AlertProvider>
				<LoadingProvider>
					<UpdateCheckerProvider>
						<StatusBar
							style={mode.mode === 'dark' ? 'light' : 'dark'}
							backgroundColor={theme.colors.background}
						/>
						<Slot />
					</UpdateCheckerProvider>
				</LoadingProvider>
			</AlertProvider>
		</PaperProvider>
	);
};

export default RootLayout;
