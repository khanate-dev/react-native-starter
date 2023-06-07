import { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';

import { environment } from 'config';
import { addAlert } from 'contexts/alert';
import { Auth } from 'screens/auth';
import { OwnerDashboard } from 'screens/owner-dashboard';
import { Providers } from 'components/Providers';

import type { User } from 'schemas/user';

const appStack = createNativeStackNavigator<{
	auth: undefined;
	'owner-dashboard': undefined;
	'supervisor-dashboard': undefined;
}>();

const App = () => {
	const [user, setUser] = useState<null | User>(null);

	useEffect(() => {
		if (
			environment !== 'production' ||
			typeof Updates.addListener !== 'function'
		)
			return;

		Updates.addListener((event) => {
			if (event.type !== Updates.UpdateEventType.UPDATE_AVAILABLE)
				return;


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
		<Providers
			user={user}
			setUser={setUser}
		>
			<StatusBar
				style='light'
				backgroundColor='#000000'
			/>

			<appStack.Navigator
				initialRouteName='auth'
				screenOptions={{ headerShown: false }}
			>
				{!user ? (
					<appStack.Screen
						name='auth'
						component={Auth}
					/>
				) : (
					<appStack.Screen
						name='owner-dashboard'
						component={OwnerDashboard}
					/>
				)}
			</appStack.Navigator>
		</Providers>
	);
};

// eslint-disable-next-line import/no-default-export
export default App;
