import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Text, useStyleSheet } from '@ui-kitten/components';
import { getGradientByIndex } from 'helpers/color';

import { getSites } from 'endpoints/site';
import { FormInput } from 'components/form/FormInput';
import { ScreenWrapper } from 'components/layout/ScreenWrapper';
import { IconButton } from 'components/form/IconButton';

import { SiteCard } from './SiteCard';
import { viewSitesStyles } from './view-sites.styles';

import type { OwnerDashboardPageProps } from '../owner-dashboard.types';
import type { SiteWithGradient } from 'schemas/site';

export const ViewSites = ({
	navigation,
}: OwnerDashboardPageProps<'view-sites'>) => {
	const isFocused = useIsFocused();
	const styles = useStyleSheet(viewSitesStyles);

	const [search, setSearch] = useState<string>('');
	const [sites, setSites] = useState<SiteWithGradient[]>([]);

	useEffect(() => {
		if (!isFocused) return;
		getSites().then((sites) => {
			if (sites.length === 0) return navigation.navigate('new-site');

			setSites(
				sites.map((shed, index) => ({
					...shed,
					gradient: getGradientByIndex(index),
				}))
			);
		});
	}, [isFocused]);

	const filteredSites = !search
		? sites
		: sites.filter((site) =>
				site.Name.toLowerCase().includes(search.toLowerCase())
		  );

	return (
		<ScreenWrapper
			containerStyle={styles.container}
			title='Dashboard'
		>
			<Text
				style={styles.heading}
				category='h2'
			>
				Sites
			</Text>

			<Text
				style={styles.subHeading}
				category='h4'
			>
				View or add more sites
			</Text>

			<FormInput
				style={styles.search}
				type='search'
				value={search}
				placeholder='Search Site'
				size='medium'
				hasIcon
				onChange={setSearch}
			/>

			<ScrollView contentContainerStyle={styles.shedGrid}>
				{filteredSites.map((site) => (
					<SiteCard
						key={site.Id}
						site={site}
					/>
				))}
			</ScrollView>

			<IconButton
				style={styles.button}
				name='plus-outline'
				appearance='filled'
				size={50}
				elevated
				isRound
				onPress={() => navigation.navigate('new-site')}
			/>
		</ScreenWrapper>
	);
};
