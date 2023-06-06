import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ViewSites } from './view-sites';
import { NewSite } from './new-site';

import type { OwnerDashboardPages } from './owner-dashboard.types';

const authStack = createNativeStackNavigator<OwnerDashboardPages>();

export const OwnerDashboard = () => (
	<authStack.Navigator
		initialRouteName='view-sites'
		screenOptions={{ headerShown: false }}
	>
		<authStack.Screen
			name='view-sites'
			component={ViewSites}
		/>
		<authStack.Screen
			name='new-site'
			component={NewSite}
		/>
	</authStack.Navigator>
);
