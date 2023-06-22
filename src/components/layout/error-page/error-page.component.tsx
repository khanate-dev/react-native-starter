import { Text } from 'react-native-paper';

import { Button } from '~/components/controls/button';
import { isSmallerScreen } from '~/config';
import { ScreenWrapper } from '~/components/layout/screen-wrapper';
import { Icon } from '~/components/app/icon';
import { useTheme } from '~/hooks/theme';
import { useI18n } from '~/contexts/i18n';

export type ErrorPageProps = {
	title?: string;
	heading?: string;
	message?: string;
	buttonLabel?: string;
	onBack: () => void;
};

export const ErrorPage = ({
	title,
	heading,
	message,
	buttonLabel,
	onBack,
}: ErrorPageProps) => {
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
			onBack={onBack}
		>
			<Icon
				name='error'
				size={isSmallerScreen ? 100 : 125}
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
				onPress={onBack}
			/>
		</ScreenWrapper>
	);
};
