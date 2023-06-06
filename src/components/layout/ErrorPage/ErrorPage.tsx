import { Icon, Text, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { isSmallerScreen } from 'src/config';

import { FormButton } from 'components/form/FormButton';
import { ScreenWrapper } from 'components/layout/ScreenWrapper';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		width: isSmallerScreen ? 130 : 150,
		height: isSmallerScreen ? 130 : 150,
	},
	heading: {
		maxWidth: '70%',
		textAlign: 'center',
		fontWeight: '400',
		textTransform: 'capitalize',
		fontSize: isSmallerScreen ? 28 : 30,
	},
	error: {
		maxWidth: '70%',
		marginVertical: isSmallerScreen ? 20 : 30,
		textAlign: 'center',
		fontWeight: '400',
		fontSize: isSmallerScreen ? 14 : 18,
		textTransform: 'capitalize',
		lineHeight: 25,
	},
	button: {
		minWidth: 150,
	},
});

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
			containerStyle={styles.container}
			title={title ?? 'Error'}
			onBack={onBack}
		>
			<Icon
				style={styles.icon}
				name='alert-triangle'
				fill={theme['color-danger-500']}
			/>

			<Text
				style={styles.heading}
				status='danger'
				category='h1'
				appearance='hint'
			>
				{heading ?? 'Oops!'}
			</Text>

			<Text
				style={styles.error}
				status='basic'
				appearance='hint'
			>
				{message ?? 'Something Went Wrong!'}
			</Text>

			<FormButton
				style={styles.button}
				label={buttonLabel ?? 'Back'}
				size='medium'
				status='danger'
				appearance='outline'
				borders='curved'
				onPress={onBack}
			/>
		</ScreenWrapper>
	);
};
