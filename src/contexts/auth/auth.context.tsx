import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, useSegments } from 'expo-router';

import { removeSetting, setSetting } from '~/helpers/settings';
import { events } from '~/helpers/events';

import type { LoggedInUser } from '~/schemas/user';
import type { PropsWithChildren } from 'react';

const UserContext = createContext<null | LoggedInUser>(null);

type AuthProviderProps = PropsWithChildren<{
	defaultUser: null | LoggedInUser;
}>;

export const AuthProvider = ({ defaultUser, children }: AuthProviderProps) => {
	const rootSegment = useSegments()[0];
	const router = useRouter();

	const [user, setUser] = useState(defaultUser);

	useEffect(() => {
		const loginListener = events.listen('login', async (newUser) => {
			const added = await setSetting('user', newUser);
			if (!added) return;
			setUser(newUser);
		});

		const logoutListener = events.listen('logout', async () => {
			const removed = await removeSetting('user');
			if (!removed) return;
			setUser(null);
		});

		return () => {
			loginListener.remove();
			logoutListener.remove();
		};
	}, []);

	useEffect(() => {
		if (rootSegment === '[...404]') return;
		if (!user && rootSegment !== 'auth') router.replace('/auth/');
		else if (user && rootSegment === 'auth') router.replace('/');
	}, [router, user, rootSegment]);

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

/** fires the logout event to force logout on authentication errors */
export const logout = () => events.emit('logout');

/** fires the login event to set the new user on login */
export const login = (user: LoggedInUser) => events.emit('login', user);

export const useUserOrNull = (): LoggedInUser | null => {
	const user = useContext(UserContext);
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (user === undefined)
		throw new Error('useUser must be used within a UserProvider');
	return user;
};

export const useUser = (): LoggedInUser => {
	const user = useContext(UserContext);
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (user === undefined)
		throw new Error('useUser must be used within a UserProvider');
	if (!user) throw new Error('useUser must be used in an authenticated route');
	return user;
};
