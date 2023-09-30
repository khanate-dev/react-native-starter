import { useEffect } from 'react';

import { getStorage } from '~/helpers/storage.helpers';

import { useAsyncState } from './async-state.hook';

import type { StorageKey, StorageMap } from '~/helpers/storage.helpers';

export const useStorage = <T extends StorageKey>(
	key: T,
	defaultValue?: StorageMap[T],
) => {
	const [state, setState] = useAsyncState<StorageMap[T]>(defaultValue);

	useEffect(() => {
		getStorage(key).then(setState);
	}, [key, setState]);

	return [state, setState] as const;
};
