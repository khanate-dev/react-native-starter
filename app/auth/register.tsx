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

const schema = userSchema.pick({ email: true, name: true, password: true });

export const Register = () => {
	const router = useRouter();

	const { fields, buttonProps, statusJsx, status, handleSubmit } = useForm(
		schema,
		{
			email: { type: 'email' },
			name: { type: 'string' },
			password: { type: 'password' },
		},
		async (state) => {
			await endpoints.user.add(state);
			setTimeout(() => router.push('/auth/login'), 1000);
			return 'User Added! Please Wait...';
		}
	);

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

			<FormControl {...fields.email} />

			<FormControl {...fields.name} />

			<FormControl
				{...fields.password}
				isLast
				onSubmit={handleSubmit}
			/>

			{statusJsx}

			<Button
				{...buttonProps}
				label={status.type === 'submitting' ? 'Submitting...' : 'Create User'}
				onPress={handleSubmit}
			/>
		</ScreenWrapper>
	);
};
