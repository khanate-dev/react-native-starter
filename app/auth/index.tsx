import { Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

import { ScreenWrapper } from 'components/layout/screen-wrapper';
import { Button } from 'components/controls/button';

const Auth = () => {
	const theme = useTheme();
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
				Welcome to
				{'\n'}
				React Native Starter
			</Text>

			<Button
				label='Register'
				onPress={() => router.push('auth/register')}
			/>

			<Button
				label='Login'
				onPress={() => router.push('auth/login')}
			/>
		</ScreenWrapper>
	);
};

export default Auth;
