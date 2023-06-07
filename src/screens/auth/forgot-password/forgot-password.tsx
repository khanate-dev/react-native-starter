import { useState } from 'react';
import { View } from 'react-native';
import { Icon, Text, useStyleSheet, useTheme } from '@ui-kitten/components';
import { wait } from 'helpers/time';

import { forgotPasswordFields as fields } from 'schemas/user';
import { ScreenWrapper } from 'components/layout/screen-wrapper';
import { Form } from 'components/controls/form';

import { forgotPasswordStyles } from './forgot-password.styles';

import type { AuthPageProps } from '../auth.types';
import type { ResetCodeStatus } from './forgot-password.types';

export const ForgotPassword = ({
	navigation,
}: AuthPageProps<'forgot-password'>) => {
	const theme = useTheme();
	const styles = useStyleSheet(forgotPasswordStyles);

	const [codeStatus, setCodeStatus] = useState<ResetCodeStatus>(null);
	const [isResetting, setIsResetting] = useState<boolean>(false);

	fields.email.inputProps = {
		status:
			codeStatus === 'sendingFailed'
				? 'danger'
				: codeStatus && codeStatus !== 'sending'
				? 'success'
				: undefined,
		disabled: codeStatus === 'sending',
	};
	fields.email.button = {
		style: styles.inputAction,
		label:
			codeStatus === 'sending'
				? 'Sending...'
				: `${codeStatus ? 'Re-' : ''}Send Code`,
		iconLeft: !codeStatus
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
		iconLeft:
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

	return (
		<ScreenWrapper
			title='Reset Password'
			onBack={() => navigation.goBack()}
		>
			<View style={styles.header}>
				<Icon
					style={styles.headerIcon}
					name='loader-outline'
					fill={theme['color-primary-100']}
				/>

				<View>
					<Text style={[styles.headerText, styles.heading]}>
						Reset Password
					</Text>

					<Text style={[styles.headerText, styles.subtitle]}>
						{codeStatus === 'sent'
							? 'A Reset Code Has Been Sent To Your Email'
							: 'Enter The Email To Get The Reset Code'}
					</Text>
				</View>
			</View>

			<Form
				style={styles.form}
				fields={fields}
				isBusy={isResetting}
				submitLabel={isResetting ? 'Resetting...' : 'Reset Password'}
				disabled={(state) =>
					!state.password ||
					state.password !== state.confirmPassword ||
					codeStatus !== 'confirmed'
				}
				hasIcons
				onSubmit={async (_body) => {
					setIsResetting(true);
					await wait(1500).finally(() => setIsResetting(false));
					setCodeStatus(null);
					setTimeout(() => {
						navigation.goBack();
					}, 500);
					return 'Password Reset Successful!';
				}}
				onInputChange={(name, _field, value, state) => {
					if (name === 'email') {
						if (value.trim()) return;
						setCodeStatus(null);
					}
					if (name === 'code') {
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
