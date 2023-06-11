import { Surface, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

import { isSmallerScreen } from 'src/config';
import { userSchema } from 'schemas/user';
import { endpoints } from 'endpoints';
import { login } from 'contexts/auth';
import { ScreenWrapper } from 'components/layout/screen-wrapper';
import { Form } from 'components/controls/form';
import { IconButton } from 'components/controls/icon-button';
import { Button } from 'components/controls/button';
import { FormSchema } from 'schemas/form-schema.class';

const headerHeight = isSmallerScreen ? 250 : 300;

const schema = new FormSchema({
	email: { zod: userSchema.shape.email, type: 'email' },
	password: { zod: userSchema.shape.password, type: 'password' },
});

export const Login = () => {
	const router = useRouter();

	return (
		<ScreenWrapper>
			<Surface
				elevation={5}
				style={{
					height: headerHeight,
					maxHeight: headerHeight,
					position: 'relative',
				}}
			>
				<IconButton
					icon='arrow-back'
					size={40}
					style={{
						marginTop: 30,
						marginLeft: 30,
						borderRadius: 5,
						marginBottom: 15,
					}}
					onPress={() => router.back()}
				/>

				<Text
					variant='headlineMedium'
					style={{ marginLeft: 30 }}
				>
					Hi, {'\n'}Please {'\n'}Login
				</Text>
			</Surface>

			<Form
				schema={schema}
				componentProps={(_, isSubmitting) => ({
					container: {
						style: {
							flexGrow: 1,
							flexShrink: 0,
							padding: isSmallerScreen ? 10 : 30,
						},
					},
					button: {
						label: isSubmitting ? 'Logging In...' : 'Log In',
					},
				})}
				onSubmit={async (state) => {
					const user = await endpoints.user.login(state);
					setTimeout(() => login(user), 1000);
					return 'Logged In! Redirecting...';
				}}
			/>

			<Button
				label='Forgot Password?'
				style={{
					marginTop: 0,
					marginBottom: isSmallerScreen ? 10 : 20,
					padding: 0,
					width: 200,
					marginLeft: 'auto',
					marginRight: 'auto',
				}}
				onPress={() => router.push('/auth/forgot-password')}
			/>
		</ScreenWrapper>
	);
};
