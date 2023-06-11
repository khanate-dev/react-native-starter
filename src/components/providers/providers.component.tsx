import { PaperProvider } from 'react-native-paper';

import { DarkModeProvider, useDarkMode } from 'contexts/dark-mode';
import { AuthProvider } from 'contexts/auth';
import { AlertProvider } from 'contexts/alert';
import { LoadingProvider } from 'contexts/loading';
import { darkTheme, lightTheme } from 'styles/theme';

import type { PropsWithChildren } from 'react';

export const Providers = ({ children }: PropsWithChildren) => (
	<DarkModeProvider>
		<PaperProvider theme={useDarkMode() ? darkTheme : lightTheme}>
			<AuthProvider>
				<AlertProvider>
					<LoadingProvider>{children}</LoadingProvider>
				</AlertProvider>
			</AuthProvider>
		</PaperProvider>
	</DarkModeProvider>
);
