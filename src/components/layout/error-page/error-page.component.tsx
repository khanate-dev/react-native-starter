import { Text, useTheme } from 'react-native-paper';

import { Button } from 'components/controls/button';
import { isSmallerScreen } from 'src/config';
import { ScreenWrapper } from 'components/layout/screen-wrapper';
import { AppIcon } from 'components/media/app-icon';

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

	return (
		<ScreenWrapper
			title={title ?? 'Error'}
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
			onBack={onBack}
		>
			<AppIcon
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
				{heading ?? 'oops!'}
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
				{message ?? 'something went wrong!'}
			</Text>

			<Button
				label={buttonLabel ?? 'Back'}
				icon='arrow-back'
				style={{ width: 150 }}
				onPress={onBack}
			/>
		</ScreenWrapper>
	);
};
