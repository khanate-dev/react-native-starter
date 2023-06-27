import { SafeAreaView, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import Animated, { SlideInLeft, SlideOutRight } from 'react-native-reanimated';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';

import { Background } from '~/components/app/background';
import { IconButton } from '~/components/controls/icon-button';
import { toggleDarkMode, useDarkMode } from '~/contexts/dark-mode';
import { useTheme } from '~/hooks/theme';
import { LanguageControl } from '~/components/app/language-control';
import { UserControl } from '~/components/app/user-control';

import type { App } from '~/types/app';
import type { ReactNode } from 'react';

export type ScreenWrapperProps = App.propsWithStyle<{
	/** the title to show on the page header */
	title?: string;

	/** should a back button be shown on the page header */
	back?: boolean;

	/** should the screen render a plain white background instead of the gradient? */
	hasPlainBackground?: boolean;

	children: ReactNode;
}>;

export const ScreenWrapper = ({
	children,
	style,
	title,
	back,
	hasPlainBackground,
}: ScreenWrapperProps) => {
	const router = useRouter();
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
					<View style={[theme.styles.view.row, { flexShrink: 1, padding: 7 }]}>
						{back && (
							<IconButton
								icon={theme.rtl ? 'arrow-next' : 'arrow-back'}
								style={iconMargin}
								onPress={() => router.back()}
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
					style={[{ flex: 1, padding: 5 }, style]}
				>
					{children}
				</Animated.View>
			</Surface>
		</SafeAreaView>
	);
};
