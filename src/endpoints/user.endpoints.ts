import { z } from 'zod';

import {
	deleteRequest,
	getRequest,
	postRequest,
	putRequest,
} from '../helpers/api.helpers.ts';
import { omit } from '../helpers/object.helpers.ts';
import {
	mockedAdd,
	mockedDelete,
	mockedGet,
	mockedUpdate,
	placeholderData,
} from '../mocks.ts';
import { loggedInUserSchema, userSchema } from '../schemas/user.schemas.ts';

import type { DbId } from '../helpers/schema.helpers.ts';
import type {
	LoggedInUser,
	User,
	UserSansMeta,
} from '../schemas/user.schemas.ts';

export const userEndpoints = {
	login: async (body: {
		email: string;
		password: string;
	}): Promise<LoggedInUser> => {
		return await postRequest('user/login', {
			body,
			noAuth: true,
			schema: loggedInUserSchema,
		});
	},
	add: async (body: UserSansMeta): Promise<Omit<User, 'password'>> => {
		return await postRequest('user', {
			body,
			noAuth: true,
			schema: userSchema,
		});
	},
	get: async (): Promise<Omit<User, 'password'>[]> => {
		return await getRequest('user', { schema: z.array(userSchema) });
	},
	getById: async (id: DbId): Promise<Omit<User, 'password'>> => {
		return await getRequest(`user/${id}`, { schema: userSchema });
	},
	update: async (
		id: DbId,
		body: UserSansMeta,
	): Promise<Omit<User, 'password'>> => {
		return await putRequest(`user/${id}`, { body, schema: userSchema });
	},
	delete: async (id: DbId): Promise<Omit<User, 'password'>> => {
		return await deleteRequest(`user/${id}`, { schema: userSchema });
	},
};

export const userMocks: typeof userEndpoints = {
	login: async ({ email, password }) => {
		const user = await mockedGet('user').then((users) =>
			users.find((curr) => curr.email === email),
		);
		if (!user) throw new Error('user not found');
		if (user.password !== password) throw new Error('incorrect password');
		return { ...omit(user, 'password'), token: placeholderData.token };
	},
	get: async () =>
		(await mockedGet('user')).map((user) => omit(user, 'password')),
	getById: async (id) => omit(await mockedGet('user', { id }), 'password'),
	add: async (body) => omit(await mockedAdd('user', body), 'password'),
	update: async (id, body) =>
		omit(await mockedUpdate('user', id, body), 'password'),
	delete: async (id) => omit(await mockedDelete('user', id), 'password'),
};
