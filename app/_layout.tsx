import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import { PaperProvider } from 'react-native-paper';
import { Slot } from 'expo-router';

import { environment } from 'config';
import { darkTheme, lightTheme } from 'styles/theme';
import { addAlert, AlertProvider } from 'contexts/alert';
import { DarkModeProvider, useDarkMode } from 'contexts/dark-mode';
import { AuthProvider } from 'contexts/auth';
import { LoadingProvider } from 'contexts/loading';

const Providers = () => {
	const isDarkMode = useDarkMode();
	return (
		<PaperProvider theme={isDarkMode ? darkTheme : lightTheme}>
			<AuthProvider>
				<AlertProvider>
					<LoadingProvider>
						<StatusBar
							style='light'
							backgroundColor='#000000'
						/>
						<Slot />
					</LoadingProvider>
				</AlertProvider>
			</AuthProvider>
		</PaperProvider>
	);
};

const Root = () => {
	useEffect(() => {
		if (
			environment !== 'production' ||
			typeof Updates.addListener !== 'function'
		)
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

export default Root;