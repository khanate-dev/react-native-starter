import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useStyleSheet } from '@ui-kitten/components';
import { isSmallerScreen } from 'src/config';

import { getShedWeights } from 'endpoints/weight';
import { Table } from 'components/data/Table';
import { ScreenWrapper } from 'components/layout/ScreenWrapper';
import { FormButton } from 'components/form/FormButton';

import { updateWeightsStyles } from './update-weights.styles';

import type { TableColumn, TableRow } from 'components/data/Table';
import type { SupervisorDashboardPageProps } from 'screens/supervisor-dashboard';
import type { WeightModel } from 'schemas/weight';

type ColumnName = keyof Omit<
	WeightModel,
	'ShedId' | 'Id' | 'CreatedAt' | 'UpdatedAt'
>;

const tableColumns: TableColumn<ColumnName>[] = [
	{ name: 'BatchSize', width: 2 },
	{ name: 'BatchWeight', width: 2 },
];

export const UpdateWeights = ({
	navigation,
	route,
}: SupervisorDashboardPageProps<'update-weights'>) => {
	const isFocused = useIsFocused();
	const styles = useStyleSheet(updateWeightsStyles);

	const [weights, setWeights] = useState<WeightModel[]>([]);

	const { shed } = route.params;

	useEffect(() => {
		if (!isFocused) return;
		getShedWeights(shed.Id).then(setWeights);
	}, [isFocused]);

	const tableRows: TableRow<ColumnName>[] = weights.map((row) => ({
		BatchSize: row.BatchSize.toLocaleString(),
		BatchWeight: row.BatchWeight.toFixed(1).replace(/(\..)(.*)/g, '$1'),
	}));

	const totalSize = weights.reduce((sum, { BatchSize }) => sum + BatchSize, 0);
	const totalWeight = weights.reduce(
		(sum, { BatchWeight }) => sum + BatchWeight,
		0
	);

	const summary: TableRow<ColumnName> = {
		BatchSize: totalSize.toLocaleString(),
		BatchWeight: totalWeight.toFixed(1).replace(/(\..)(.*)/g, '$1'),
	};

	return (
		<ScreenWrapper
			containerStyle={styles.container}
			title='Weight'
			darkBackground
			onBack={navigation.goBack}
		>
			<Table
				styles={{ table: styles.table }}
				columns={tableColumns}
				data={tableRows}
				emptyLabel='No Weight Entries Have Been Made'
				showRowNumbers
				darkBackground
			/>

			<FormButton
				style={styles.addButton}
				label='Add Entry'
				status='basic'
				iconLeft='plus-circle-outline'
				borders='curved'
				size={isSmallerScreen ? 'medium' : 'large'}
				hasBorder
				onPress={() => {
					navigation.navigate('modal', {
						type: 'weights',
						shed,
					});
				}}
			/>

			<FormButton
				style={styles.submitButton}
				label='Back'
				status='danger'
				size={isSmallerScreen ? 'medium' : 'large'}
				borders='curved'
				onPress={navigation.goBack}
			/>

			<Table
				columns={tableColumns}
				data={[summary]}
				emptyLabel='No Weight Entries Have Been Made'
				styles={{
					table: styles.summaryTable,
					container: styles.summaryContainer,
					headerCell: styles.tableHead,
				}}
				darkBackground
			/>
		</ScreenWrapper>
	);
};
