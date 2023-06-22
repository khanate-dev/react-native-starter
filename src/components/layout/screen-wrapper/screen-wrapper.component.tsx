import { SafeAreaView, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import Animated, { SlideInLeft, SlideOutRight } from 'react-native-reanimated';
import Constants from 'expo-constants';

import { Background } from 'components/app/background';
import { IconButton } from 'components/controls/icon-button';
import { toggleDarkMode, useDarkMode } from 'contexts/dark-mode';
import { useTheme } from 'hooks/theme';
import { LanguageControl } from 'components/app/language-control';
import { UserControl } from 'components/app/user-control';

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
	const theme = useTheme();
	const isDarkMode = useDarkMode();

	const iconMargin = theme.rtl ? { marginRight: 0 } : { marginLeft: 0 };

	return (
		<SafeAreaView style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
			<Surface style={{ flex: 1, position: 'relative' }}>
				{!hasPlainBackground && (
					<Background style={{ position: 'absolute', zIndex: 0 }} />
				)}

				<View
					style={{
						flexDirection: theme.rtl ? 'row-reverse' : 'row',
						height: 50,
						flexShrink: 1,
						flexWrap: 'nowrap',
						alignItems: 'center',
						justifyContent: 'flex-end',
					}}
				>
					<View style={[theme.styles.view.row, { flexShrink: 1 }]}>
						{onBack && (
							<IconButton
								icon={theme.rtl ? 'arrow-next' : 'arrow-back'}
								onPress={onBack}
							/>
						)}

						{Boolean(title) && (
							<Text
								variant='titleSmall'
								style={{
									color: theme.colors.primary,
									textTransform: 'capitalize',
									textAlign: theme.rtl ? 'right' : 'left',
									flexGrow: 1,
									marginLeft: 5,
								}}
							>
								{title}
							</Text>
						)}
					</View>

					<UserControl buttonStyle={iconMargin} />

					<LanguageControl buttonStyle={iconMargin} />

					<IconButton
						icon={isDarkMode ? 'dark-mode' : 'light-mode'}
						style={iconMargin}
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
