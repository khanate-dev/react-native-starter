import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { SafeAreaView, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import Animated, { SlideInLeft, SlideOutRight } from 'react-native-reanimated';

import { Background } from '~/components/app/background.component';
import { LanguageControl } from '~/components/app/language-control.component';
import { UserControl } from '~/components/app/user-control.component';
import { IconButton } from '~/components/controls/icon-button.component';
import { toggleMode, useMode } from '~/contexts/mode.context';
import { useTheme } from '~/hooks/theme.hook';

import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { App } from '~/types/app.types';
import type { Utils } from '~/types/utils.types';

export type ScreenWrapperProps = App.propsWithStyle<{
	/** the title to show on the page header */
	title?: string;

	/** should a back button be shown on the page header */
	back?: boolean;

	/** should the screen render a plain white background instead of the gradient? */
	hasPlainBackground?: boolean;

	children: ReactNode;
}> &
	Utils.allOrNone<{
		/** should the content be wrapped in a `ScrollView` */
		scroll?: boolean;

		/** the styles to apply to the wrapping `ScrollView` */
		scrollStyle?: StyleProp<ViewStyle>;
	}>;

export const ScreenWrapper = ({
	children,
	style,
	title,
	scroll,
	scrollStyle,
	back,
	hasPlainBackground,
}: ScreenWrapperProps) => {
	const router = useRouter();
	const theme = useTheme();
	const mode = useMode();

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
								onPress={() => {
									router.back();
								}}
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
						icon={`${mode.setting}-mode`}
						style={iconMargin}
						onPress={toggleMode}
					/>
				</View>

				{scroll ? (
					<Animated.ScrollView
						entering={SlideInLeft.springify()}
						exiting={SlideOutRight.springify()}
						contentContainerStyle={scrollStyle}
					>
						<View style={[{ padding: 5 }, style]}>{children}</View>
					</Animated.ScrollView>
				) : (
					<Animated.View
						entering={SlideInLeft.springify()}
						exiting={SlideOutRight.springify()}
						style={[{ flex: 1, padding: 5 }, style]}
					>
						{children}
					</Animated.View>
				)}
			</Surface>
		</SafeAreaView>
	);
};
