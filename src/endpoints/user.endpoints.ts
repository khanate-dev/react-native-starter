import { z } from 'zod';

import {
	deleteRequest,
	getRequest,
	postRequest,
	putRequest,
} from '../helpers/api.helpers.js';
import { omit } from '../helpers/object.helpers.js';
import {
	mockToken,
	mockedAdd,
	mockedDelete,
	mockedGet,
	mockedUpdate,
} from '../mocks.js';
import { loggedInUserSchema, userSchema } from '../schemas/user.schemas.js';

import type { DbId } from '../helpers/schema.helpers.js';
import type {
	LoggedInUser,
	User,
	UserSansMeta,
} from '../schemas/user.schemas.js';

export const userEndpoints = {
	login: async (body: {
		email: string;
		password: string;
	}): Promise<LoggedInUser> => {
		const response = await postRequest('user/login', body, true);
		return loggedInUserSchema.parse(response);
	},
	add: async (body: UserSansMeta): Promise<Omit<User, 'password'>> => {
		const response = await postRequest('user', body, true);
		return userSchema.parse(response);
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
		const response = await putRequest(`user/${id}`, body);
		return userSchema.parse(response);
	},
	delete: async (id: DbId): Promise<Omit<User, 'password'>> => {
		const response = await deleteRequest(`user/${id}`);
		return userSchema.parse(response);
	},
};

export const userMocks: typeof userEndpoints = {
	login: async ({ email, password }) => {
		const user = await mockedGet('user').then((users) =>
			users.find((curr) => curr.email === email),
		);
		if (!user) throw new Error('user not found');
		if (user.password !== password) throw new Error('incorrect password');
		return { ...omit(user, 'password'), token: mockToken };
	},
	get: async () =>
		(await mockedGet('user')).map((user) => omit(user, 'password')),
	getById: async (id) => omit(await mockedGet('user', id), 'password'),
	add: async (body) => omit(await mockedAdd('user', body), 'password'),
	update: async (id, body) =>
		omit(await mockedUpdate('user', id, body), 'password'),
	delete: async (id) => omit(await mockedDelete('user', id), 'password'),
};
