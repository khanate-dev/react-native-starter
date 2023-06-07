import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ViewSheds } from './view-sheds';
import { UpdateShed } from './update-shed';
import { UpdateWeights } from './update-weights';
import { BookSales } from './book-sales';
import { ShedModal } from './shed-modal';

import type { SupervisorDashboardPages } from './dashboard.types';

const dashboardStack = createNativeStackNavigator<SupervisorDashboardPages>();

export const SupervisorDashboard = () => (
	<dashboardStack.Navigator
		initialRouteName='view-sheds'
		screenOptions={{ headerShown: false }}
	>
		<dashboardStack.Group>
			<dashboardStack.Screen
				name='view-sheds'
				component={ViewSheds}
			/>
			<dashboardStack.Screen
				name='update-shed'
				component={UpdateShed}
			/>
			<dashboardStack.Screen
				name='update-weights'
				component={UpdateWeights}
			/>
			<dashboardStack.Screen
				name='book-sales'
				component={BookSales}
			/>
		</dashboardStack.Group>
		<dashboardStack.Group screenOptions={{ presentation: 'transparentModal' }}>
			<dashboardStack.Screen
				name='modal'
				component={ShedModal}
			/>
		</dashboardStack.Group>
	</dashboardStack.Navigator>
);
