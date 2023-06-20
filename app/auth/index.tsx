import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

import { ScreenWrapper } from 'components/layout/screen-wrapper';
import { Button } from 'components/controls/button';
import { useTheme } from 'hooks/theme';
import { useI18n } from 'contexts/i18n';

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
				style={{
					color: theme.colors.primary,
					marginBottom: 'auto',
				}}
			>
				{content.welcome}
			</Text>

			<Button
				label={content.register}
				onPress={() => router.push('/auth/register')}
			/>

			<Button
				label={content.login}
				onPress={() => router.push('/auth/login')}
			/>
		</ScreenWrapper>
	);
};

export default Auth;
