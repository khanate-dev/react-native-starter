import { useState } from 'react';
import { Menu } from 'react-native-paper';

import { IconButton } from './icon-button.component.tsx';

import { modes, useMode } from '../../hooks/mode.hook.tsx';
import { useTheme } from '../../hooks/theme.hook.tsx';

import type { StyleProp, ViewStyle } from 'react-native';

export type ThemeControlProps = {
	buttonStyle?: StyleProp<ViewStyle>;
};

export const ThemeControl = ({ buttonStyle }: ThemeControlProps) => {
	const { setting, updateMode } = useMode();
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
					icon={`${setting}-mode`}
					onPress={() => {
						setVisible(true);
					}}
				/>
			}
			onDismiss={() => {
				setVisible(false);
			}}
		>
			{modes.map((mode) => (
				<Menu.Item
					key={mode}
					title={mode}
					leadingIcon={`${mode}-mode`}
					titleStyle={{ textTransform: 'capitalize' }}
					style={{
						backgroundColor:
							setting === mode
								? theme.getColor('primary', 'container')
								: undefined,
						borderRadius: 6,
					}}
					onPress={() => {
						updateMode(mode);
						setVisible(false);
					}}
				/>
			))}
		</Menu>
	);
};
