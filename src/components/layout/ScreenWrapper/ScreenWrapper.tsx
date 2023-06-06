import { SafeAreaView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
	Icon,
	Layout,
	Text,
	useStyleSheet,
	useTheme,
} from 'react-native-paper';
import Animated, { SlideInLeft, SlideOutRight } from 'react-native-reanimated';

import { useUser, logout } from 'contexts/user';
import { IconButton } from 'components/form/IconButton';
import { Background } from 'components/media/Background';

import { screenWrapperStyles } from './ScreenWrapper.styles';

import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type ScreenWrapperUserControlsProps = {
	styles: typeof screenWrapperStyles;
};

export type ScreenWrapperProps = {
	children: ReactNode;

	/** the styles to apply to the container */
	containerStyle?: StyleProp<ViewStyle>;

	/** the title to show on the page header */
	title?: string;

	/**
	 * the function to call when the header back button is pressed
	 * back button is not rendered if excluded
	 */
	onBack?: () => void;

	/** should the background be dark? */
	darkBackground?: boolean;

	/** should the screen render a plain white background instead of the gradient? */
	hasPlainBackground?: boolean;
};

export const ScreenWrapper = ({
	children,
	containerStyle,
	title,
	onBack,
	darkBackground,
	hasPlainBackground,
}: ScreenWrapperProps) => {
	const user = useUser();
	const styles = useStyleSheet(screenWrapperStyles);
	const theme = useTheme();

	const content = (
		<>
			{Boolean(onBack || title || user?.Name) && (
				<View style={styles.header}>
					<View style={styles.headerLeft}>
						{onBack && (
							<IconButton
								name='arrow-back'
								style={styles.back}
								size={40}
								type='primary'
								onPress={onBack}
							/>
						)}

						{Boolean(title) && (
							<Text
								style={styles.title}
								status='primary'
								category='h6'
							>
								{title}
							</Text>
						)}
					</View>

					<View style={styles.headerRight}>
						{Boolean(user?.Name) && (
							<>
								<IconButton
									style={styles.logout}
									name='power-outline'
									size={30}
									type='danger'
									appearance='outline'
									onPress={logout}
								/>
								<Icon
									style={styles.userIcon}
									name='person-outline'
									fill={theme['color-primary-700']}
								/>
							</>
						)}
					</View>
				</View>
			)}

			<Animated.View
				entering={SlideInLeft.springify()}
				exiting={SlideOutRight.springify()}
				style={[containerStyle, styles.screen]}
			>
				{children}
			</Animated.View>
		</>
	);

	return (
		<SafeAreaView style={styles.safeArea}>
			{hasPlainBackground && (
				<Layout style={[styles.container, darkBackground && styles.dark]}>
					{content}
				</Layout>
			)}
			{!hasPlainBackground && (
				<LinearGradient
					style={[styles.container, darkBackground && styles.dark]}
					colors={[
						theme[
							`background-${darkBackground ? 'alternative' : 'basic'}-color-1`
						] ?? '#ffffff',
						theme[`color-primary-${darkBackground ? 800 : 200}`] ?? '#F7EBFD',
					]}
				>
					<Background style={styles.background} />
					{content}
				</LinearGradient>
			)}
		</SafeAreaView>
	);
};
