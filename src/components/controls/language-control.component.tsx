import { useState } from 'react';
import { Menu } from 'react-native-paper';

import { IconButton } from './icon-button.component.tsx';

import { updateLanguage, useI18n } from '../../contexts/i18n.context.tsx';
import { useTheme } from '../../hooks/theme.hook.tsx';
import { languages } from '../../i18n.ts';
import { appIconMap } from '../app/icon.component.tsx';

import type { StyleProp, ViewStyle } from 'react-native';

export type LanguageControlProps = {
	buttonStyle?: StyleProp<ViewStyle>;
};

export const LanguageControl = ({ buttonStyle }: LanguageControlProps) => {
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
					onPress={() => {
						updateLanguage(lang);
						setVisible(false);
					}}
				/>
			))}
		</Menu>
	);
};
