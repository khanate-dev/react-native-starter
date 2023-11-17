import { IconButton as Component } from 'react-native-paper';

import { appIconMap } from '../app/icon.component.tsx';

import type { IconButtonProps as Props } from 'react-native-paper';
import type { App } from '../../types/app.types.ts';
import type { IconName } from '../app/icon.component.tsx';

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
