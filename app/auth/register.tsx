import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

import { isSmallerScreen } from 'src/config';
import { ScreenWrapper } from 'components/layout/screen-wrapper';
import { IconButton } from 'components/controls/icon-button';
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
		<ScreenWrapper>
			<View
				style={{
					paddingHorizontal: isSmallerScreen ? 10 : 30,
					paddingVertical: isSmallerScreen ? 10 : 20,
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<IconButton
					icon='arrow-back'
					size={isSmallerScreen ? 35 : 40}
					style={{
						borderRadius: 5,
						marginRight: isSmallerScreen ? 10 : 15,
					}}
					onPress={() => router.back()}
				/>

				<Text
					style={{ marginBottom: 5 }}
					variant={isSmallerScreen ? 'headlineMedium' : 'headlineSmall'}
				>
					{"Welcome! Let's Get Started"}
				</Text>
			</View>

			<FormControl {...props.field.email} />

			<FormControl {...props.field.name} />

			<FormControl {...props.field.password} />

			{props.status && <Alert {...props.status} />}

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
