import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

import { useTheme } from '~/hooks/theme';
import { useI18n } from '~/contexts/i18n';
import { ScreenWrapper } from '~/components/layout/screen-wrapper';
import { Button } from '~/components/controls/button';

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
				onPress={() => router.push('/auth/register')}
			/>

			<Button
				label={content.action.login}
				onPress={() => router.push('/auth/login')}
			/>
		</ScreenWrapper>
	);
};

export default Auth;
