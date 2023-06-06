import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Text, useStyleSheet } from '@ui-kitten/components';
import { isSmallerScreen } from 'src/config';
import { getGradientByIndex } from 'helpers/color';

import { getSheds } from 'endpoints/shed';
import { FormInput } from 'components/form/FormInput';
import { ScreenWrapper } from 'components/layout/ScreenWrapper';

import { ShedCard } from './ShedCard';
import { viewShedsStyles } from './view-sheds.styles';

import type { ShedWithGradient } from 'schemas/shed';

export const ViewSheds = () => {
	const isFocused = useIsFocused();
	const styles = useStyleSheet(viewShedsStyles);

	const [sheds, setSheds] = useState<ShedWithGradient[]>([]);
	const [search, setSearch] = useState<string>('');
	const [expandedId, setExpandedId] = useState<null | number>(null);

	useEffect(() => {
		if (!useIsFocused) return;
		getSheds().then((sheds) => {
			setSheds(
				sheds.map((shed, index) => ({
					...shed,
					gradient: getGradientByIndex(index),
				}))
			);
		});
	}, [isFocused]);

	const filteredSheds = !search
		? sheds
		: sheds.filter((shed) =>
				shed.Name.toLowerCase().includes(search.toLowerCase())
		  );

	if (expandedId && filteredSheds.every((shed) => shed.Id !== expandedId))
		setExpandedId(null);

	return (
		<ScreenWrapper
			containerStyle={styles.container}
			title='Dashboard'
			darkBackground
		>
			<Text
				style={styles.heading}
				category='h2'
			>
				Sheds Summary
			</Text>

			<FormInput
				style={styles.search}
				type='search'
				value={search}
				placeholder='Search Shed'
				size={isSmallerScreen ? 'medium' : 'large'}
				hasIcon
				onChange={setSearch}
			/>

			<ScrollView contentContainerStyle={styles.shedGrid}>
				{filteredSheds.map((shed) => (
					<ShedCard
						key={shed.Id}
						shed={shed}
						gradient={shed.gradient}
						isExpanded={shed.Id === expandedId}
						onExpand={() => setExpandedId(shed.Id)}
						onShrink={() => setExpandedId(null)}
					/>
				))}
			</ScrollView>
		</ScreenWrapper>
	);
};
