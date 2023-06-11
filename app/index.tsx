import { View } from 'react-native';

import { logout } from 'contexts/auth';
import { Button } from 'components/controls/button';

const App = () => {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Button
				label='Logout'
				onPress={() => logout()}
			/>
		</View>
	);
};

export default App;
