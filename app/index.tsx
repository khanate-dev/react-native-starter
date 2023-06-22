import { logout } from '~/contexts/auth';
import { Button } from '~/components/controls/button';
import { ScreenWrapper } from '~/components/layout/screen-wrapper';
import { useI18n } from '~/contexts/i18n';

const App = () => {
	const { content } = useI18n();
	return (
		<ScreenWrapper
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
		>
			<Button
				icon='logout'
				label={content.action.logout}
				onPress={() => logout()}
			/>
		</ScreenWrapper>
	);
};

export default App;
