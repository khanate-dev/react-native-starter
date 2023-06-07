import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, useTheme } from '@ui-kitten/components';
import { isSmallerScreen } from 'src/config';
import { getHeadingGradientProps } from 'helpers/color';

import { loginFields as fields, loginFormSchema } from 'schemas/user';
import { login } from 'endpoints/user';
import { setUser } from 'contexts/user';
import { ScreenWrapper } from 'components/layout/screen-wrapper';
import { Form } from 'components/form/form';
import { IconButton } from 'components/form/icon-button';
import { FormButton } from 'components/form/form-button';

import { loginStyles as styles } from './login.styles';

import type { AuthPageProps } from '../auth.types';
import type { ImageStyle } from 'react-native';

export const Login = ({ navigation, route }: AuthPageProps<'login'>) => {
	const theme = useTheme();

	return (
		<ScreenWrapper hasPlainBackground>
			<LinearGradient
				{...getHeadingGradientProps(theme)}
				style={styles.header}
			>
				<IconButton
					name='arrow-back'
					style={styles.back}
					size={40}
					type='basic'
					onPress={() => navigation.goBack()}
				/>

				<Image
					style={styles.headerImage as ImageStyle}
					resizeMode='contain'
					source={require('media/images/login-header.png')}
				/>

				<Text
					style={styles.headerText}
					category='h2'
				>
					Hi, {'\n'}Please {'\n'}Login
				</Text>
			</LinearGradient>

			<Form
				style={styles.form}
				fields={fields}
				submitLabel={(isSubmitting) =>
					isSubmitting ? 'Logging In...' : 'Login'
				}
				defaultValues={route.params}
				onSubmit={async (state) => {
					const body = loginFormSchema.parse(state);
					const user = await login(body);
					setTimeout(() => setUser(user), 1000);
					return 'Logged In! Redirecting...';
				}}
			/>

			<FormButton
				style={styles.forgotButton}
				label='Forgot Password?'
				appearance='ghost'
				size={isSmallerScreen ? 'small' : 'medium'}
				status='basic'
				borders='curved'
				onPress={() => navigation.navigate('forgot-password')}
			/>
		</ScreenWrapper>
	);
};
