import { useState } from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { z } from 'zod';
import { useRouter } from 'expo-router';

import { wait } from 'helpers/async';
import { ScreenWrapper } from 'components/layout/screen-wrapper';
import { userSchema } from 'schemas/user';
import { isSmallerScreen } from 'src/config';
import { AppIcon } from 'components/media/app-icon';
import { useForm } from 'hooks/form';
import { Button } from 'components/controls/button';
import { FormControl } from 'components/controls/form-control';
import { Alert } from 'components/feedback/alert';

export type ResetCodeStatus =
	| 'idle'
	| 'sending'
	| 'sent'
	| 'sendingFailed'
	| 'verifying'
	| 'confirmed'
	| 'rejected';

export const ForgotPassword = () => {
	const theme = useTheme();
	const router = useRouter();

	const { state, props } = useForm({
		schema: userSchema.pick({ email: true, password: true }).extend({
			code: z.number().int().min(0).max(999999),
			confirmPassword: userSchema.shape.password,
		}),
		details: {
			email: { type: 'email' },
			code: { type: 'int' },
			password: { type: 'password' },
			confirmPassword: { type: 'password', isLast: true },
		},
		onSubmit: async (_body) => {
			setIsResetting(true);
			await wait(1500).finally(() => setIsResetting(false));
			setCodeStatus('idle');
			setTimeout(() => {
				router.back();
			}, 500);
			return 'Password Reset Successful!';
		},
	});

	const [codeStatus, setCodeStatus] = useState<ResetCodeStatus>('idle');
	const [isResetting, setIsResetting] = useState<boolean>(false);

	return (
		<ScreenWrapper
			title='Reset Password'
			onBack={() => router.back()}
		>
			<View
				style={{
					backgroundColor: theme.colors.primary,
					flexDirection: 'row',
					padding: isSmallerScreen ? 20 : 40,
				}}
			>
				<AppIcon
					name='restore'
					color={theme.colors.onPrimary}
					style={{
						width: isSmallerScreen ? 50 : 75,
						height: isSmallerScreen ? 50 : 75,
						marginRight: isSmallerScreen ? 10 : 20,
					}}
				/>

				<View>
					<Text
						style={{ color: theme.colors.onPrimary }}
						variant='titleLarge'
					>
						Reset Password
					</Text>

					<Text
						style={{ color: theme.colors.onPrimary }}
						variant='titleSmall'
					>
						{codeStatus === 'sent'
							? 'A Reset Code Has Been Sent To Your Email'
							: 'Enter The Email To Get The Reset Code'}
					</Text>
				</View>
			</View>

			<FormControl
				{...props.field.email}
				type={props.field.email.type}
				disabled={state.status.type === 'submitting'}
				button={{
					label:
						codeStatus === 'sending'
							? 'Sending...'
							: `${codeStatus !== 'idle' ? 'Re-' : ''}Send Code`,
					icon:
						codeStatus === 'idle'
							? 'email'
							: codeStatus === 'sendingFailed'
							? 'error'
							: 'success',
					style: { width: isSmallerScreen ? 125 : 175 },
					loading: codeStatus === 'sending',
					disabled:
						['sending', 'verifying'].includes(codeStatus) ||
						!state.values.email.trim(),
					onPress: async () => {
						setCodeStatus('sending');
						await wait(1000);
						setCodeStatus(Math.round(Math.random()) ? 'sent' : 'sendingFailed');
					},
				}}
				onChange={(value) => {
					props.field.email.onChange(value);
					if (!value.trim()) setCodeStatus('idle');
				}}
			/>

			<FormControl
				{...props.field.code}
				type={props.field.code.type}
				disabled={codeStatus === 'idle' || codeStatus === 'sending'}
				button={{
					label:
						codeStatus === 'verifying'
							? 'Verifying...'
							: codeStatus === 'confirmed'
							? 'Success'
							: codeStatus === 'rejected'
							? 'Retry'
							: 'Verify Code',
					icon:
						codeStatus === 'rejected'
							? 'error'
							: codeStatus === 'confirmed'
							? 'success'
							: 'submit',
					loading: codeStatus === 'verifying',
					onPress: async () => {
						if (codeStatus === 'confirmed') return;
						setCodeStatus('verifying');
						await wait(1000);
						setCodeStatus(Math.round(Math.random()) ? 'confirmed' : 'rejected');
					},
					disabled: codeStatus === 'verifying' || !state.values.code.trim(),
				}}
				onChange={(value) => {
					props.field.code.onChange(value);
					if (
						!value.trim() &&
						state.values.email.trim() &&
						['verifying', 'confirmed', 'rejected'].includes(codeStatus)
					)
						setCodeStatus('sent');
				}}
			/>

			<FormControl
				{...props.field.password}
				disabled={codeStatus !== 'confirmed'}
			/>

			<FormControl
				{...props.field.confirmPassword}
				disabled={codeStatus !== 'confirmed'}
			/>

			{props.status && <Alert {...props.status} />}

			<Button
				{...props.button}
				loading={props.button.loading || isResetting}
				label={
					state.status.type === 'success' ? 'Resetting...' : 'Reset Password'
				}
				disabled={
					props.button.disabled ||
					!state.values.password ||
					state.values.password !== state.values.confirmPassword ||
					codeStatus !== 'confirmed'
				}
			/>
		</ScreenWrapper>
	);
};

export default ForgotPassword;
