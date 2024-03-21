import { IconButton as Component } from 'react-native-paper';

import { appIconMap } from '../../assets/icons.ts';

import type { IconButtonProps as Props } from 'react-native-paper';
import type { IconName } from '../../assets/icons.ts';
import type { App } from '../../types/app.types.ts';

export type IconButtonProps = Omit<Props, 'icon' | 'style'> &
	App.propsWithStyle<{ icon: IconName }>;

export const IconButton = ({
	icon: iconName,
	mode = 'contained',
	...props
}: IconButtonProps) => {
	return (
		<Component
			icon={appIconMap[iconName]}
			mode={mode}
			{...props}
			style={[{ borderRadius: 10 }, props.style]}
		/>
	);
};
