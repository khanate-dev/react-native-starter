import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthStart } from './auth-start';
import { Login } from './login';
import { Register } from './register';
import { ForgotPassword } from './forgot-password';

import type { AuthPages } from './auth.types';

const authStack = createNativeStackNavigator<AuthPages>();

export const Auth = () => (
	<authStack.Navigator
		initialRouteName='auth-start'
		screenOptions={{ headerShown: false }}
	>
		<authStack.Screen
			name='auth-start'
			component={AuthStart}
		/>
		<authStack.Screen
			name='login'
			component={Login}
		/>
		<authStack.Screen
			name='register'
			component={Register}
		/>
		<authStack.Screen
			name='forgot-password'
			component={ForgotPassword}
		/>
	</authStack.Navigator>
);
