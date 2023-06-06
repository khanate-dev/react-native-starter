import { TouchableOpacity, View } from 'react-native';
import { Text, useStyleSheet } from '@ui-kitten/components';

import { IconButton } from 'components/form/IconButton';
import { ShedIcon } from 'components/media/icons';

import { siteCardStyles } from './SiteCard.styles';

import type { SiteCardProps } from './SiteCard.types';

export const SiteCard = ({ site: { Id, Name: SiteName } }: SiteCardProps) => {
	const styles = useStyleSheet(siteCardStyles);

	return (
		<View style={styles.outerContainer}>
			<TouchableOpacity
				key={Id}
				style={styles.touchable}
				activeOpacity={0.5}
			>
				<View style={styles.container}>
					<View style={styles.heading}>
						<Text
							style={styles.headingText}
							category='h4'
							appearance='hint'
						>
							{SiteName}
						</Text>
					</View>

					<View style={styles.cardContainer}>
						<View style={styles.card}>
							<ShedIcon style={styles.cardIcon} />

							<Text style={styles.cardValue}>{10}</Text>
						</View>
					</View>

					<IconButton
						style={styles.button}
						name='arrow-ios-forward-outline'
					/>
				</View>
			</TouchableOpacity>
		</View>
	);
};
