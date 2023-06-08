// eslint-disable-next-line no-restricted-imports
import { IconButton as Component } from 'react-native-paper';

import { materialIconMap } from 'components/media/app-icon';

import type { AppIconName } from 'components/media/app-icon';
import type { IconButtonProps as Props } from 'react-native-paper';

export type IconButtonProps = Omit<Props, 'icon'> & {
	icon: AppIconName;
};

export const IconButton = ({
	icon,
	mode = 'contained',
	...props
}: IconButtonProps) => {
	const name = materialIconMap[icon];
	return (
		<Component
			icon={name}
			mode={mode}
			{...props}
		/>
	);
};
