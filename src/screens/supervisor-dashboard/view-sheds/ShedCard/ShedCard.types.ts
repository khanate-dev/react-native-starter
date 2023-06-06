import type { SvgProps } from 'react-native-svg';
import type { ShedWithGradient } from 'schemas/shed';

export type ShedCardName =
	| 'age'
	| 'mortality'
	| 'fcr'
	| 'noOfBirds'
	| 'averageWeight'
	| 'action';

export type ShedCardType = {
	name: ShedCardName;
	label?: string;
	getText: (shed: ShedWithGradient) => string;
	icon?: (props: SvgProps) => JSX.Element;
	showsUnexpended?: boolean;
	isWider?: boolean;
	isFull?: boolean;
	noLabel?: boolean;
};

export type ShedCardProps = {
	/** the details of the current shed */
	shed: ShedWithGradient;

	/** the colors of the card's gradient */
	gradient: [string, string];

	/** the function to call when the card is expanded */
	onExpand: () => void;

	/** the function to call when the cards is shrunk */
	onShrink: () => void;

	/** is the card in expanded state? */
	isExpanded?: boolean;
};
