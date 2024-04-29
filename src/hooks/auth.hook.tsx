import { useSyncExternalStore } from 'react';

import { AuthError } from '../errors.ts';
import { Store } from '../helpers/store.helpers.ts';
import { loggedInUserSchema } from '../schemas/user.schemas.ts';

import type { LoggedInUser } from '../schemas/user.schemas.ts';

export const authStore = new Store({
	key: 'user',
	schema: loggedInUserSchema,
	secureStore: true,
});

const getUser = () => {
	return authStore.getSnapShot();
};

export const getUserOrThrowAuthError = () => {
	const user = getUser();
	if (!user) throw new AuthError('user auth token not found!');
	return user;
};

const subscribe = (cb: () => void) => {
	return authStore.subscribe(cb);
};

export const logout = async () => {
	await authStore.remove();
};

export const login = async (user: LoggedInUser) => {
	await authStore.set(user);
};

export const useUserOrNull = () => {
	const user = useSyncExternalStore(subscribe, getUser);
	return { user, login, logout, hasInitialized: authStore.hasInitialized };
};

export const useAuth = () => {
	const user = useSyncExternalStore(subscribe, getUser);
	if (!user) throw new Error('useAuth must be used in an authenticated route');
	return { user, login, logout, hasInitialized: authStore.hasInitialized };
};
