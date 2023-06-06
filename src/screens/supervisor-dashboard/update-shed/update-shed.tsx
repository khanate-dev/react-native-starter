import { useState } from 'react';
import { View } from 'react-native';
import { Text, useStyleSheet } from '@ui-kitten/components';

import { humanizeToken } from 'helpers/string';
import { cleanOutFields, cleanOutFormSchema } from 'schemas/clean-out';
import { flockFields, flockFormSchema } from 'schemas/flock';
import { contractFields, contractFormSchema } from 'schemas/contract';
import { addCleanOut } from 'endpoints/clean-out';
import { addFlock } from 'endpoints/flock';
import { updateContract } from 'endpoints/contract';
import { ScreenWrapper } from 'components/layout/ScreenWrapper';
import { Form } from 'components/form/Form';

import { updateShedsStyles } from './updated-shed.styles';

import type { SupervisorDashboardPageProps } from 'screens/supervisor-dashboard';

const fieldsMapping = {
	surfactant: cleanOutFields,
	disinfectant: cleanOutFields,
	drinkingLine: cleanOutFields,
	fumigant: cleanOutFields,
	flock: flockFields,
	contract: contractFields,
};

export const UpdateShed = ({
	navigation,
	route,
}: SupervisorDashboardPageProps<'update-shed'>) => {
	const styles = useStyleSheet(updateShedsStyles);

	const { shedId, type, contract } = route.params;

	const [bookedQuantity, setBookedQuantity] = useState<number>(
		contract?.BookedQuantity ?? 0
	);

	const title = humanizeToken(type);
	const fields = fieldsMapping[type];

	return (
		<ScreenWrapper
			containerStyle={styles.container}
			title={title}
			hasPlainBackground={type !== 'contract'}
			darkBackground={type === 'contract'}
			onBack={navigation.goBack}
		>
			<Text style={[styles.heading, type === 'contract' && styles.headingDark]}>
				{type === 'contract'
					? `Update Contract: ${contract.Name}`
					: `Enter ${humanizeToken(type)} Details`}
			</Text>

			{type === 'contract' && (
				<View style={styles.summaryContainer}>
					<View style={[styles.summary, styles.dangerSummary]}>
						<Text style={[styles.summaryLabel, styles.dangerSummaryLabel]}>
							Total Weight (KGs)
						</Text>
						<Text style={[styles.summaryValue, styles.dangerSummaryValue]}>
							{contract.AvailableQuantity}
						</Text>
					</View>

					<View style={[styles.summary, styles.successSummary]}>
						<Text style={[styles.summaryLabel, styles.successSummaryLabel]}>
							Pending Weight (KGs)
						</Text>
						<Text style={[styles.summaryValue, styles.successSummaryValue]}>
							{contract.AvailableQuantity - (bookedQuantity || 0)}
						</Text>
					</View>
				</View>
			)}

			<Form
				fields={fields}
				submitLabel='Update'
				defaultValues={type === 'contract' ? contract : undefined}
				submitProps={{
					status: type === 'contract' ? 'danger' : 'primary',
				}}
				onInputChange={(name, _field, value) => {
					if (type !== 'contract' || name !== 'BookedQuantity') return;
					setBookedQuantity(parseInt(value));
				}}
				onSubmit={async (state) => {
					if (type === 'flock') {
						const body = flockFormSchema.parse({
							ShedId: shedId,
							...state,
						});
						await addFlock(body);
					} else if (type === 'contract') {
						const { ShedId, Name, AvailableQuantity } = contract;
						const body = contractFormSchema.parse({
							ShedId,
							Name,
							AvailableQuantity,
							...state,
						});
						await updateContract(contract.Id, body);
					} else {
						const body = cleanOutFormSchema.parse({
							ShedId: shedId,
							Type: type,
							...state,
						});
						await addCleanOut(body);
					}

					navigation.goBack();
				}}
			/>
		</ScreenWrapper>
	);
};
