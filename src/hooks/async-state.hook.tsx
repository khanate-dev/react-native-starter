import { useReducer } from 'react';

import type { Reducer } from 'react';

export type AsyncState<T> =
	| [isLoading: true, value: null]
	| [isLoading: false, value: T];

export type AsyncSetter<T> = T | null | ((prev: T | null) => T | null);

export const useAsyncState = <
	T extends boolean | string | number | bigint | object,
>(
	initialValue: T | null = null,
) => {
	return useReducer<Reducer<AsyncState<T>, AsyncSetter<T>>>(
		(state, action) => {
			const value =
				typeof action === 'function' ? (action(state[1]) as T | null) : action;
			return value ? [false, value] : [true, null];
		},
		initialValue ? [false, initialValue] : [true, null],
	);
};
