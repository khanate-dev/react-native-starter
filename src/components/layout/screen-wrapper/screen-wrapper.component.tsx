import { SafeAreaView, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import Animated, { SlideInLeft, SlideOutRight } from 'react-native-reanimated';
import Constants from 'expo-constants';

import { logout, useUserOrNull } from 'contexts/auth';
import { Background } from 'components/app/background';
import { IconButton } from 'components/controls/icon-button';
import { Icon } from 'components/app/icon';
import { toggleDarkMode, useDarkMode } from 'contexts/dark-mode';
import { useTheme } from 'hooks/theme';

import type { PropsWithChildren } from 'react';
import type { App } from 'types/app';

export type ScreenWrapperProps = PropsWithChildren<
	App.PropsWithStyle<{
		/** the title to show on the page header */
		title?: string;

		/**
		 * the function to call when the header back button is pressed
		 * back button is not rendered if excluded
		 */
		onBack?: () => void;

		/** should the screen render a plain white background instead of the gradient? */
		hasPlainBackground?: boolean;
	}>
>;

export const ScreenWrapper = ({
	children,
	style,
	title,
	onBack,
	hasPlainBackground,
}: ScreenWrapperProps) => {
	const user = useUserOrNull();
	const theme = useTheme();
	const isDarkMode = useDarkMode();

	const borderRadius = 10;

	return (
		<SafeAreaView style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
			<Surface style={{ flex: 1, position: 'relative' }}>
				{!hasPlainBackground && (
					<Background style={{ position: 'absolute', zIndex: 0 }} />
				)}

				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						height: 50,
						flexWrap: 'nowrap',
					}}
				>
					{onBack && (
						<IconButton
							icon='arrow-back'
							style={{ borderRadius }}
							onPress={onBack}
						/>
					)}

					{Boolean(title) && (
						<Text
							variant='titleSmall'
							style={{
								color: theme.colors.primary,
								textTransform: 'capitalize',
								flexGrow: 1,
							}}
						>
							{title}
						</Text>
					)}

					{user && (
						<IconButton
							icon='logout'
							iconColor={theme.colors.error}
							style={{ borderRadius, marginLeft: 'auto' }}
							onPress={logout}
						/>
					)}

					{user && (
						<Icon
							name='user-account'
							color={theme.colors.primary}
							size={30}
							style={{
								borderRadius,
								backgroundColor: theme.colors.primaryContainer,
								padding: 5,
							}}
						/>
					)}

					<IconButton
						style={{ borderRadius, marginLeft: user ? undefined : 'auto' }}
						icon={isDarkMode ? 'dark-mode' : 'light-mode'}
						onPress={toggleDarkMode}
					/>
				</View>

				<Animated.View
					entering={SlideInLeft.springify()}
					exiting={SlideOutRight.springify()}
					style={[{ flex: 1, padding: 10 }, style]}
				>
					{children}
				</Animated.View>
			</Surface>
		</SafeAreaView>
	);
};
