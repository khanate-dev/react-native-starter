import { Text, useTheme } from 'react-native-paper';
import { View } from 'react-native';
import { useRouter } from 'expo-router';

import { ScreenWrapper } from 'components/layout/screen-wrapper';
import { Button } from 'components/controls/button';
import { AppLogo } from 'components/media/app-logo';

const Auth = () => {
	const theme = useTheme();
	const router = useRouter();

	return (
		<ScreenWrapper>
			<View style={{ flex: 1, padding: 40 }}>
				<View
					style={{
						borderWidth: 2,
						padding: 10,
						width: 80,
						height: 80,
						aspectRatio: 1,
						borderRadius: 10,
						overflow: 'hidden',
						shadowRadius: 6.27,
						shadowOffset: { width: 0, height: 5 },
						shadowOpacity: 0.34,
						elevation: 10,
						marginBottom: 20,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<AppLogo size={70} />
				</View>

				<Text
					variant='titleLarge'
					style={{
						color: theme.colors.primary,
						fontWeight: 'normal',
						textShadowRadius: 10,
						textShadowOffset: {
							width: 1,
							height: 3,
						},
						marginBottom: 'auto',
					}}
				>
					Welcome to {'\n'}React Native Starter
				</Text>

				<View style={{ flexGrow: 1, justifyContent: 'center' }}>
					<Button
						label='Register'
						style={{ marginBottom: 20 }}
						onPress={() => router.push('/auth/register')}
					/>

					<Button
						label='Login'
						onPress={() => router.push('/auth/login')}
					/>
				</View>
			</View>
		</ScreenWrapper>
	);
};

export default Auth;
