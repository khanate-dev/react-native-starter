import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { User } from 'schemas/user';

export type UserProviderProps = {
	user: null | User;
	setUser: Dispatch<SetStateAction<null | User>>;
	children: ReactNode;
};
