import { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import { Text, useStyleSheet, useTheme } from '@ui-kitten/components';
import { getGradientByIndex } from 'helpers/color';

import { getShedContracts } from 'endpoints/contract';
import { Table } from 'components/data/Table';
import { ScreenWrapper } from 'components/layout/ScreenWrapper';
import { Progress } from 'components/feedback/Progress';

import { bookSalesStyles } from './book-sales.styles';

import type { SupervisorDashboardPageProps } from 'screens/supervisor-dashboard';
import type { ContractModel } from 'schemas/contract';
import type { TableColumn, TableRow } from 'components/data/Table';

type ColumnName = 'bookedWeight' | 'pendingWeight';

const tableColumns: TableColumn<ColumnName>[] = [
	{ name: 'bookedWeight', label: "Total KG's Booked" },
	{ name: 'pendingWeight', label: "Total KG's Pending" },
];

export const BookSales = ({
	navigation,
	route,
}: SupervisorDashboardPageProps<'book-sales'>) => {
	const isFocused = useIsFocused();
	const theme = useTheme();
	const styles = useStyleSheet(bookSalesStyles);

	const [contracts, setContracts] = useState<ContractModel[]>([]);

	const { shedId } = route.params;

	useEffect(() => {
		if (!isFocused) return;
		getShedContracts(shedId).then(setContracts);
	}, [isFocused]);

	const totalWeight =
		contracts.reduce(
			(sum, contract) => sum + (contract.AvailableQuantity ?? 0),
			0
		) ?? 0;
	const bookedWeight =
		contracts.reduce(
			(sum, contract) => sum + (contract.BookedQuantity ?? 0),
			0
		) ?? 0;
	const pendingWeight = totalWeight - bookedWeight;

	const summary: TableRow<ColumnName>[] = [
		{
			bookedWeight,
			pendingWeight,
		},
	];

	return (
		<ScreenWrapper
			containerStyle={styles.container}
			darkBackground
			onBack={() => navigation.goBack()}
		>
			<Text style={styles.heading}>Book Sales</Text>

			<ScrollView style={styles.contracts}>
				{contracts.map((contract, index) => (
					<TouchableOpacity
						key={contract.Id}
						style={styles.contractContainer}
						activeOpacity={0.5}
						onPress={() => {
							navigation.navigate('update-shed', {
								shedId,
								type: 'contract',
								contract,
							});
						}}
					>
						<LinearGradient
							style={styles.contract}
							colors={getGradientByIndex(index) ?? []}
							start={{ x: 0, y: 1 }}
							end={{ x: 1, y: 1 }}
						>
							<Text style={styles.contractLabel}>{contract.Name}</Text>
							<Progress
								completed={
									(contract.BookedQuantity / contract.AvailableQuantity) * 100
								}
								size={55}
								backgroundColor={theme['color-basic-300']}
								foregroundColor={theme['color-basic-700']}
								labelColor={theme['color-basic-700']}
							/>
						</LinearGradient>
					</TouchableOpacity>
				))}
			</ScrollView>

			<Table
				columns={tableColumns}
				data={summary}
				emptyLabel='Nothing'
				styles={{
					table: styles.summaryTable,
					container: styles.summaryContainer,
				}}
				darkBackground
			/>
		</ScreenWrapper>
	);
};
