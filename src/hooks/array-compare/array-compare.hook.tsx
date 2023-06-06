import { usePrevious } from 'hooks/previous';

/** shallow compare an array for changed indexes */
export const useArrayCompare = (array: any[]): number[] => {
	const previousArray = usePrevious(array);

	const changedIndexes = array.filter(
		(_, index) => array[index] !== previousArray?.[index]
	);

	return changedIndexes;
};
