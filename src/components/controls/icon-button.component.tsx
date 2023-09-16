import { IconButton as Component } from 'react-native-paper';

import { appIconMap } from '~/components/app/icon.component';

import type { IconButtonProps as Props } from 'react-native-paper';
import type { IconName } from '~/components/app/icon.component';

export type IconButtonProps = Omit<Props, 'icon'> & {
	icon: IconName;
};

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
