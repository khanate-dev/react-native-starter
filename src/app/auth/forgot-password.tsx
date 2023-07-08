import { useRef, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

import { useTheme } from '~/hooks/theme';
import { useI18n } from '~/contexts/i18n';
import { wait } from '~/helpers/async';
import { ScreenWrapper } from '~/components/layout/screen-wrapper';
import { isSmallerScreen } from '~/config';
import { Icon } from '~/components/app/icon';
import { Button } from '~/components/controls/button';
import { FormControl } from '~/components/controls/form-control';
import { Alert } from '~/components/feedback/alert';

import type { TextInput } from 'react-native';
import type { Utils } from '~/types/utils';

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
	const { content } = useI18n();
	const router = useRouter();
	const confirmPasswordRef = useRef<TextInput>(null);

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

	return (
		<ScreenWrapper
			title={content.pages.resetPassword}
			back
		>
			<View
				style={[
					theme.styles.view.row,
					{
						backgroundColor: theme.colors.primary,
						padding: isSmallerScreen ? 20 : 40,
						borderRadius: isSmallerScreen ? 10 : 20,
						gap: isSmallerScreen ? 10 : 20,
						marginBottom: isSmallerScreen ? 10 : 20,
					},
				]}
			>
				<Icon
					name='restore'
					color={theme.colors.onPrimary}
					size={isSmallerScreen ? 40 : 60}
				/>

				<View>
					<Text
						variant='titleLarge'
						style={[
							theme.styles.text.heading,
							{ color: theme.colors.onPrimary },
						]}
					>
						{content.pages.resetPassword}
					</Text>

					<Text
						variant='labelSmall'
						style={[
							theme.styles.text.heading,
							{ color: theme.colors.onPrimary },
						]}
					>
						{status === 'code-input'
							? content.resetSent
							: content.resetDescription}
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
					label:
						content.action.code[
							!emailStage ? 'success' : status !== 'idle' ? 'error' : 'normal'
						],
					color: status === 'sending-code-failed' ? 'error' : 'primary',
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
						content.action.verify[
							!codeEnabled && !emailStage
								? 'success'
								: status !== 'verifying-code-failed'
								? 'error'
								: 'normal'
						],
					color: status === 'verifying-code-failed' ? 'error' : 'primary',
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
				next={confirmPasswordRef}
				type='password'
				label='New Password'
				value={password ?? ''}
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
				ref={confirmPasswordRef}
				type='password'
				label='Confirm New Password'
				value={confirmPassword ?? ''}
				error={status === 'resetting-failed' ? error : undefined}
				disabled={!passwordEnabled}
				styles={{
					container: { marginBottom: 'auto' },
				}}
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

			{status === 'resetting-success' && (
				<Alert
					type='success'
					text='Password Reset Successful!'
					style={{ marginBottom: 10 }}
				/>
			)}

			<Button
				icon='submit'
				loading={status === 'resetting'}
				label={content.action.resetPassword}
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
