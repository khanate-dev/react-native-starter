import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

import type { z } from 'zod';

const storeMethodsMap = {
	secure: {
		get: SecureStore.getItemAsync,
		set: SecureStore.setItemAsync,
		remove: SecureStore.deleteItemAsync,
	},
	async: {
		get: AsyncStorage.getItem,
		set: AsyncStorage.setItem,
		remove: AsyncStorage.removeItem,
	},
};

type CreateStoreOpts<
	Schema extends z.ZodSchema,
	Default extends Schema['_output'] = never,
> = {
	/** the key to store the value under */
	key: string;
	/** should the store use `SecureStore` instead of `AsyncStorage` */
	secureStore?: boolean;
	/** the `zod` schema to validate the stored value against */
	schema: Schema;
	/** the default value to assign to store */
	defaultVal?: Default;
};

export type Store<
	Schema extends z.ZodSchema,
	Default extends Schema['_output'] = never,
> = {
	key: string;
	defaultVal: Default;
	get: () => Promise<
		Schema['_output'] | ([Default] extends [never] ? null : Default)
	>;
	set: (value: Schema['_output']) => Promise<boolean>;
	remove: () => Promise<boolean>;
};

export const createStore = <
	Schema extends z.ZodSchema,
	Default extends Schema['_output'] = never,
>({
	key,
	secureStore,
	schema,
	defaultVal,
}: CreateStoreOpts<Schema, Default>): Store<Schema, Default> => {
	const store = storeMethodsMap[secureStore ? 'secure' : 'async'];
	return {
		key,
		defaultVal: defaultVal as never,
		get: async () => {
			try {
				const string = await store.get(key);
				if (!string) throw new Error('not found');
				return schema.parse(JSON.parse(string)) as never;
			} catch {
				if (defaultVal !== undefined) {
					await store.set(key, JSON.stringify(defaultVal));
					return defaultVal as never;
				}
				await store.remove(key);
				return null;
			}
		},
		set: async (value: Schema['_output']) => {
			try {
				await store.set(key, JSON.stringify(value));
				return true;
			} catch {
				return false;
			}
		},
		remove: async () => {
			try {
				await (defaultVal
					? store.set(key, JSON.stringify(defaultVal))
					: store.remove(key));
				return true;
			} catch {
				return false;
			}
		},
	};
};
