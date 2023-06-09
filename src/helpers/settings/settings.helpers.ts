import * as SecureStore from 'expo-secure-store';
import { z } from 'zod';

import { loggedInUserSchema } from '~/schemas/user';
import { languages } from '~/i18n';
import { events } from '~/helpers/events';
import { getCatchMessage } from '~/errors';

const schemas = {
	user: loggedInUserSchema,
	isDarkMode: z.boolean(),
	language: z.enum(languages),
} satisfies Record<string, z.Schema>;

type Schemas = typeof schemas;

type Settings = {
	[k in keyof Schemas]: z.infer<Schemas[k]>;
};

export const removeSetting = async <Key extends keyof Settings>(
	key: Key
): Promise<boolean> => {
	try {
		await SecureStore.deleteItemAsync(key);
		return true;
	} catch (error) {
		events.emit('addAlert', {
			title: 'error removing from secure store',
			text: getCatchMessage(error),
		});
		return false;
	}
};

export const getSetting = async <Key extends keyof Settings>(
	key: Key
): Promise<null | Settings[Key]> => {
	try {
		const result = await SecureStore.getItemAsync(key);
		if (!result) return null;

		const parsed = schemas[key].parse(JSON.parse(result)) as never;
		return parsed;
	} catch (error) {
		events.emit('addAlert', {
			title: 'error reading from secure store',
			text: getCatchMessage(error),
		});
		await removeSetting(key);
		return null;
	}
};

export const setSetting = async <Key extends keyof Settings>(
	key: Key,
	value: Settings[Key]
): Promise<boolean> => {
	try {
		await SecureStore.setItemAsync(key, JSON.stringify(value));
		return true;
	} catch (error) {
		events.emit('addAlert', {
			title: 'error writing to secure store',
			text: getCatchMessage(error),
		});
		return false;
	}
};
