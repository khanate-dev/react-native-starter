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
			email: { type: 'email' },
			name: { type: 'string' },
			password: { type: 'password', isLast: true },
		},
		onSubmit: async (values) => {
			await endpoints.user.add(values);
			setTimeout(() => router.push('/auth/login'), 1000);
			return 'User Added! Please Wait...';
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
