import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { isSmallerScreen } from 'src/config';

import { ownerFields as fields, ownerFormSchema } from 'schemas/owner';
import { addOwner } from 'endpoints/owner';
import { ScreenWrapper } from 'components/layout/screen-wrapper';
import { Form } from 'components/controls/form';
import { IconButton } from 'components/controls/icon-button';

import { registerStyles as styles } from './register.styles';

import type { AuthPageProps } from '../auth.types';

export const Register = ({ navigation }: AuthPageProps<'register'>) => (
	<ScreenWrapper>
		<View style={styles.header}>
			<IconButton
				name='arrow-back'
				style={styles.back}
				size={isSmallerScreen ? 35 : 40}
				type='basic'
				onPress={() => navigation.goBack()}
			/>

			<Text
				style={styles.marginBottom}
				category={isSmallerScreen ? 'h6' : 'h4'}
			>
				{"Welcome! Let's Get Started"}
			</Text>
		</View>

		<Form
			style={styles.form}
			fields={fields}
			submitLabel={(isSubmitting) =>
				isSubmitting ? 'Submitting...' : 'Create User'
			}
			onSubmit={async (state) => {
				const body = ownerFormSchema.parse(state);
				const { Email, Password } = await addOwner(body);
				setTimeout(() => {
					navigation.navigate('login', { Email, Password });
				}, 1000);
				return 'User Added! Please Wait...';
			}}
		/>
	</ScreenWrapper>
);
