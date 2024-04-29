import { useState } from 'react';
import { Menu } from 'react-native-paper';

import { IconButton } from './icon-button.component.js';

import { appIconMap } from '../../assets/icons.js';
import { useTheme } from '../../hooks/theme.hook.js';
import { languageLabel, languages, useI18n } from '../../i18n.js';

import type { StyleProp, ViewStyle } from 'react-native';

export type LanguageControlProps = {
	buttonStyle?: StyleProp<ViewStyle>;
};

export const LanguageControl = ({ buttonStyle }: LanguageControlProps) => {
	const { language, updateLanguage } = useI18n();
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
					style={buttonStyle}
					icon={'language'}
					onPress={() => {
						setVisible(true);
					}}
				/>
			}
			onDismiss={() => {
				setVisible(false);
			}}
		>
			{languages.map((lang) => (
				<Menu.Item
					key={lang}
					title={languageLabel[lang]}
					leadingIcon={appIconMap[language === lang ? 'checked' : 'unchecked']}
					titleStyle={{ textTransform: 'capitalize' }}
					style={{
						backgroundColor:
							language === lang
								? theme.getColor('primary', 'container')
								: undefined,
						borderRadius: 6,
					}}
					onPress={() => {
						updateLanguage(lang);
						setVisible(false);
					}}
				/>
			))}
		</Menu>
	);
};
