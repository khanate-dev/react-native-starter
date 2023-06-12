import { Surface, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

import { isSmallerScreen } from 'src/config';
import { userSchema } from 'schemas/user';
import { endpoints } from 'endpoints';
import { login } from 'contexts/auth';
import { ScreenWrapper } from 'components/layout/screen-wrapper';
import { IconButton } from 'components/controls/icon-button';
import { Button } from 'components/controls/button';
import { useForm } from 'hooks/form';
import { FormControl } from 'components/controls/form-control';

const headerHeight = isSmallerScreen ? 250 : 300;

const schema = userSchema.pick({ email: true, password: true });

export const Login = () => {
	const router = useRouter();

	const { fields, status, statusJsx, buttonProps, handleSubmit } = useForm(
		schema,
		{ email: { type: 'email' }, password: { type: 'password' } },
		async (state) => {
			const user = await endpoints.user.login(state);
			setTimeout(() => login(user), 1000);
			return 'Logged In! Redirecting...';
		}
	);

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

			<FormControl {...fields.email} />

			<FormControl
				{...fields.password}
				isLast
				onSubmit={handleSubmit}
			/>

			{statusJsx}

			<Button
				{...buttonProps}
				icon='submit'
				label={status.type === 'submitting' ? 'Logging In...' : 'Log In'}
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
