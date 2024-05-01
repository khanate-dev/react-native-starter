import { config } from './config.ts';
import { wait } from './helpers/async.helpers.ts';
import { dayjsUtc } from './helpers/date.helpers.ts';
import { getUserOrThrowAuthError } from './hooks/auth.hook.tsx';

import type { DbId, DbMeta, Jwt } from './helpers/schema.helpers.ts';
import type { User } from './schemas/user.schemas.ts';

export const placeholderData = {
	/** cSpell: disable-next-line */
	token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI' as Jwt,
	image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12',
	date: dayjsUtc.utc('11/25/2021 4:23:22 PM'),
};

export const createMockedData = <T extends DbMeta>(
	data: Omit<T, keyof DbMeta>[],
) => {
	return data.map((row, index) => ({
		id: (index + 1) as DbId,
		created_at: dayjsUtc(),
		updated_at: dayjsUtc(),
		...row,
	})) as T[];
};

export const mockData = {
	user: createMockedData<User>([
		{
			email: 'testing@test.com',
			name: 'test',
			password: '12345',
			image_url: placeholderData.image,
		},
	]),
};

type MockData = typeof mockData;

export const mockedGet = async <
	Key extends keyof MockData,
	ID extends DbId = never,
>(
	key: Key,
	opts?: { id?: ID; noAuth?: boolean },
): Promise<[ID] extends [never] ? MockData[Key] : MockData[Key][number]> => {
	if (!config.disableAuth && !opts?.noAuth) getUserOrThrowAuthError();
	const list = mockData[key];
	if (!opts?.id) {
		await wait(500);
		return list as never;
	}
	const row = list.find((curr) => curr.id === opts.id);
	if (!row) throw new Error('Row not found!');
	await wait(500);
	return row as never;
};

export const mockedAdd = async <
	Key extends keyof MockData,
	Type extends MockData[Key][number],
>(
	key: Key,
	body: Omit<Type, keyof DbMeta>,
	opts?: { noAuth?: boolean },
): Promise<Type> => {
	if (!config.disableAuth && !opts?.noAuth) getUserOrThrowAuthError();
	const list = mockData[key];
	const newId = Math.max(...list.map((curr) => curr.id), 0) + 1;
	const now = dayjsUtc();
	const added = {
		id: newId as DbId,
		created_at: now,
		updated_at: now,
		...body,
	} as Type;
	list.push(added as never);
	await wait(500);
	return added;
};

export const mockedUpdate = async <
	Key extends keyof MockData,
	Type extends MockData[Key][number],
>(
	key: Key,
	id: DbId,
	body: Omit<Type, keyof DbMeta>,
	opts?: { noAuth?: boolean },
): Promise<Type> => {
	if (!config.disableAuth && !opts?.noAuth) getUserOrThrowAuthError();
	const list = mockData[key];
	const row = list.find((curr) => curr.id === id);
	if (!row) throw new Error(`No record found by ID ${id}`);
	const updatedRow = { ...row, ...body } as Type;
	list[list.indexOf(row)] = updatedRow;
	await wait(500);
	return updatedRow;
};

export const mockedDelete = async <
	Key extends keyof MockData,
	Type extends MockData[Key][number],
>(
	key: Key,
	id: DbId,
	opts?: { noAuth?: boolean },
): Promise<Type> => {
	if (!config.disableAuth && !opts?.noAuth) getUserOrThrowAuthError();
	const list = mockData[key];
	const row = list.find((curr) => curr.id === id);
	if (!row) throw new Error(`No record found by ID ${id}`);
	list.splice(list.indexOf(row), 1);
	await wait(500);
	return row as Type;
};
