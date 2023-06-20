import { logout } from 'contexts/auth';
import { Button } from 'components/controls/button';
import { ScreenWrapper } from 'components/layout/screen-wrapper';

const App = () => {
	return (
		<ScreenWrapper
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
		>
			<Button
				label='Logout'
				onPress={() => logout()}
			/>
		</ScreenWrapper>
	);
};

export default App;
