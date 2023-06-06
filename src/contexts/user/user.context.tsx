import { createContext, useContext, useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';

import {
	getUserSetting,
	removeUserSetting,
	setUserSetting,
} from 'helpers/settings';

import type { User } from 'schemas/user';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

export type UserProviderProps = {
	user: null | User;
	setUser: Dispatch<SetStateAction<null | User>>;
	children: ReactNode;
};

const UserContext = createContext<null | User>(null);

export const UserProvider = ({
	user,
	setUser,
	children,
}: UserProviderProps) => {
	useEffect(() => {
		(async () => {
			const storedUser = await getUserSetting('user');
			setUser(storedUser);
		})();

		DeviceEventEmitter.addListener('set-user', async (newUser: User) => {
			const added = await setUserSetting('user', newUser);
			if (!added) return;
			setUser(newUser);
		});

		DeviceEventEmitter.addListener('invalidate-user', () => {
			const removed = removeUserSetting('user');
			if (!removed) return;
			setUser(null);
		});

		return () => {
			DeviceEventEmitter.removeAllListeners('invalidate-user');
			DeviceEventEmitter.removeAllListeners('set-user');
		};
	}, []);

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

/** fires the invalidate-user event to force logout on authentication errors */
export const logout = () => {
	DeviceEventEmitter.emit('invalidate-user');
};

/** fires the set-user event to set the new user on login */
export const setUser = (user: User) => {
	DeviceEventEmitter.emit('set-user', user);
};

export const useUser = (): null | User => {
	const user = useContext(UserContext);
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (user === undefined)
		throw new Error('useUser must be used within a UserProvider');

	return user;
};
