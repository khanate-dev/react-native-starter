import { Menu } from 'react-native-paper';
import { useState } from 'react';

import { languages } from 'i18n';
import { updateLanguage, useI18n } from 'contexts/i18n';
import { IconButton } from 'components/controls/icon-button';
import { useTheme } from 'hooks/theme';
import { appIconMap } from 'components/app/app-icon';

import type { StyleProp, ViewStyle } from 'react-native';

export type LanguageControlProps = {
	iconStyle?: StyleProp<ViewStyle>;
};

export const LanguageControl = ({ iconStyle }: LanguageControlProps) => {
	const { language } = useI18n();
	const theme = useTheme();

	const [visible, setVisible] = useState(false);

	return (
		<Menu
			visible={visible}
			anchorPosition='bottom'
			overlayAccessibilityLabel='Select Language'
			contentStyle={{ padding: 8, borderRadius: 10 }}
			anchor={
				<IconButton
					style={iconStyle}
					icon={'language'}
					onPress={() => setVisible(true)}
				/>
			}
			onDismiss={() => setVisible(false)}
		>
			{languages.map((lang) => (
				<Menu.Item
					key={lang}
					title={lang}
					leadingIcon={appIconMap[language === lang ? 'checked' : 'unchecked']}
					titleStyle={{ textTransform: 'capitalize' }}
					style={{
						backgroundColor:
							language === lang
								? theme.getColor('primary', 'container')
								: undefined,
						borderRadius: 6,
					}}
					onPress={() => updateLanguage(lang)}
				/>
			))}
		</Menu>
	);
};
