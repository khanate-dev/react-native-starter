import { z } from 'zod';

import type { Utils } from './utils.types.js';

type trueTuple<T extends true[]> = T[number] extends true ? true : false;
type falseTuple<T extends false[]> = T[number] extends false ? true : false;

test('test prettify type util', () => {
	type tests = trueTuple<
		[
			Utils.equal<
				Utils.prettify<{ x: 1 } & { y: { a: 2 } | { b: 2 } }>,
				{ x: 1; y: { a: 2 } | { b: 2 } }
			>,
		]
	>;
	z.util.assertIs<tests>(true);
});

test('test equal type util', () => {
	interface Int1 {
		x: 1;
	}
	interface Int2 extends Int1 {
		y: 2;
	}
	type trueTests = trueTuple<
		[
			Utils.equal<1, 1>,
			Utils.equal<1 | 2 | 3, 1 | 2 | 3>,
			Utils.equal<[1, 2, 3], [1, 2, 3]>,
			Utils.equal<[2] | [1, 2, 3], [1, 2, 3] | [2]>,
			Utils.equal<{ x: 1 } | { y: 2 }, { y: 2 } | { x: 1 }>,
			Utils.equal<{ x: 1 } & { y: 2 }, { x: 1; y: 2 }>,
			Utils.equal<Int2, { x: 1; y: 2 }>,
			Utils.equal<
				Int2 & { z: { a: 3; b: 4 } },
				{ x: 1; y: 2; z: { a: 3 } & { b: 4 } }
			>,
			Utils.equal<Int2[] | Int2, { x: 1; y: 2 }[] | { x: 1; y: 2 }>,
			Utils.equal<Record<string, unknown>, Record<string, unknown>>,
		]
	>;
	type falseTests = falseTuple<
		[
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			Utils.equal<any, unknown>,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			Utils.equal<any, 1>,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			Utils.equal<any, never>,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			Utils.equal<any, {}>,
			Utils.equal<unknown, never>,
			Utils.equal<unknown, {}>,
			Utils.equal<1, 1 | 2 | 3>,
			Utils.equal<[1], [1 | 2 | 3]>,
			Utils.equal<{ foo: 1 }, { foo: 2 }>,
			Utils.equal<{ x: 1 }, Record<string, unknown>>,
			Utils.equal<object, Record<string, unknown>>,
		]
	>;
	z.util.assertIs<[trueTests, falseTests]>([true, true]);
});

test('test satisfies type util', () => {
	type _tests = [
		Utils.satisfies<1, 1>,
		Utils.satisfies<1 | 2 | 3, number>,
		Utils.satisfies<[1, 2, 3], unknown[]>,
		Utils.satisfies<{ x: 1; y: 2; z: 3 }, { x: 1; y: 2 }>,
		Utils.satisfies<(val: string) => void, (...args: any[]) => unknown>,
		// @ts-expect-error does not satisfies
		Utils.satisfies<1 | 2, string>,
		// @ts-expect-error does not satisfies
		Utils.satisfies<{ x: 1 }, { x: 1; y: 2 }>,
		// @ts-expect-error does not satisfies
		Utils.satisfies<[1, 2, '3'], number[]>,
	];
});

test('test dropFirst type util', () => {
	type tests = trueTuple<
		[
			Utils.equal<Utils.dropFirst<[1, 2, 3]>, [2, 3]>,
			Utils.equal<Utils.dropFirst<[]>, []>,
			Utils.equal<Utils.dropFirst<readonly string[]>, readonly string[]>,
		]
	>;
	z.util.assertIs<tests>(true);
});

test('test tuple type util', () => {
	type tests = trueTuple<
		[
			Utils.equal<Utils.tuple<5>, [1, 1, 1, 1, 1]>,
			Utils.equal<Utils.tuple<1, 1 | 2>, [1 | 2]>,
			Utils.equal<Utils.tuple<0, string>, []>,
			Utils.equal<Utils.tuple<1, string | { foo: 1 }>, [string | { foo: 1 }]>,
		]
	>;
	z.util.assertIs<tests>(true);
});

test('test repeatString type util', () => {
	type tests = trueTuple<
		[
			Utils.equal<Utils.repeatString<'1', 5>, '11111'>,
			Utils.equal<Utils.repeatString<'', 5>, ''>,
			Utils.equal<Utils.repeatString<'', 0>, ''>,
			Utils.equal<Utils.repeatString<'foo' | 'bar', 2>, 'foofoo' | 'barbar'>, // cSpell: disable-line,
		]
	>;
	z.util.assertIs<tests>(true);
});

test('test trim type util', () => {
	type tests = trueTuple<
		[
			Utils.equal<Utils.trim<'  1   '>, '1'>,
			Utils.equal<Utils.trim<''>, ''>,
			Utils.equal<Utils.trim<'  foo'>, 'foo'>,
			Utils.equal<Utils.trim<'foo  ' | ' bar' | 'baz'>, 'foo' | 'bar' | 'baz'>,
		]
	>;
	z.util.assertIs<tests>(true);
});

test('test distributedArray type util', () => {
	type tests = trueTuple<
		[
			Utils.equal<Utils.distributedArray<1 | 2 | 3>, 1[] | 2[] | 3[]>,
			Utils.equal<Utils.distributedArray<{ foo: 1 | 2 }>, { foo: 1 | 2 }[]>,
		]
	>;
	z.util.assertIs<tests>(true);
});

test('test assertFunction type util', () => {
	const func1: Utils.assertFunction<string> = () => {
		return undefined;
	};
	const val1 = {} as unknown;
	z.util.assertIs<unknown>(val1);
	func1(val1);
	z.util.assertIs<string>(val1);

	const func2: Utils.assertFunction<{ foo: 1 }> = () => {
		return undefined;
	};
	const val2 = {} as unknown;
	z.util.assertIs<unknown>(val2);
	func2(val2);
	z.util.assertIs<{ foo: 1 }>(val2);
});

test('test keysOfType type util', () => {
	type tests = trueTuple<
		[
			Utils.equal<Utils.keysOfType<{ foo: 1; bar: 2 }, 1 | 2>, 'foo' | 'bar'>,
			Utils.equal<Utils.keysOfType<{ foo: 1; bar: 2 }, 3>, never>,
			Utils.equal<
				Utils.keysOfType<
					{ foo: { baz: number }; bar: { baz: number | string } },
					{ baz: number }
				>,
				'foo'
			>,
		]
	>;
	z.util.assertIs<tests>(true);
});

test('test allUnionKeys type util', () => {
	type tests = trueTuple<
		[
			Utils.equal<Utils.allUnionKeys<{ x: 1 } | { y: 2 }>, 'x' | 'y'>,
			Utils.equal<Utils.allUnionKeys<{ x: 1 }>, 'x'>,
			Utils.equal<Utils.allUnionKeys<never>, never>,
		]
	>;
	z.util.assertIs<tests>(true);
});

test('test includeUnionKeys type util', () => {
	type tests = trueTuple<
		[
			Utils.equal<
				Utils.includeUnionKeys<{ x: 1 } | { y: 2 }>,
				{ x: 1; y?: never } | { y: 2; x?: never }
			>,
			Utils.equal<Utils.includeUnionKeys<{ x: 1 }>, { x: 1 }>,
		]
	>;
	z.util.assertIs<tests>(true);
});

test('test noUndefinedKeys type util', () => {
	type tests = trueTuple<
		[
			Utils.equal<
				Utils.noUndefinedKeys<{ x: 1; y: undefined } | { y: 2; x: undefined }>,
				{ x: 1; y: never } | { y: 2; x: never }
			>,
			Utils.equal<
				Utils.noUndefinedKeys<{ x: 1; y: undefined; z: 2 }>,
				{ x: 1; y: never; z: 2 }
			>,
		]
	>;
	z.util.assertIs<tests>(true);
});

test('test strictly type util', () => {
	type tests = trueTuple<
		[
			Utils.equal<
				Utils.strictly<{ foo: 1; bar: 2 }, { foo: 1 }>,
				{ foo: 1 } & { foo: 1; bar: never }
			>,
		]
	>;
	z.util.assertIs<tests>(true);
});

test('test allOrNone type util', () => {
	type tests = trueTuple<
		[
			Utils.equal<
				Utils.allOrNone<{ foo: 1; bar: 2 } | { baz: 3 }>,
				| { foo: 1; bar: 2 }
				| { foo?: never; bar?: never }
				| { baz: 3 }
				| { baz?: never }
			>,
		]
	>;
	z.util.assertIs<tests>(true);
});

test('test makeUndefinedOptional type util', () => {
	type tests = trueTuple<
		[
			Utils.equal<Utils.makeUndefinedOptional<{ x: 1 }>, { x: 1 }>,
			Utils.equal<
				Utils.makeUndefinedOptional<{ x: 1; y: undefined; z?: 1 }>,
				{ x: 1; y?: undefined; z?: 1 }
			>,
		]
	>;
	z.util.assertIs<tests>(true);
});

test('test removeIndexSignature type util', () => {
	type tests = trueTuple<
		[
			Utils.equal<
				Utils.removeIndexSignature<{ x: 1; [x: PropertyKey]: number }>,
				{ x: 1 }
			>,
			Utils.equal<Utils.removeIndexSignature<{ x: 1 }>, { x: 1 }>,
		]
	>;
	z.util.assertIs<tests>(true);
});

test('test distributiveOmit type util', () => {
	type tests = trueTuple<
		[
			Utils.equal<
				Utils.distributiveOmit<{ x: 1; y: 2 } | { z: 3 }, 'y'>,
				{ x: 1 } | { z: 3 }
			>,
		]
	>;
	z.util.assertIs<tests>(true);
});

test('test stringToUnion type util', () => {
	type tests = trueTuple<
		[
			Utils.equal<Utils.stringToUnion<'1'>, '1'>,
			Utils.equal<Utils.stringToUnion<'hello'>, 'h' | 'e' | 'l' | 'o'>,
			Utils.equal<
				Utils.stringToUnion<'coronavirus'>,
				'c' | 'o' | 'r' | 'n' | 'a' | 'v' | 'i' | 'u' | 's'
			>,
		]
	>;
	z.util.assertIs<tests>(true);
});

test('test unionToIntersection type util', () => {
	type tests = trueTuple<
		[
			Utils.equal<
				Utils.unionToIntersection<'foo' | 42 | true>,
				'foo' & 42 & true
			>,
			Utils.equal<
				Utils.unionToIntersection<(() => 'foo') | ((i: 42) => true)>,
				(() => 'foo') & ((i: 42) => true)
			>,
		]
	>;
	z.util.assertIs<tests>(true);
});

test('test unionToSingleTuple type util', () => {
	type tests = trueTuple<
		[
			Utils.equal<
				Utils.unionToSingleTuple<'foo' | 42 | true>,
				['foo' | 42 | true, 'foo' | 42 | true, 'foo' | 42 | true]
			>,
			Utils.equal<
				Utils.unionToSingleTuple<(() => 'foo') | ((i: 42) => true)>,
				[(() => 'foo') | ((i: 42) => true), (() => 'foo') | ((i: 42) => true)]
			>,
		]
	>;
	z.util.assertIs<tests>(true);
});

test('test deepMerge type util', () => {
	type tests = trueTuple<
		[
			Utils.equal<
				Utils.deepMerge<
					{ a: { b: 1; c: 2 }; c: 2 },
					{ a: { b: 11; d: 33 }; c: 1 }
				>,
				{ a: { b: 11; c: 2; d: 33 }; c: 1 }
			>,
		]
	>;
	z.util.assertIs<tests>(true);
});

test('test unionToTuples type util', () => {
	type tests = trueTuple<
		[
			Utils.equal<Utils.unionToTuples<never>, []>,
			Utils.equal<
				Utils.unionToTuples<1 | 2 | 3>,
				[1, 2, 3] | [1, 3, 2] | [2, 1, 3] | [2, 3, 1] | [3, 1, 2] | [3, 2, 1]
			>,
		]
	>;
	z.util.assertIs<tests>(true);
});

test('test nullableKeys type util', () => {
	type tests = trueTuple<
		[
			Utils.equal<Utils.nullableKeys<{ foo: 1 }>, { foo: 1 | null }>,
			Utils.equal<
				Utils.nullableKeys<{ foo: 1; bar: 2 }, 'foo'>,
				{ foo: 1 | null; bar: 2 }
			>,
			Utils.equal<
				Utils.nullableKeys<{ foo: 1; bar?: 2 | 3; baz: 4 | null }>,
				{ foo: 1 | null; bar?: 2 | 3 | null; baz: 4 | null }
			>,
		]
	>;
	z.util.assertIs<tests>(true);
});
