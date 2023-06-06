import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { AlertProvider } from 'contexts/alert';
import { LoadingProvider } from 'contexts/loading';
import { UserProvider } from 'contexts/user';
import { theme, themeMapping } from 'styles/theme';

import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { User } from 'schemas/user';

export type ProvidersProps = {
	children: ReactNode;
	user: null | User;
	setUser: Dispatch<SetStateAction<null | User>>;
};

export const Providers = ({ user, setUser, children }: ProvidersProps) => {
	return (
		<NavigationContainer>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider
				{...eva}
				customMapping={{
					...eva.mapping,
					...themeMapping,
				}}
				theme={{
					...eva.light,
					...theme,
				}}
			>
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
			</ApplicationProvider>
		</NavigationContainer>
	);
};
