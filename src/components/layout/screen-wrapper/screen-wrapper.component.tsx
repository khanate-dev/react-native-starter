import { SafeAreaView, View } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';
import Animated, { SlideInLeft, SlideOutRight } from 'react-native-reanimated';
import Constants from 'expo-constants';

import { logout, useUserOrNull } from 'contexts/auth';
import { Background } from 'components/media/background';
import { IconButton } from 'components/controls/icon-button';
import { AppIcon } from 'components/media/app-icon';
import { isSmallerScreen } from 'src/config';
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

	const marginLeft = isSmallerScreen ? 10 : 15;

	const content = (
		<>
			{Boolean(onBack || title || user?.name) && (
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						height: 50,
						width: '100%',
						padding: 5,
						flexWrap: 'nowrap',
					}}
				>
					<View
						style={{
							flex: 1,
							flexShrink: 1,
							height: '100%',
							flexDirection: 'row',
							justifyContent: 'flex-start',
							alignItems: 'center',
							overflow: 'hidden',
						}}
					>
						{onBack && (
							<IconButton
								icon='arrow-back'
								style={{ borderRadius: 5 }}
								size={40}
								onPress={onBack}
							/>
						)}

						{Boolean(title) && (
							<Text
								variant='headlineLarge'
								style={{
									marginLeft,
									fontWeight: 'bold',
									color: theme.colors.primary,
									fontSize: 14,
									overflow: 'hidden',
									textTransform: 'capitalize',
								}}
							>
								{title}
							</Text>
						)}
					</View>

					<View
						style={{
							flex: 1,
							flexShrink: 1,
							height: '100%',
							flexDirection: 'row',
							justifyContent: 'flex-end',
							alignItems: 'center',
						}}
					>
						{Boolean(user?.name) && (
							<>
								<IconButton
									style={{ padding: 5, borderRadius: 5 }}
									icon='logout'
									size={30}
									iconColor={theme.colors.error}
									mode='outlined'
									onPress={logout}
								/>
								<AppIcon
									name='user-account'
									color={theme.colors.primary}
									style={{
										marginLeft,
										width: 30,
										height: 30,
										borderColor: theme.colors.primary,
										borderWidth: 3,
										borderRadius: 20,
									}}
								/>
							</>
						)}

						<IconButton
							style={{ marginLeft, padding: 5, borderRadius: 5 }}
							icon={isDarkMode ? 'dark-mode' : 'light-mode'}
							onPress={toggleDarkMode}
						/>
					</View>
				</View>
			)}

			<Animated.View
				entering={SlideInLeft.springify()}
				exiting={SlideOutRight.springify()}
				style={[style, { flex: 1 }]}
			>
				{children}
			</Animated.View>
		</>
	);

	return (
		<SafeAreaView style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
			<Surface style={{ flex: 1, position: 'relative' }}>
				{!hasPlainBackground && (
					<Background
						style={{
							position: 'absolute',
							zIndex: 0,
							width: '100%',
							height: '100%',
						}}
					/>
				)}
				{content}
			</Surface>
		</SafeAreaView>
	);
};
