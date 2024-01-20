import { useRouter } from 'expo-router';
import { Text } from 'react-native-paper';

import { Button } from '../../../components/controls/button.component.tsx';
import { ScreenWrapper } from '../../../components/layout/screen-wrapper.component.tsx';
import { useI18n } from '../../../contexts/i18n.context.tsx';
import { useTheme } from '../../../hooks/theme.hook.tsx';

const Auth = () => {
	const theme = useTheme();
	const { content } = useI18n();
	const router = useRouter();

	return (
		<ScreenWrapper
			style={{
				flexGrow: 1,
				padding: 40,
				gap: 20,
			}}
		>
			<Text
				variant='headlineLarge'
				style={theme.styles.text.heading}
			>
				{content.headings.welcome}
			</Text>

			<Button
				label={content.action.register}
				onPress={() => {
					router.navigate('/auth/register');
				}}
			/>

			<Button
				label={content.action.login}
				onPress={() => {
					router.navigate('/auth/login');
				}}
			/>
		</ScreenWrapper>
	);
};

export default Auth;
