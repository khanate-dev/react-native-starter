import { useRouter } from 'expo-router';
import { Text } from 'react-native-paper';

import { Button } from '~/components/controls/button';
import { FormControl } from '~/components/controls/form-control';
import { Alert } from '~/components/feedback/alert';
import { ScreenWrapper } from '~/components/layout/screen-wrapper';
import { useI18n } from '~/contexts/i18n';
import { endpoints } from '~/endpoints';
import { useForm } from '~/hooks/form';
import { useTheme } from '~/hooks/theme';
import { userSchema } from '~/schemas/user';

const Register = () => {
	const theme = useTheme();
	const { content } = useI18n();
	const router = useRouter();

	const { props, state } = useForm({
		schema: userSchema.pick({ email: true, name: true, password: true }),
		details: {
			email: { type: 'email', next: 'name' },
			name: { type: 'string', next: 'password' },
			password: { type: 'password' },
		},
		onSubmit: async (values) => {
			const { email: _ } = await endpoints.user.add({
				...values,
				image_url: null,
			});
			setTimeout(
				// // () => router.push({ pathname: '/auth/login', params: { email } }),
				() => {
					router.push('/auth/login');
				},
				1000,
			);
			return 'user added! please wait...';
		},
	});

	return (
		<ScreenWrapper
			title={content.pages.register}
			style={{ padding: 15, gap: 5 }}
			back
		>
			<Text
				variant='headlineMedium'
				style={theme.styles.text.heading}
			>
				{content.headings.register}
			</Text>

			<FormControl
				{...props.field.email}
				hasIcon
			/>

			<FormControl
				{...props.field.name}
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
				loading={state.status.type === 'submitting'}
				label={content.action.register}
			/>
		</ScreenWrapper>
	);
};

export default Register;