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
				name='error-triangle'
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
					fontSize: isSmallerScreen ? 28 : 30,
					color: theme.colors.error,
					opacity: 0.5,
				}}
			>
				{heading ?? 'Oops!'}
			</Text>

			<Text
				style={{
					maxWidth: '70%',
					marginVertical: isSmallerScreen ? 20 : 30,
					textAlign: 'center',
					fontWeight: '400',
					fontSize: isSmallerScreen ? 14 : 18,
					textTransform: 'capitalize',
					lineHeight: 25,
					opacity: 0.5,
				}}
			>
				{message ?? 'Something Went Wrong!'}
			</Text>

			<Button
				label={buttonLabel ?? 'Back'}
				style={{ minWidth: 150 }}
				onPress={onBack}
			/>
		</ScreenWrapper>
	);
};
