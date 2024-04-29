 
import Component from '@expo/vector-icons/MaterialIcons.js';

import { appIconMap } from '../../assets/icons.js';

import type { IconProps as Props } from '@expo/vector-icons/build/createIconSet';
import type { IconName } from '../../assets/icons.js';

export type IconProps = Omit<Props<string>, 'name'> & {
	name: IconName;
};

export const Icon = ({ name: mapName, ...props }: IconProps) => {
	const name = appIconMap[mapName];
	return (
		<Component
			name={name as never}
			{...props}
		/>
	);
};
