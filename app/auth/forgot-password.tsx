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

export type ResetCodeStatus =
	| 'idle'
	| 'sending'
	| 'sent'
	| 'sendingFailed'
	| 'verifying'
	| 'confirmed'
	| 'rejected';

const schema = userSchema.pick({ email: true, password: true }).extend({
	code: z.number().int().min(0).max(999999),
	confirmPassword: userSchema.shape.password,
});

export const ForgotPassword = () => {
	const theme = useTheme();
	const router = useRouter();

	const { fields, state, status, statusJsx, buttonProps, handleSubmit } =
		useForm(
			schema,
			{
				email: { type: 'email' },
				code: { type: 'int' },
				password: { type: 'password' },
				confirmPassword: { type: 'password' },
			},
			async (_body) => {
				setIsResetting(true);
				await wait(1500).finally(() => setIsResetting(false));
				setCodeStatus('idle');
				setTimeout(() => {
					router.back();
				}, 500);
				return 'Password Reset Successful!';
			}
		);

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
				{...fields.email}
				type={fields.email.type}
				disabled={status.type === 'submitting'}
				button={{
					label:
						codeStatus === 'sending'
							? 'Sending...'
							: `${codeStatus !== 'idle' ? 'Re-' : ''}Send Code`,
					icon:
						codeStatus === 'idle'
							? 'email'
							: codeStatus === 'sendingFailed'
							? 'error-circle'
							: 'success-circle',
					style: { width: isSmallerScreen ? 125 : 175 },
					loading: codeStatus === 'sending',
					disabled:
						['sending', 'verifying'].includes(codeStatus) ||
						!state.email.trim(),
					onPress: async () => {
						setCodeStatus('sending');
						await wait(1000);
						setCodeStatus(Math.round(Math.random()) ? 'sent' : 'sendingFailed');
					},
				}}
				onChange={(value) => {
					fields.email.onChange(value);
					if (!value.trim()) setCodeStatus('idle');
				}}
			/>

			<FormControl
				{...fields.code}
				type={fields.code.type}
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
							? 'error-circle'
							: codeStatus === 'confirmed'
							? 'success-circle'
							: 'submit',
					loading: codeStatus === 'verifying',
					onPress: async () => {
						if (codeStatus === 'confirmed') return;
						setCodeStatus('verifying');
						await wait(1000);
						setCodeStatus(Math.round(Math.random()) ? 'confirmed' : 'rejected');
					},
					disabled: codeStatus === 'verifying' || !state.code.trim(),
				}}
				onChange={(value) => {
					fields.code.onChange(value);
					if (
						!value.trim() &&
						state.email.trim() &&
						['verifying', 'confirmed', 'rejected'].includes(codeStatus)
					)
						setCodeStatus('sent');
				}}
			/>

			<FormControl
				{...fields.password}
				disabled={codeStatus !== 'confirmed'}
			/>

			<FormControl
				{...fields.confirmPassword}
				disabled={codeStatus !== 'confirmed'}
				isLast
				onSubmit={handleSubmit}
			/>

			{statusJsx}

			<Button
				{...buttonProps}
				label={status.type === 'success' ? 'Resetting...' : 'Reset Password'}
				loading={buttonProps.loading || isResetting}
				disabled={
					buttonProps.disabled ||
					!state.password ||
					state.password !== state.confirmPassword ||
					codeStatus !== 'confirmed'
				}
			/>
		</ScreenWrapper>
	);
};

export default ForgotPassword;
