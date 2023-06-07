import type { DatepickerProps } from '@ui-kitten/components';

export type FormDatePickerProps = {
	value: string;
	error?: string;
	onChange: (date: string) => void;
	hasIcon?: boolean;
	noCaption?: boolean;
	noMargin?: boolean;
} & Omit<DatepickerProps, 'onChange'>;
