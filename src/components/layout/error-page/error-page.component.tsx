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
				size={isSmallerScreen ? 130 : 150}
				color={theme.colors.error}
			/>

			<Text
				variant='headlineLarge'
				style={{
					maxWidth: '70%',
					textAlign: 'center',
					fontWeight: '400',
					textTransform: 'capitalize',
					color: theme.colors.error,
				}}
			>
				{heading ?? 'Oops!'}
			</Text>

			<Text
				variant='bodyLarge'
				style={{
					maxWidth: '70%',
					marginVertical: isSmallerScreen ? 20 : 30,
					textAlign: 'center',
					fontWeight: '400',
					textTransform: 'capitalize',
					lineHeight: 25,
				}}
			>
				{message ?? 'Something Went Wrong!'}
			</Text>

			<Button
				label={buttonLabel ?? 'Back'}
				mode='contained-tonal'
				icon='arrow-back'
				onPress={onBack}
			/>
		</ScreenWrapper>
	);
};
