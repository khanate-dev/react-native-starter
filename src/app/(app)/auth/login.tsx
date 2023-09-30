import { useRouter } from 'expo-router';
import { Text } from 'react-native-paper';

import { Button } from '~/components/controls/button.component';
import { FormControl } from '~/components/controls/form-control.component';
import { Alert } from '~/components/feedback/alert.component';
import { ScreenWrapper } from '~/components/layout/screen-wrapper.component';
import { login } from '~/contexts/auth.context';
import { useI18n } from '~/contexts/i18n.context';
import { endpoints } from '~/endpoints/endpoints';
import { useForm } from '~/hooks/form.hook';
import { useTheme } from '~/hooks/theme.hook';
import { userSchema } from '~/schemas/user.schemas';

const Login = () => {
	const theme = useTheme();
	const { content } = useI18n();
	const router = useRouter();
	// // const { email } = useLocalSearchParams<{ email?: string }>();

	const { props, state } = useForm({
		schema: userSchema.pick({ email: true, password: true }),
		details: {
			email: { type: 'email', next: 'password', default: '' },
			password: { type: 'password' },
		},
		onSubmit: async (values) => {
			const user = await endpoints.user.login(values);
			setTimeout(() => {
				login(user);
			}, 1000);
			return 'Logged In! Redirecting...';
		},
	});

	return (
		<ScreenWrapper
			title={content.pages.login}
			style={{ padding: 15, gap: 5 }}
			back
		>
			<Text
				variant='headlineMedium'
				style={theme.styles.text.heading}
			>
				{content.headings.login}
			</Text>

			<FormControl
				{...props.field.email}
				hasIcon
			/>

			<FormControl
				{...props.field.password}
				hasIcon
			/>

			{props.status && (
				<Alert
					{...props.status}
					style={{ marginBottom: 10 }}
				/>
			)}

			<Button
				{...props.button}
				icon='submit'
				loading={state.status.type === 'submitting'}
				label={content.action.login}
			/>

			<Button
				label={content.action.forgotPassword}
				mode='contained-tonal'
				style={{
					width: 200,
					marginLeft: 'auto',
					marginRight: 'auto',
					marginTop: 10,
				}}
				onPress={() => {
					router.push('/auth/forgot-password');
				}}
			/>
		</ScreenWrapper>
	);
};

export default Login;
