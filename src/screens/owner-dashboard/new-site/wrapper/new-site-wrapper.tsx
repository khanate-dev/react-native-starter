import { ScrollView } from 'react-native';
import { Text } from '@ui-kitten/components';

import { useOwnerUser } from 'contexts/user';
import { ScreenWrapper } from 'components/layout/ScreenWrapper';
import { Stepper } from 'components/layout/Stepper';
import { FormButton } from 'components/form/FormButton';
import { Alert } from 'components/feedback/Alert';

import { addSiteWrapperStyles as styles } from './new-site-wrapper.styles';

import type { NewSiteWrapperProps } from './new-site-wrapper.types';

const pages: NewSiteWrapperProps['page'][] = [
	'add-site',
	'add-sheds',
	'add-supervisor',
];

export const NewSiteWrapper = ({
	navigation,
	formStyle,
	page,
	children,
	onSubmit,
	extraActions,
	alert,
	disableSubmit,
	isLoading,
	isSubmitting,
}: NewSiteWrapperProps) => {
	const user = useOwnerUser();

	const buttonLabel = isSubmitting
		? 'Submitting...'
		: isLoading
		? 'Loading...'
		: page === 'add-supervisor'
		? 'Finish'
		: 'Next';
	const buttonIcon =
		page === 'add-supervisor'
			? 'cloud-upload-outline'
			: 'arrow-forward-outline';

	return (
		<ScreenWrapper
			containerStyle={styles.container}
			title='New Site'
			onBack={() => navigation.goBack()}
		>
			<Text
				style={styles.marginBottom}
				category='h5'
				appearance='hint'
			>
				{`Welcome, ${user.Name.split(' ')[0]}!`}
			</Text>

			<Text
				style={styles.marginBottom}
				category='s2'
				appearance='hint'
			>
				{"Let's add a new site"}
			</Text>

			<Stepper
				style={styles.stepper}
				steps={pages}
				currentStep={page}
				removePrefix='add-'
			/>

			<ScrollView contentContainerStyle={formStyle}>{children}</ScrollView>

			{alert && <Alert {...alert} />}

			{extraActions?.map((action) => (
				<FormButton
					key={action.id}
					{...action}
					style={[action.style, styles.button]}
					noMargin={action.noMargin ?? true}
					borders={action.borders ?? 'rounded'}
				/>
			))}

			<FormButton
				style={styles.button}
				label={buttonLabel}
				iconLeft={buttonIcon}
				disabled={disableSubmit}
				isLoading={isSubmitting || isLoading}
				status='secondary'
				borders='rounded'
				noMargin
				elevated
				onPress={onSubmit}
			/>
		</ScreenWrapper>
	);
};
