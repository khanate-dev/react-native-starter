import Component from '@expo/vector-icons/MaterialCommunityIcons';

import { appIconMap } from '../../assets/icons.ts';

import type { IconProps as Props } from '@expo/vector-icons/build/createIconSet';
import type { IconName } from '../../assets/icons.ts';

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
