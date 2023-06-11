import { useState } from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { z } from 'zod';
import { useRouter } from 'expo-router';

import { wait } from 'helpers/async';
import { ScreenWrapper } from 'components/layout/screen-wrapper';
import { Form } from 'components/controls/form';
import { userSchema } from 'schemas/user';
import { FormSchema } from 'schemas/form-schema.class';
import { isSmallerScreen } from 'src/config';
import { AppIcon } from 'components/media/app-icon';
import { getThemeColor } from 'styles/theme';

export type ResetCodeStatus =
	| 'idle'
	| 'sending'
	| 'sent'
	| 'sendingFailed'
	| 'verifying'
	| 'confirmed'
	| 'rejected';

export const schema = new FormSchema({
	email: {
		zod: userSchema.shape.email,
		type: 'email',
	},
	code: {
		zod: z.number().int().min(0).max(999999),
		type: 'int',
		label: 'Reset Code',
	},
	password: {
		zod: userSchema.shape.password,
		type: 'password',
	},
	confirmPassword: {
		zod: userSchema.shape.password,
		type: 'password',
		label: 'Confirm Password',
	},
});

export const ForgotPassword = () => {
	const theme = useTheme();
	const router = useRouter();

	const [codeStatus, setCodeStatus] = useState<ResetCodeStatus>('idle');
	const [isResetting, setIsResetting] = useState<boolean>(false);

	fields.email.button = {
		label:
			codeStatus === 'sending'
				? 'Sending...'
				: `${codeStatus ? 'Re-' : ''}Send Code`,
		icon: !codeStatus
			? 'email-outline'
			: codeStatus === 'sendingFailed'
			? 'close-circle-outline'
			: 'checkmark-circle-outline',
		isLoading: codeStatus === 'sending',
		onPress: async () => {
			setCodeStatus('sending');
			await wait(1000);
			setCodeStatus(Math.round(Math.random()) ? 'sent' : 'sendingFailed');
		},
		disabled: (value) =>
			['sending', 'verifying'].includes(codeStatus as string) || !value.trim(),
	};

	fields.code.inputProps = {
		status:
			codeStatus === 'confirmed'
				? 'success'
				: codeStatus === 'rejected'
				? 'danger'
				: undefined,
		disabled: !codeStatus || codeStatus === 'sending',
	};
	fields.code.button = {
		style: styles.inputAction,
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
				? 'close-circle-outline'
				: codeStatus === 'confirmed'
				? 'checkmark-circle-outline'
				: 'arrow-circle-up-outline',
		isLoading: codeStatus === 'verifying',
		onPress: async () => {
			if (codeStatus === 'confirmed') return;
			setCodeStatus('verifying');
			await wait(1000);
			setCodeStatus(Math.round(Math.random()) ? 'confirmed' : 'rejected');
		},
		disabled: (value) => codeStatus === 'verifying' || !value.trim(),
	};

	fields.password.inputProps = {
		disabled: codeStatus !== 'confirmed',
	};
	fields.confirmPassword.inputProps = {
		disabled: codeStatus !== 'confirmed',
	};

	const changeEmailColor =
		codeStatus === 'sendingFailed' ||
		(codeStatus !== 'idle' && codeStatus !== 'sending');

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

			<Form
				schema={schema}
				isBusy={isResetting}
				submitLabel={isResetting ? 'Resetting...' : 'Reset Password'}
				componentProps={(state) => ({
					container: {
						style: {
							padding: isSmallerScreen ? 15 : 30,
						},
					},
					button: {
						label: isResetting ? 'Resetting...' : 'Reset Password',
					},
					control: {
						fields: {
							email: {
								styles: {
									button: {
										backgroundColor: changeEmailColor
											? getThemeColor(
													theme,
													codeStatus === 'sendingFailed' ? 'error' : 'success',
													'container'
											  )
											: undefined,
										color: changeEmailColor
											? getThemeColor(
													theme,
													codeStatus === 'sendingFailed' ? 'error' : 'success',
													'container-contrast'
											  )
											: undefined,
									},
									width: isSmallerScreen ? 125 : 175,
								},
								dependsOn: 'code',
								disabled: codeStatus === 'sending',
							},
						},
					},
				})}
				disabled={(state) =>
					!state.password ||
					state.password !== state.confirmPassword ||
					codeStatus !== 'confirmed'
				}
				hasIcons
				onSubmit={async (_body) => {
					setIsResetting(true);
					await wait(1500).finally(() => setIsResetting(false));
					setCodeStatus('idle');
					setTimeout(() => {
						router.back();
					}, 500);
					return 'Password Reset Successful!';
				}}
				onInputChange={(field, value, state) => {
					if (field.name === 'email') {
						if (value) return;
						setCodeStatus('idle');
					}
					if (field.name === 'code') {
						if (
							value.trim() ||
							!state.email.trim() ||
							!['verifying', 'confirmed', 'rejected'].includes(
								codeStatus as string
							)
						)
							return;
						setCodeStatus('sent');
					}
				}}
			/>
		</ScreenWrapper>
	);
};

export default ForgotPassword;
