import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

import { isSmallerScreen } from 'src/config';
import { ScreenWrapper } from 'components/layout/screen-wrapper';
import { Form } from 'components/controls/form';
import { IconButton } from 'components/controls/icon-button';
import { FormSchema } from 'schemas/form-schema.class';
import { userSchema } from 'schemas/user';
import { endpoints } from 'src/endpoints';

const schema = new FormSchema({
	email: { zod: userSchema.shape.email, type: 'email' },
	name: { zod: userSchema.shape.name, type: 'string' },
	password: { zod: userSchema.shape.password, type: 'password' },
});

export const Register = () => {
	const router = useRouter();
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

			<Form
				schema={schema}
				componentProps={(_, isSubmitting) => ({
					container: {
						style: {
							flexGrow: 1,
							flexShrink: 1,
							padding: isSmallerScreen ? 10 : 30,
						},
					},
					button: {
						label: isSubmitting ? 'Submitting...' : 'Create User',
					},
				})}
				onSubmit={async (state) => {
					await endpoints.user.add(state);
					setTimeout(() => router.push('/auth/login'), 1000);
					return 'User Added! Please Wait...';
				}}
			/>
		</ScreenWrapper>
	);
};
