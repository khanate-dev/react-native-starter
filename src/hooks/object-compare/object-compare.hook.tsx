import { usePrevious } from 'hooks/previous';

import type { GenericObject } from 'types/general';

/** shallow compare an object for changed keys */
export const useObjectCompare = <Type extends GenericObject>(
	object: Type
): (keyof Type)[] => {
	const previousObject = usePrevious(object);

	const changedKeys = Object.keys(object).filter(
		(key) => object[key] !== previousObject?.[key]
	);

	return changedKeys;
};
