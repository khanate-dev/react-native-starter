import { useEffect, useReducer } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import { PaperProvider } from 'react-native-paper';
import { Slot, SplashScreen } from 'expo-router';
import { loadAsync } from 'expo-font';

import { darkTheme, lightTheme } from '~/theme';
import { addAlert, AlertProvider } from '~/contexts/alert';
import { DarkModeProvider, useDarkMode } from '~/contexts/dark-mode';
import { LoadingProvider } from '~/contexts/loading';
import { I18nProvider } from '~/contexts/i18n';
import { AuthProvider } from '~/contexts/auth';
import { env } from '~/config';
import { getSetting } from '~/helpers/settings';

import type { Reducer } from 'react';
import type { LoggedInUser } from '~/schemas/user';

SplashScreen.preventAutoHideAsync();

type State = { loaded: false } | { loaded: true; user: null | LoggedInUser };

const Providers = () => {
	const isDarkMode = useDarkMode();

	const [state, dispatch] = useReducer<Reducer<State, null | LoggedInUser>>(
		(_, user) => ({ loaded: true, user }),
		{ loaded: false },
	);

	useEffect(() => {
		Promise.all([
			getSetting('user'),
			loadAsync({
				InterRegular: require('~/assets/fonts/inter-regular.otf'),
				InterBold: require('~/assets/fonts/inter-bold.otf'),
			}),
		]).then(([user]) => {
			dispatch(user);
			SplashScreen.hideAsync();
		});
	}, []);

	if (!state.loaded) return null;

	return (
		<I18nProvider>
			<PaperProvider theme={isDarkMode ? darkTheme : lightTheme}>
				<AlertProvider>
					<LoadingProvider>
						<AuthProvider defaultUser={state.user}>
							<StatusBar
								style='light'
								backgroundColor='#000000'
							/>
							<Slot />
						</AuthProvider>
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
