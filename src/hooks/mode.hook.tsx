import { useSyncExternalStore } from 'react';
import { Appearance } from 'react-native';
import { z } from 'zod';

import { Store } from '../helpers/store.helpers.js';

export const modes = ['system', 'dark', 'light'] as const;

export type Mode = (typeof modes)[number];

export type ModeState = { setting: Mode; scheme: Exclude<Mode, 'system'> };

const store = new Store({
	key: 'mode',
	secureStore: false,
	schema: z.enum(modes),
	defaultVal: 'system',
});

const getModeSetting = () => {
	return store.getSnapShot();
};

const subscribe = (callback: () => void) => {
	return store.subscribe(callback);
};

export const updateMode = async (mode: Mode) => {
	return store.set(mode);
};

export const useMode = () => {
	const setting = useSyncExternalStore(subscribe, getModeSetting);
	const mode =
		setting === 'system' ? Appearance.getColorScheme() ?? 'light' : setting;
	return { mode, setting, updateMode };
};
