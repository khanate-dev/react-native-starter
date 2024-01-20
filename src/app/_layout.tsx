import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { fetchUpdateAsync, reloadAsync, useUpdates } from 'expo-updates';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';

import { env } from '../config.ts';
import { AlertProvider, addAlert } from '../contexts/alert.context.tsx';
import { LoadingProvider } from '../contexts/loading.context.tsx';
import { useMode } from '../hooks/mode.hook.tsx';
import { darkTheme, lightTheme } from '../theme.ts';

import type { PropsWithChildren } from 'react';

const UpdateCheckerProvider = (props: PropsWithChildren) => {
	const { isUpdateAvailable } = useUpdates();
	useEffect(() => {
		if (env !== 'production' || !isUpdateAvailable) return;
		addAlert({
			title: 'Update Available!',
			text: 'A New Update Is Available For The App.\nRestart The Application To Apply Updates.',
			closeLabel: 'Later',
			noIcon: true,
			actions: [
				{
					label: 'Restart & Update',
					onPress: async () => fetchUpdateAsync().then(reloadAsync),
				},
			],
		});
	}, [isUpdateAvailable]);

	return props.children;
};

const RootLayout = () => {
	const mode = useMode();

	return (
		<PaperProvider theme={mode.setting === 'dark' ? darkTheme : lightTheme}>
			<AlertProvider>
				<LoadingProvider>
					<UpdateCheckerProvider>
						<StatusBar
							style='light'
							backgroundColor='#000000'
						/>
						<Slot />
					</UpdateCheckerProvider>
				</LoadingProvider>
			</AlertProvider>
		</PaperProvider>
	);
};

export default RootLayout;
