import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

import { ScreenWrapper } from 'components/layout/screen-wrapper';
import { userSchema } from 'schemas/user';
import { endpoints } from 'src/endpoints';
import { FormControl } from 'components/controls/form-control';
import { useForm } from 'hooks/form';
import { Button } from 'components/controls/button';
import { Alert } from 'components/feedback/alert';

const Register = () => {
	const router = useRouter();

	const { props, state } = useForm({
		schema: userSchema.pick({ email: true, name: true, password: true }),
		details: {
			email: { type: 'email', next: 'name' },
			name: { type: 'string', next: 'password' },
			password: { type: 'password' },
		},
		onSubmit: async (values) => {
			const { email } = await endpoints.user.add(values);
			setTimeout(
				() => router.push({ pathname: '/auth/login', params: { email } }),
				1000
			);
			return 'user added! please wait...';
		},
	});

	return (
		<ScreenWrapper
			title='register'
			style={{ padding: 15, gap: 5 }}
			onBack={() => router.back()}
		>
			<Text
				variant='headlineMedium'
				style={{ marginBottom: 'auto' }}
			>
				Welcome! {'\n'}
				{"Let's Get Started"}
			</Text>

			<FormControl {...props.field.email} />

			<FormControl {...props.field.name} />

			<FormControl {...props.field.password} />

			{props.status && (
				<Alert
					{...props.status}
					style={{ marginBottom: 10 }}
				/>
			)}

			<Button
				{...props.button}
				label={
					state.status.type === 'submitting' ? 'Submitting...' : 'Create User'
				}
			/>
		</ScreenWrapper>
	);
};

export default Register;
