import { useSyncExternalStore } from 'react';

import { Store } from '../helpers/store.helpers.js';
import { loggedInUserSchema } from '../schemas/user.schemas.js';

import type { LoggedInUser } from '../schemas/user.schemas.js';

export const authStore = new Store({
	key: 'user',
	schema: loggedInUserSchema,
	secureStore: true,
});

const getUser = () => {
	return authStore.getSnapShot();
};

const subscribe = (cb: () => void) => {
	return authStore.subscribe(cb);
};

export const logout = async () => {
	return authStore.remove();
};

export const login = async (user: LoggedInUser) => {
	return authStore.set(user);
};

export const useUserOrNull = () => {
	const user = useSyncExternalStore(subscribe, getUser);
	return { user, login, logout, hasInitialized: authStore.hasInitialized };
};

export const useUser = () => {
	const user = useSyncExternalStore(subscribe, getUser);
	if (!user) throw new Error('useUser must be used in an authenticated route');
	return { user, login, logout, hasInitialized: authStore.hasInitialized };
};
