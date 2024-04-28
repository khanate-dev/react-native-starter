import { Button } from '../../components/controls/button.component.js';
import { ScreenWrapper } from '../../components/layout/screen-wrapper.component.js';
import { logout } from '../../hooks/user.hook.js';
import { useI18n } from '../../i18n.js';

const App = () => {
	const { content } = useI18n();

	return (
		<ScreenWrapper
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
		>
			<Button
				icon='logout'
				label={content.action.logout}
				onPress={() => {
					logout();
				}}
			/>
		</ScreenWrapper>
	);
};

export default App;
