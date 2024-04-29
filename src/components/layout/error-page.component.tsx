import { useRouter } from 'expo-router';
import { Text } from 'react-native-paper';

import { ScreenWrapper } from './screen-wrapper.component.tsx';

import { config } from '../../config.ts';
import { useTheme } from '../../hooks/theme.hook.tsx';
import { useI18n } from '../../i18n.ts';
import { Icon } from '../app/icon.component.tsx';
import { Button } from '../controls/button.component.tsx';

export type ErrorPageProps = {
	/** the title of the error page */
	title?: string;

	/** short description for the error message  */
	heading?: string;

	/** the detailed error message */
	message?: string;

	/** the label of the back button */
	buttonLabel?: string;
};

export const ErrorPage = ({
	title,
	heading,
	message,
	buttonLabel,
}: ErrorPageProps) => {
	const router = useRouter();
	const theme = useTheme();
	const { content } = useI18n();

	return (
		<ScreenWrapper
			title={title ?? content.error}
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
			back
		>
			<Icon
				name='error'
				size={config.isSmallerScreen ? 100 : 125}
				color={theme.colors.error}
			/>

			<Text
				variant='headlineLarge'
				style={{
					maxWidth: '70%',
					textAlign: 'center',
					textTransform: 'capitalize',
					color: theme.colors.error,
				}}
			>
				{heading ?? content.oops}
			</Text>

			<Text
				variant='bodyLarge'
				style={{
					maxWidth: '70%',
					textAlign: 'center',
					textTransform: 'capitalize',
					paddingVertical: 20,
				}}
			>
				{message ?? content.genericError}
			</Text>

			<Button
				label={buttonLabel ?? content.action.back}
				icon='arrow-back'
				style={{ width: 150 }}
				onPress={() => {
					router.back();
				}}
			/>
		</ScreenWrapper>
	);
};
