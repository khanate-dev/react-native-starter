import { SafeAreaView, View } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';
import Animated, { SlideInLeft, SlideOutRight } from 'react-native-reanimated';
import Constants from 'expo-constants';

import { logout, useUserOrNull } from 'contexts/auth';
import { Background } from 'components/media/background';
import { IconButton } from 'components/controls/icon-button';
import { AppIcon } from 'components/media/app-icon';
import { toggleDarkMode, useDarkMode } from 'contexts/dark-mode';

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
							style={{ borderRadius }}
							onPress={logout}
						/>
					)}

					<AppIcon
						name='user-account'
						color={theme.colors.primary}
						style={{
							borderRadius,
							backgroundColor: theme.colors.primaryContainer,
							padding: 10,
						}}
						size={30}
					/>

					<IconButton
						style={{ borderRadius }}
						icon={isDarkMode ? 'dark-mode' : 'light-mode'}
						onPress={toggleDarkMode}
					/>
				</View>

				<Animated.View
					entering={SlideInLeft.springify()}
					exiting={SlideOutRight.springify()}
					style={[style, { flex: 1 }]}
				>
					{children}
				</Animated.View>
			</Surface>
		</SafeAreaView>
	);
};
