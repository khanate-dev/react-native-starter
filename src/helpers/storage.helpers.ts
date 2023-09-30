import * as SecureStore from 'expo-secure-store';
import { z } from 'zod';

import { stringifyError } from '~/errors';
import { events } from '~/helpers/events.helpers';
import { languages } from '~/i18n';
import { loggedInUserSchema } from '~/schemas/user.schemas';

const schemas = {
	user: loggedInUserSchema,
	isDarkMode: z.boolean(),
	language: z.enum(languages),
} satisfies Record<string, z.Schema>;

type Schemas = typeof schemas;

export type StorageKey = keyof Schemas;

export type StorageMap = {
	[k in StorageKey]: z.infer<Schemas[k]>;
};

export const removeStorage = async <Key extends StorageKey>(
	key: Key,
): Promise<boolean> => {
	try {
		await SecureStore.deleteItemAsync(key);
		return true;
	} catch (error) {
		events.emit('addAlert', {
			title: 'error removing from secure store',
			text: stringifyError(error),
		});
		return false;
	}
};

export const getStorage = async <Key extends StorageKey>(
	key: Key,
): Promise<null | StorageMap[Key]> => {
	try {
		const result = await SecureStore.getItemAsync(key);
		if (!result) return null;

		const parsed = schemas[key].parse(JSON.parse(result)) as never;
		return parsed;
	} catch (error) {
		events.emit('addAlert', {
			title: 'error reading from secure store',
			text: stringifyError(error),
		});
		await removeStorage(key);
		return null;
	}
};

export const setStorage = async <Key extends StorageKey>(
	key: Key,
	value: StorageMap[Key],
): Promise<boolean> => {
	try {
		await SecureStore.setItemAsync(key, JSON.stringify(value));
		return true;
	} catch (error) {
		events.emit('addAlert', {
			title: 'error writing to secure store',
			text: stringifyError(error),
		});
		return false;
	}
};
