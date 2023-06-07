import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';

import { AlertProvider } from 'contexts/alert';
import { LoadingProvider } from 'contexts/loading';
import { UserProvider } from 'contexts/user';

import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { LoggedInUser } from 'schemas/user';

export type ProvidersProps = {
	children: ReactNode;
	user: null | LoggedInUser;
	setUser: Dispatch<SetStateAction<null | LoggedInUser>>;
};

export const Providers = ({ user, setUser, children }: ProvidersProps) => {
	return (
		<NavigationContainer>
			<PaperProvider>
				<AlertProvider>
					<LoadingProvider>
						<UserProvider
							user={user}
							setUser={setUser}
						>
							{children}
						</UserProvider>
					</LoadingProvider>
				</AlertProvider>
			</PaperProvider>
		</NavigationContainer>
	);
};
