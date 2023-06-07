import { StyleSheet } from 'react-native';

import { isSmallerScreen } from 'src/config';

import type { ThemeType } from '@ui-kitten/components';
import type { FormButtonProps } from './form-button.types';

export const getFormButtonStyles = (
	theme: ThemeType,
	borders?: FormButtonProps['borders'],
	hasBorder?: boolean,
	noMargin?: boolean,
	elevated?: boolean
) =>
	StyleSheet.create({
		button: {
			borderWidth: hasBorder ? 2 : undefined,
			borderColor: hasBorder ? theme['text-basic-color'] : undefined,
			marginTop: !noMargin ? (isSmallerScreen ? 10 : 20) : undefined,
			borderRadius:
				borders === 'rounded' ? 100 : borders === 'curved' ? 10 : undefined,
			elevation: elevated ? 3 : undefined,
		},
		disabled: {
			borderColor: theme['text-hint-color'],
		},
		icon: {
			justifyContent: 'center',
			alignItems: 'center',
			marginRight: isSmallerScreen ? 0 : 5,
		},
	});
