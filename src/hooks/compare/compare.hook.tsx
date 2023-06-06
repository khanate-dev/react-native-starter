import { usePrevious } from 'hooks/previous';

/** checks if the given value has changed */
export const useCompare = (value: any): boolean => {
	const prevValue = usePrevious(value);
	return prevValue !== value;
};
