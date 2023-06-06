import { createContext, useContext, useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';

import {
	getUserSetting,
	removeUserSetting,
	setUserSetting,
} from 'helpers/settings';

import type { OwnerUser, SupervisorUser, User  } from 'schemas/user';
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
export const invalidateUser = () => {
	DeviceEventEmitter.emit('invalidate-user');
};

/** fires the set-user event to set the new user on login */
export const setUser = (user: User) => {
	DeviceEventEmitter.emit('set-user', user);
};

export const useUser = (): null | User => {
	const user = useContext(UserContext);
	if (user === undefined)
		throw new Error('useUser must be used within a UserProvider');

	return user;
};

export const useOwnerUser = (): OwnerUser => {
	const user = useContext(UserContext);
	if (user === undefined)
		throw new Error('useOwnerUser must be used within a UserProvider');

	if (user === null || user.type === 'supervisor') {
		const error =
			user === null
				? 'Must be logged in to call useOwnerUser!'
				: 'Can not use useOwnerUser while logged in as supervisor';
		throw new Error(error);
	}
	return user;
};

export const useSupervisorUser = (): SupervisorUser => {
	const user = useContext(UserContext);
	if (user === undefined)
		throw new Error('useSupervisorUser must be used within a UserProvider');

	if (user === null || user.type === 'owner') {
		const error =
			user === null
				? 'Must be logged in to call useSupervisorUser!'
				: 'Can not use useSupervisorUser while logged in as owner';
		throw new Error(error);
	}
	return user;
};
