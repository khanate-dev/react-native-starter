import { stringifyError } from '~/errors';
import { createBulkResponseSchema } from '~/helpers/schema.helpers';

import type { z } from 'zod';
import type { BulkResponse } from '~/helpers/api.helpers';
import type { DefaultBulkResponseObj } from '~/helpers/schema.helpers';
import type { Utils } from '~/types/utils.types';

export const readableTypeOf = (value: unknown) => {
	if (typeof value !== 'object') return typeof value;
	if (value === null) return 'null';
	if (Array.isArray(value)) return 'array';
	return 'object';
};

export const isObject = (value: unknown): value is Obj =>
	readableTypeOf(value) === 'object';

export const assertObject: Utils.assertFunction<Obj> = (value) => {
	const type = readableTypeOf(value);
	if (type !== 'object')
		throw new TypeError(`Expected object, received ${type}`);
};

export const isArray = <Type = unknown>(
	value: unknown,
	checker?: (value: unknown) => value is Type,
): value is Type[] => {
	return Array.isArray(value) && (!checker || value.every(checker));
};

type AssertArray = <Type = unknown>(
	value: unknown,
	checker?: Utils.assertFunction<Type>,
) => asserts value is Type[];

export const assertArray: AssertArray = (value, checker) => {
	if (!Array.isArray(value))
		throw new TypeError(`Expected array, received ${readableTypeOf(value)}`);
	try {
		if (!value.length || !checker) return;
		value.forEach(checker);
	} catch (error) {
		throw new TypeError(`Invalid array member. ${stringifyError(error)}`);
	}
};

export const excludeString = <
	const T extends string | undefined,
	const U extends string,
>(
	input: T,
	excludeList: U | Readonly<U[]>,
) => {
	return (
		(Array.isArray(excludeList) &&
			excludeList.includes(input as unknown as U)) ||
		(excludeList as string) === input
			? undefined
			: input
	) as T extends U ? Exclude<T, U> | undefined : T;
};

export const isBulkResponse = <
	Schema extends z.ZodObject<z.ZodRawShape> = DefaultBulkResponseObj,
>(
	value: unknown,
	schema?: Schema,
): value is BulkResponse<Schema['_output']> => {
	return createBulkResponseSchema(schema).safeParse(value).success;
};
