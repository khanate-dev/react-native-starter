import { Button } from '../../components/controls/button.component.tsx';
import { ScreenWrapper } from '../../components/layout/screen-wrapper.component.tsx';
import { authStore } from '../../hooks/auth.hook.tsx';
import { useI18n } from '../../i18n.ts';

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
					authStore.remove();
				}}
			/>
		</ScreenWrapper>
	);
};

export default App;
