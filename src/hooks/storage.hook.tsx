import { useEffect } from 'react';

import { useAsyncState } from './async-state.hook';

import type { z } from 'zod';
import type { Store } from '../helpers/store.helpers';

export const useStorage = <
	Schema extends z.ZodSchema,
	Default extends Schema['_output'] = never,
>(
	store: Store<Schema, Default>,
) => {
	const [state, setState] = useAsyncState<Awaited<Schema['_output']>>(
		store.defaultVal,
	);

	useEffect(() => {
		store.get().then(setState);
	}, [store, setState]);

	return [state, setState] as const;
};
