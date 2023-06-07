import { PaperProvider } from 'react-native-paper';

import { DarkModeProvider, useDarkMode } from 'contexts/dark-mode';
import { UserProvider } from 'contexts/user';
import { AlertProvider } from 'contexts/alert';
import { LoadingProvider } from 'contexts/loading';
import { darkTheme, lightTheme } from 'styles/theme';

import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import type { LoggedInUser } from 'schemas/user';

export type ProvidersProps = PropsWithChildren<{
	user: null | LoggedInUser;
	setUser: Dispatch<SetStateAction<null | LoggedInUser>>;
}>;

const ProvidersSansDarkMode = ({ user, setUser, children }: ProvidersProps) => {
	const isDarkMode = useDarkMode();
	return (
		<PaperProvider theme={isDarkMode ? darkTheme : lightTheme}>
			<UserProvider
				user={user}
				setUser={setUser}
			>
				<AlertProvider>
					<LoadingProvider>{children}</LoadingProvider>
				</AlertProvider>
			</UserProvider>
		</PaperProvider>
	);
};

export const Providers = ({ children, user, setUser }: ProvidersProps) => (
	<DarkModeProvider>
		<ProvidersSansDarkMode
			user={user}
			setUser={setUser}
		>
			{children}
		</ProvidersSansDarkMode>
	</DarkModeProvider>
);
