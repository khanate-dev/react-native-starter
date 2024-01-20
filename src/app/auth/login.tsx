import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from 'react-native-paper';

import { ButtonLink } from '../../components/controls/button-link.component.tsx';
import { Button } from '../../components/controls/button.component.tsx';
import { FormControl } from '../../components/controls/form-control.component.tsx';
import { Alert } from '../../components/feedback/alert.component.tsx';
import { ScreenWrapper } from '../../components/layout/screen-wrapper.component.tsx';
import { endpoints } from '../../endpoints/endpoints.ts';
import { useForm } from '../../hooks/form.hook.tsx';
import { useTheme } from '../../hooks/theme.hook.tsx';
import { login } from '../../hooks/user.hook.tsx';
import { useI18n } from '../../i18n.ts';
import { userSchema } from '../../schemas/user.schemas.ts';

const Login = () => {
	const theme = useTheme();
	const { content } = useI18n();
	const router = useRouter();
	const { email } = useLocalSearchParams<{ email?: string }>();

	const { props, state } = useForm({
		schema: userSchema.pick({ email: true, password: true }),
		details: {
			email: { type: 'email', next: 'password', default: email },
			password: { type: 'password' },
		},
		onSubmit: async (values) => {
			const user = await endpoints.user.login(values);
			setTimeout(async () => {
				await login(user);
				router.navigate('/(app)');
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

			<ButtonLink
				href='/auth/forgot-password'
				label={content.action.forgotPassword}
				mode='contained-tonal'
				style={{
					width: 200,
					marginLeft: 'auto',
					marginRight: 'auto',
					marginTop: 10,
				}}
			/>
		</ScreenWrapper>
	);
};

export default Login;
