// eslint-disable-next-line no-restricted-imports
import { IconButton as Component } from 'react-native-paper';

import type { MaterialIconName } from 'components/media/material-icon';
import type { IconButtonProps as Props } from 'react-native-paper';
import type { IconSource as Source } from 'react-native-paper/lib/typescript/src/components/Icon';

export type IconButtonProps = Props & {
	icon: Exclude<Source, string> | MaterialIconName;
};

export const IconButton = (props: IconButtonProps) => {
	return <Component {...props} />;
};
