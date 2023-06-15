import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

import { userSchema } from 'schemas/user';
import { endpoints } from 'endpoints';
import { login } from 'contexts/auth';
import { ScreenWrapper } from 'components/layout/screen-wrapper';
import { Button } from 'components/controls/button';
import { useForm } from 'hooks/form';
import { FormControl } from 'components/controls/form-control';
import { Alert } from 'components/feedback/alert';

const Login = () => {
	const router = useRouter();

	const { props, state } = useForm({
		schema: userSchema.pick({ email: true, password: true }),
		details: {
			email: { type: 'email', next: 'password' },
			password: { type: 'password' },
		},
		onSubmit: async (values) => {
			const user = await endpoints.user.login(values);
			setTimeout(() => login(user), 1000);
			return 'Logged In! Redirecting...';
		},
	});

	return (
		<ScreenWrapper
			title='login'
			style={{ padding: 15, gap: 5 }}
			onBack={() => router.back()}
		>
			<Text
				variant='headlineMedium'
				style={{ marginBottom: 'auto' }}
			>
				Hi, {'\n'}Please {'\n'}Login
			</Text>

			<FormControl {...props.field.email} />

			<FormControl {...props.field.password} />

			{props.status && (
				<Alert
					{...props.status}
					style={{ marginBottom: 10 }}
				/>
			)}

			<Button
				{...props.button}
				icon='submit'
				label={state.status.type === 'submitting' ? 'Logging In...' : 'Log In'}
			/>

			<Button
				label='Forgot Password?'
				mode='contained-tonal'
				style={{
					width: 200,
					marginLeft: 'auto',
					marginRight: 'auto',
					marginTop: 10,
				}}
				onPress={() => router.push('/auth/forgot-password')}
			/>
		</ScreenWrapper>
	);
};

export default Login;
