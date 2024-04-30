import { useSyncExternalStore } from 'react';

import { AuthError } from '../errors.ts';
import { Store } from '../helpers/store.helpers.ts';
import { loggedInUserSchema } from '../schemas/user.schemas.ts';

export const authStore = new Store({
	key: 'user',
	schema: loggedInUserSchema,
	secureStore: true,
});

const subscribe = (cb: () => void) => {
	return authStore.subscribe(cb);
};

const getSnapShot = () => {
	return authStore.getSnapShot();
};

export const getUserOrThrowAuthError = () => {
	const user = getSnapShot();
	if (!user) throw new AuthError('user auth token not found!');
	return user;
};

export const useUserOrNull = () => {
	const user = useSyncExternalStore(subscribe, getSnapShot);
	return { user, authStore };
};

export const useAuth = () => {
	const user = useSyncExternalStore(subscribe, getSnapShot);
	if (!user) throw new Error('useAuth must be used in an authenticated route');
	return { user, authStore };
};
