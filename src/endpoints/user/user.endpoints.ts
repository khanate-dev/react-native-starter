import { z } from 'zod';

import { loggedInUserSchema, userSchema } from 'schemas/user';
import {
	postRequest,
	getRequest,
	putRequest,
	deleteRequest,
} from 'helpers/api';
import { mockedAdd, mockedDelete, mockedGet, mockedUpdate } from 'mocks';

import type { User, Login, UserSansMeta, LoggedInUser } from 'schemas/user';
import type { DbId } from 'helpers/schema';

export const userEndpoints = {
	login: async (body: Login): Promise<LoggedInUser> => {
		const response = await postRequest('user/login', body, true);
		return loggedInUserSchema.parse(response);
	},
	add: async (body: UserSansMeta): Promise<User> => {
		const response = await postRequest('user', body, true);
		return userSchema.parse(response);
	},
	get: async (): Promise<User[]> => {
		return getRequest('user', { schema: z.array(userSchema) });
	},
	getById: async (id: DbId): Promise<User> => {
		return getRequest(`user/${id}`, { schema: userSchema });
	},
	update: async (id: DbId, body: UserSansMeta): Promise<User> => {
		const response = await putRequest(`user/${id}`, body);
		return userSchema.parse(response);
	},
	delete: async (id: DbId): Promise<User> => {
		const response = await deleteRequest(`user/${id}`);
		return userSchema.parse(response);
	},
};

export const userMocks: typeof userEndpoints = {
	login: async ({ email, password }) => {
		const user = await mockedGet('user').then((users) =>
			users.find((curr) => curr.email === email)
		);
		if (!user) throw new Error('user not found');
		if (user.password !== password) throw new Error('incorrect password');
		return { ...user, token: '123456789' };
	},
	get: async () => mockedGet('user'),
	getById: async (id) => mockedGet('user', id),
	add: async (body) => mockedAdd('user', body),
	update: async (id, body) => mockedUpdate('user', id, body),
	delete: async (id) => mockedDelete('user', id),
};
