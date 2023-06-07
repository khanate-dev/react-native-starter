import { Surface, Text } from 'react-native-paper';

import { isSmallerScreen } from 'src/config';
import { loginFields as fields, loginFormSchema } from 'schemas/user';
import { endpoints } from 'endpoints';
import { setUser } from 'contexts/user';
import { ScreenWrapper } from 'components/layout/screen-wrapper';
import { Form } from 'components/controls/form';
import { IconButton } from 'components/controls/icon-button';
import { FormButton } from 'components/controls/form-button';

import { loginStyles as styles } from './login.styles';

import type { AuthPageProps } from '../auth.types';

export const Login = ({ navigation, route }: AuthPageProps<'login'>) => {
	return (
		<ScreenWrapper hasPlainBackground>
			<Surface
				elevation={5}
				style={styles.header}
			>
				<IconButton
					icon='arrow-back'
					style={styles.back}
					size={40}
					onPress={() => navigation.goBack()}
				/>

				<Text
					style={styles.headerText}
					variant='headlineMedium'
				>
					Hi, {'\n'}Please {'\n'}Login
				</Text>
			</Surface>

			<Form
				style={styles.form}
				fields={fields}
				defaultValues={route.params}
				submitLabel={(isSubmitting) =>
					isSubmitting ? 'Logging In...' : 'Login'
				}
				onSubmit={async (state) => {
					const body = loginFormSchema.parse(state);
					const user = await endpoints.user.login(body);
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
