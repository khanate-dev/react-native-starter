import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, useSegments } from 'expo-router';

import { getSetting, removeSetting, setSetting } from 'helpers/settings';
import { createEventHandlers } from 'helpers/events/events.helpers';

import type { LoggedInUser } from 'schemas/user';
import type { PropsWithChildren } from 'react';

const UserContext = createContext<null | LoggedInUser>(null);

const { emit, listen } = createEventHandlers<{
	login: [LoggedInUser];
	logout: [];
}>();

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const router = useRouter();
	const segments = useSegments();

	const [user, setUser] = useState<null | LoggedInUser>(null);

	useEffect(() => {
		(async () => {
			const storedUser = await getSetting('user');
			setUser(storedUser);
		})();

		const loginListener = listen('login', async (newUser) => {
			const added = await setSetting('user', newUser);
			if (!added) return;
			setUser(newUser);
		});

		const logoutListener = listen('logout', async () => {
			const removed = await removeSetting('user');
			if (!removed) return;
			setUser(null);
		});

		const inAuthGroup = segments[0] === 'auth';

		if (!user && !inAuthGroup) router.replace('/auth');
		else if (user && inAuthGroup) router.replace('/');

		return () => {
			loginListener.remove();
			logoutListener.remove();
		};
	}, [router, segments, user]);

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

/** fires the logout event to force logout on authentication errors */
export const logout = () => emit('logout');

/** fires the login event to set the new user on login */
export const login = (user: LoggedInUser) => emit('login', user);

export const useUser = (): LoggedInUser => {
	const user = useContext(UserContext);
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (user === undefined)
		throw new Error('useUser must be used within a UserProvider');
	if (!user) throw new Error('useUser must be used in an authenticated route');
	return user;
};
