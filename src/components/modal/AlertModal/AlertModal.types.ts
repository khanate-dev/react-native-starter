import type { ModalProps } from '@ui-kitten/components';
import type { ThemeColors } from 'types/general';
import type { FormButtonProps } from 'components/form/FormButton';

export type AlertModalProps = {
	title?: string;
	text: string;
	type?: Exclude<ThemeColors, 'control'>;
	closeLabel?: string;
	actions?: FormButtonProps[];
	onClose?: () => void;
	noIcon?: boolean;
} & Pick<ModalProps, 'style' | 'backdropStyle'>;
