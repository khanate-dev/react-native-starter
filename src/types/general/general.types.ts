import { z } from 'zod';

import { User } from 'schemas/user';

export type ReadableTypeOf = (
	| 'undefined'
	| 'boolean'
	| 'number'
	| 'bigint'
	| 'string'
	| 'symbol'
	| 'function'
	| 'array'
	| 'null'
	| 'object'
);

export interface RepeatedTuple<L extends number, T extends any> extends Array<T> {
	0: T,
	length: L,
}

export type DistributedArray<T> = T extends infer I ? I[] : never;

export type GenericObject<Key extends string = string> = {
	[x in Key]: (
		| string
		| number
		| boolean
		| Date
		| null
		| undefined
		| any[]
		| GenericObject
	);
};

export type AlertStatus = null | string | {
	type: 'danger' | 'success' | 'info' | 'warning',
	text: string,
};

export interface Settings {
	user: User,
}

export type ThemeColors = (
	| 'primary'
	| 'basic'
	| 'control'
	| 'success'
	| 'danger'
	| 'info'
	| 'warning'
);

export type AssertFunction<Type> = (
	value: any
) => asserts value is Type;

export type AssertArrayFunction<Type> = (
	value: any,
	onlyCheckFirst?: boolean
) => asserts value is Type;

export const gradientSchema = z.tuple([z.string(), z.string()]);

export type Gradient = z.infer<typeof gradientSchema>;
