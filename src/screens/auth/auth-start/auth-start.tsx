import { Text, useStyleSheet } from '@ui-kitten/components';
import { ImageBackground, View } from 'react-native';

import { ScreenWrapper } from 'components/layout/screen-wrapper';
import { FormButton } from 'components/form/form-button';
import { AppLogo } from 'components/media/app-logo';

import { authStartStyles } from './auth-start.styles';

import type { AuthPageProps } from '../auth.types';
import type { ImageStyle } from 'react-native';

export const AuthStart = ({ navigation }: AuthPageProps<'auth-start'>) => {
	const styles = useStyleSheet(authStartStyles);

	return (
		<ScreenWrapper>
			<ImageBackground
				style={styles.container}
				imageStyle={styles.background as ImageStyle}
				source={require('media/images/auth-background.png')}
				resizeMode='cover'
			>
				<View style={styles.content}>
					<View style={styles.logo}>
						<AppLogo size={70} />
					</View>

					<Text
						style={styles.title}
						category='h1'
						status='primary'
					>
						Welcome to {'\n'}Compass Poultry
					</Text>

					<View style={styles.buttons}>
						<FormButton
							style={styles.registerButton}
							label='Register'
							appearance='outline'
							status='control'
							size='giant'
							borders='rounded'
							onPress={() => navigation.navigate('register')}
						/>

						<FormButton
							style={styles.loginButton}
							appearance='ghost'
							label='Login'
							status='primary'
							size='giant'
							borders='rounded'
							onPress={() => navigation.navigate('login')}
						/>
					</View>
				</View>
			</ImageBackground>
		</ScreenWrapper>
	);
};
