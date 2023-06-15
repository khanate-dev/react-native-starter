import { useState } from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

import { wait } from 'helpers/async';
import { ScreenWrapper } from 'components/layout/screen-wrapper';
import { isSmallerScreen } from 'src/config';
import { AppIcon } from 'components/media/app-icon';
import { Button } from 'components/controls/button';
import { FormControl } from 'components/controls/form-control';
import { Alert } from 'components/feedback/alert';

import type { Utils } from 'types/utils';

export type ResetCodeStatus =
	| 'idle'
	| 'sending'
	| 'sent'
	| 'sendingFailed'
	| 'verifying'
	| 'confirmed'
	| 'rejected';

type State = Utils.includeUnionKeys<
	| {
			status: 'idle';
			email: string;
	  }
	| {
			status: 'sending-code';
			email: string;
	  }
	| {
			status: 'sending-code-failed';
			email: string;
			error: string;
	  }
	| {
			status: 'code-input';
			email: string;
			code: string;
	  }
	| {
			status: 'verifying-code';
			email: string;
			code: string;
	  }
	| {
			status: 'verifying-code-failed';
			email: string;
			code: string;
			error: string;
	  }
	| {
			status: 'password-input';
			email: string;
			code: string;
			password: string;
			confirmPassword: string;
	  }
	| {
			status: 'resetting';
			email: string;
			code: string;
			password: string;
			confirmPassword: string;
	  }
	| {
			status: 'resetting-failed';
			email: string;
			code: string;
			password: string;
			confirmPassword: string;
			error: string;
	  }
	| {
			status: 'resetting-success';
			email: string;
			code: string;
			password: string;
			confirmPassword: string;
	  }
>;

export const ForgotPassword = () => {
	const theme = useTheme();
	const router = useRouter();

	const [state, setState] = useState<State>({
		status: 'idle',
		email: '',
	});
	const { status, email, code, password, confirmPassword, error } = state;

	const emailStage =
		status === 'idle' ||
		status === 'sending-code-failed' ||
		status === 'sending-code';
	const emailEnabled = emailStage && status !== 'sending-code';
	const codeStage =
		status === 'code-input' ||
		status === 'verifying-code-failed' ||
		status === 'verifying-code';
	const codeEnabled = codeStage && status !== 'verifying-code';
	const passwordStage =
		status === 'password-input' ||
		status === 'resetting-failed' ||
		status === 'resetting';
	const passwordEnabled = passwordStage && status !== 'resetting';
	const alertShowing =
		status === 'sending-code-failed' ||
		status === 'verifying-code-failed' ||
		status === 'resetting-failed' ||
		status === 'resetting-success';

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
						{status === 'code-input'
							? 'A Reset Code Has Been Sent To Your Email'
							: 'Enter The Email To Get The Reset Code'}
					</Text>
				</View>
			</View>

			<FormControl
				type='email'
				label='Email'
				value={email}
				error={status === 'sending-code-failed' ? error : undefined}
				disabled={!emailEnabled}
				button={{
					label: !emailStage
						? 'Code Sent!'
						: status === 'sending-code'
						? 'Sending...'
						: `${status !== 'idle' ? 'Re-' : ''}Send Code`,
					icon:
						status === 'idle'
							? 'email'
							: status === 'sending-code-failed'
							? 'error'
							: 'success',
					style: { width: isSmallerScreen ? 125 : 175 },
					loading: status === 'sending-code',
					disabled: !emailEnabled || !email.trim(),
					onPress: async () => {
						if (!emailEnabled) return;
						setState({ ...state, status: 'sending-code', error: undefined });
						await wait(1000);
						const success = Math.round(Math.random());
						setState(
							success
								? { ...state, status: 'code-input', code: '', error: undefined }
								: {
										...state,
										status: 'sending-code-failed',
										error: 'Failed To Send Email!',
								  }
						);
					},
				}}
				onChange={(value) => {
					if (!emailEnabled) return;
					setState({
						...state,
						status: 'idle',
						email: value,
						error: undefined,
					});
				}}
			/>

			<FormControl
				type='int'
				label='Code'
				value={code ?? ''}
				error={status === 'verifying-code-failed' ? error : undefined}
				disabled={!codeEnabled}
				button={{
					label:
						status === 'verifying-code'
							? 'Verifying...'
							: !codeEnabled && !emailStage
							? 'Verified!'
							: status === 'verifying-code-failed'
							? 'Retry'
							: 'Verify Code',
					icon:
						status === 'verifying-code-failed'
							? 'error'
							: !codeEnabled && !emailStage
							? 'success'
							: 'submit',
					loading: status === 'verifying-code',
					onPress: async () => {
						if (!codeEnabled) return;
						setState({ ...state, status: 'verifying-code', error: undefined });
						await wait(1000);
						const success = Math.round(Math.random());
						setState(
							success
								? {
										...state,
										status: 'password-input',
										password: '',
										confirmPassword: '',
										error: undefined,
								  }
								: {
										...state,
										status: 'verifying-code-failed',
										error: 'Invalid Code!',
								  }
						);
					},
					disabled: !codeEnabled || !code?.trim(),
				}}
				onChange={(value) => {
					if (!codeEnabled) return;
					setState({
						...state,
						status: 'code-input',
						code: value,
						error: undefined,
					});
				}}
			/>

			<FormControl
				type='password'
				value={password ?? ''}
				error={status === 'resetting-failed' ? error : undefined}
				disabled={!passwordEnabled}
				onChange={(value) => {
					if (!passwordEnabled) return;
					setState({
						...state,
						status: 'password-input',
						password: value,
						error: undefined,
					});
				}}
			/>

			<FormControl
				type='password'
				value={confirmPassword ?? ''}
				error={status === 'resetting-failed' ? error : undefined}
				disabled={!passwordEnabled}
				onChange={(value) => {
					if (!passwordEnabled) return;
					setState({
						...state,
						status: 'password-input',
						confirmPassword: value,
						error: undefined,
					});
				}}
			/>

			{alertShowing && (
				<Alert
					type={status === 'resetting-success' ? 'success' : 'error'}
					text={error ?? 'Password Reset Successful!'}
				/>
			)}

			<Button
				icon='submit'
				loading={status === 'resetting'}
				label={status === 'resetting' ? 'Resetting...' : 'Reset Password'}
				disabled={
					!passwordEnabled || !password?.trim() || password !== confirmPassword
				}
				onPress={async () => {
					if (!passwordEnabled) return;
					setState({ ...state, status: 'resetting', error: undefined });
					await wait(1500);
					const success = Math.round(Math.random());
					setState(
						success
							? { ...state, status: 'resetting-success', error: undefined }
							: {
									...state,
									status: 'resetting-failed',
									error: 'Failed To Reset Password!',
							  }
					);
					if (success) setTimeout(() => router.back(), 500);
				}}
			/>
		</ScreenWrapper>
	);
};

export default ForgotPassword;
