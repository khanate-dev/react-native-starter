import type { InputProps } from '@ui-kitten/components';
import type { StyleProp, ViewStyle } from 'react-native';
import type { ThemeColors } from 'types/general';
import type { FormButtonProps } from '../form-button';

type FormInputType =
	| 'string'
	| 'int'
	| 'float'
	| 'email'
	| 'password'
	| 'phone'
	| 'search'
	| 'date';

export type FormInputProps = {
	controlStyle?: StyleProp<ViewStyle>;
	type: FormInputType;
	value: string;
	error?: string;
	onChange: (value: string) => void;
	status?: ThemeColors;
	button?: Omit<FormButtonProps, 'disabled'> & {
		disabled?: FormButtonProps['disabled'] | ((value: string) => boolean);
	};
	hasIcon?: boolean;
	noCaption?: boolean;
	noMargin?: boolean;
	isLast?: boolean;
	disabled?: InputProps['disabled'] | ((value: string) => boolean);
} & Omit<InputProps, 'onChange' | 'status' | 'disabled'>;
