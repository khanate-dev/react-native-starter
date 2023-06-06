import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AddSite } from './add-site';
import { AddSheds } from './add-sheds';
import { AddSupervisor } from './add-supervisor';

import type { NewSitePages } from './new-site.types';

const registerNavigation = createNativeStackNavigator<NewSitePages>();

export const NewSite = () => {
	return (
		<registerNavigation.Navigator
			initialRouteName='add-site'
			screenOptions={{ headerShown: false }}
		>
			<registerNavigation.Screen
				name='add-site'
				component={AddSite}
			/>

			<registerNavigation.Screen
				name='add-sheds'
				component={AddSheds}
			/>

			<registerNavigation.Screen
				name='add-supervisor'
				component={AddSupervisor}
			/>
		</registerNavigation.Navigator>
	);
};
