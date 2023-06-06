import { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, Text, useStyleSheet, useTheme } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import Animated, {
	Layout,
	useAnimatedStyle,
	useSharedValue,
	FadeInUp,
	FadeOutUp,
} from 'react-native-reanimated';
import { isSmallerScreen } from 'src/config';
import { getAgeFromDate } from 'helpers/time';

import { cleanOutSteps } from 'schemas/clean-out';
import { shedModalTypes } from 'schemas/shed';
import { humanizeToken } from 'helpers/string';
import { IconButton } from 'components/form/IconButton';
import {
	AgeIcon,
	BirdIcon,
	FcrIcon,
	MortalityIcon,
	WeightIcon,
} from 'components/media/icons';

import { shedCardStyles } from './ShedCard.styles';

import type { SupervisorDashboardNavigation } from 'screens/supervisor-dashboard';
import type { ShedCardType, ShedCardProps } from './ShedCard.types';
import type { LinearGradientProps } from 'expo-linear-gradient';

const cards: ShedCardType[] = [
	{
		name: 'age',
		icon: AgeIcon,
		showsUnexpended: true,
		getText: ({ flock }) =>
			flock ? getAgeFromDate(flock.Date).toFixed(0) : '-',
	},
	{
		name: 'mortality',
		icon: MortalityIcon,
		getText: ({ mortality }) =>
			mortality ? `${mortality.Mortality.toFixed(1)}%` : '-',
	},
	{
		name: 'fcr',
		label: 'FCR',
		icon: FcrIcon,
		getText: ({ fcr }) => (fcr ? fcr.Bags.toFixed(1) : '-'),
	},
	{
		name: 'noOfBirds',
		label: 'Birds Placed',
		isWider: true,
		icon: BirdIcon,
		showsUnexpended: true,
		getText: ({ weights = [] }) =>
			weights.length > 0
				? weights
						.reduce((sum, { BatchSize }) => sum + BatchSize, 0)
						.toLocaleString()
				: '-',
	},
	{
		name: 'averageWeight',
		isWider: true,
		icon: WeightIcon,
		getText: ({ weights = [] }) =>
			weights.length > 0
				? String(
						weights
							.reduce((sum, { BatchWeight }) => sum + BatchWeight, 0)
							.toFixed(1)
							.replace(/(\..)(.*)/g, '$1')
				  )
				: '-',
	},
];

const normalWidth = '50%';
const normalHeight = isSmallerScreen ? 160 : 200;
const expandedWidth = '100%';
const expandedHeight = isSmallerScreen ? 240 : 300;
const sellingWidth = '100%';
const sellingHeight = isSmallerScreen ? 280 : 345;

export const ShedCard = ({
	shed,
	gradient,
	onExpand,
	onShrink,
	isExpanded,
}: ShedCardProps) => {
	const theme = useTheme();
	const styles = useStyleSheet(shedCardStyles);
	const navigation =
		useNavigation<SupervisorDashboardNavigation<'view-sheds'>>();

	const gradientProps: LinearGradientProps = {
		colors: gradient,
		start: { x: 0, y: 1 },
		end: { x: 1, y: 1 },
	};

	const step =
		!shed.cleanOut || cleanOutSteps.some((step) => !shed.cleanOut[step])
			? 'Cleaning'
			: 'Rearing';

	const currentAction =
		step === 'Rearing' && shed.flock
			? undefined
			: step === 'Rearing'
			? 'flock'
			: cleanOutSteps.find((key) => !shed.cleanOut[key]);

	const currentCards: ShedCardType[] = !currentAction
		? cards
		: [
				{
					name: 'action',
					getText: () => humanizeToken(currentAction),
					icon: currentAction === 'flock' ? BirdIcon : undefined,
					isFull: true,
					showsUnexpended: true,
					noLabel: true,
				},
		  ];

	const handlePress = () => {
		if (!currentAction) {
			onExpand();
			return;
		}

		navigation.navigate('update-shed', {
			type: currentAction,
			shedId: shed.Id,
		});
	};

	const width = useSharedValue<string>(normalWidth);
	const height = useSharedValue<number>(normalHeight);
	const animatedStyles = useAnimatedStyle(() => ({
		width: width.value,
		height: height.value,
	}));

	useEffect(() => {
		const isSelling = isExpanded && shed.contracts;
		width.value = isSelling
			? sellingWidth
			: isExpanded
			? expandedWidth
			: normalWidth;
		height.value = isSelling
			? sellingHeight
			: isExpanded
			? expandedHeight
			: normalHeight;
	}, [isExpanded, shed.contracts]);

	return (
		<Animated.View
			layout={Layout.springify().stiffness(50)}
			entering={FadeInUp}
			exiting={FadeOutUp}
			style={[styles.shedOuterContainer, animatedStyles]}
		>
			<TouchableOpacity
				key={shed.Id}
				style={styles.shedTouchable}
				disabled={isExpanded}
				activeOpacity={0.5}
				onPress={handlePress}
			>
				<LinearGradient
					key={shed.Id}
					style={styles.shedContainer}
					{...gradientProps}
				>
					<View style={styles.shedHeading}>
						<Text
							style={styles.shedHeadingText}
							category='h4'
						>
							{shed.Name}
						</Text>

						{isExpanded && (
							<IconButton
								name='close-outline'
								size={30}
								iconFill='#fff'
								onPress={onShrink}
							/>
						)}
					</View>

					<View style={styles.shedBody}>
						{currentCards.map(
							({
								name,
								label,
								getText,
								icon: Icon,
								showsUnexpended,
								isWider,
								isFull,
								noLabel,
							}) => (
								<Animated.View
									key={name}
									layout={Layout.springify().stiffness(50)}
									style={[
										styles.cardContainer,
										isWider && styles.wider,
										!isExpanded && !showsUnexpended && styles.hidden,
										!isExpanded && showsUnexpended && styles.unexpendedCard,
										isFull && styles.full,
									]}
								>
									<View
										key={name}
										style={[styles.card, isExpanded && styles.cardBigger]}
									>
										{Icon && currentAction && (
											<Icon
												style={[
													styles.cardIcon,
													currentAction && styles.actionIcon,
												]}
											/>
										)}

										<View style={styles.cardContent}>
											<Text
												style={[
													styles.cardValue,
													isExpanded && styles.cardValueBigger,
												]}
											>
												{getText(shed)}
											</Text>

											{!noLabel && isExpanded && (
												<Text
													style={[
														styles.cardLabel,
														isExpanded && styles.cardLabelBigger,
													]}
												>
													{label ?? humanizeToken(name)}
												</Text>
											)}
										</View>

										{Icon && !currentAction && (
											<Icon
												style={[
													styles.cardIcon,
													isExpanded && styles.cardIconBigger,
												]}
											/>
										)}
									</View>
								</Animated.View>
							)
						)}
					</View>

					<View style={styles.shedFooter}>
						{!isExpanded && <Text style={styles.footerLabel}>{step}</Text>}

						{!isExpanded && shed.contracts.length > 0 && (
							<View style={styles.footerSale}>
								<Icon
									name='shopping-cart'
									style={styles.footerSaleIcon}
									fill={theme['color-primary-600']}
								/>
								<Text style={styles.footerSaleText}>
									{shed.contracts.length.toString()}
								</Text>
							</View>
						)}

						{isExpanded &&
							shedModalTypes.map((action, index) => (
								<TouchableOpacity
									key={action}
									activeOpacity={0.5}
									style={[
										styles.footerAction,
										index + 1 < shedModalTypes.length && styles.notLast,
									]}
									onPress={() => {
										if (action === 'weights') {
											navigation.navigate('update-weights', {
												shed,
											});
										} else {
											navigation.navigate('modal', {
												type: action,
												shed,
												id: shed[action]?.Id,
											});
										}
									}}
								>
									<LinearGradient
										colors={['transparent', '#eee']}
										start={{ x: 0, y: 0 }}
										end={{ x: 0, y: 1 }}
										style={[
											styles.footerActionGradient,
											(action === 'weights'
												? shed.weights.length > 0
												: shed[action]) && styles.footerActionCompleted,
										]}
									>
										<Text style={styles.footerActionLabel}>
											{action === 'fcr'
												? 'FCR'
												: `${action[0]?.toUpperCase()}${action.slice(1)}`}
										</Text>
									</LinearGradient>
								</TouchableOpacity>
							))}
					</View>

					{isExpanded && shed.contracts.length > 0 && (
						<TouchableOpacity
							style={styles.saleButton}
							activeOpacity={0.5}
							onPress={() => {
								navigation.navigate('book-sales', {
									shedId: shed.Id,
								});
							}}
						>
							<Text style={styles.saleButtonText}>
								5 Pending Sales Contracts
							</Text>
						</TouchableOpacity>
					)}
				</LinearGradient>
			</TouchableOpacity>
		</Animated.View>
	);
};
