import { z } from 'zod';

import {
	assert,
	assertArray,
	assertObject,
	isArray,
	isObject,
	readableTypeOf,
} from './type.helpers.ts';

const isNumber = (value: unknown): value is number => typeof value === 'number';

test('should test readableTypeof helper', () => {
	expect(readableTypeOf(2)).toBe('number');
	expect(readableTypeOf('2')).toBe('string');
	expect(readableTypeOf(BigInt(2))).toBe('bigint');
	expect(readableTypeOf(Symbol(2))).toBe('symbol');
	expect(readableTypeOf(true)).toBe('boolean');
	expect(readableTypeOf(undefined)).toBe('undefined');
	expect(readableTypeOf({})).toBe('object');
	expect(readableTypeOf([2])).toBe('array');
	expect(readableTypeOf(null)).toBe('null');
	expect(readableTypeOf(() => false)).toBe('function');
});

test('should test assert helper', () => {
	const error = 'invalid object!';
	expect(() => {
		const a: unknown = 2;
		z.util.assertIs<unknown>(a);
		assert(isObject(a), error);
		z.util.assertIs<object>(a);
	}).toThrow(error);
	expect(() => {
		const a: unknown = { fist: 'of fury' };
		z.util.assertIs<unknown>(a);
		assert(isObject(a), error);
		z.util.assertIs<object>(a);
	}).not.toThrow();
});

test('should test isObject helper', () => {
	expect(isObject(2)).toBeFalsy();
	expect(isObject({ fist: 'of fury' })).toBeTruthy();
	const a: unknown = 2;
	isObject(a) && z.util.assertIs<object>(a);
});

test('should test isArray helper', () => {
	expect(isArray(2)).toBeFalsy();
	expect(isArray([2])).toBeTruthy();
	expect(isArray([2], isObject)).toBeFalsy();
	expect(isArray([2], isNumber)).toBeTruthy();
	expect(isArray({ fist: 'of fury' })).toBeFalsy();
	expect(isArray([{ fist: 'of fury' }])).toBeTruthy();
	const a: unknown = 2;
	isArray(a) && z.util.assertIs<unknown[]>(a);
	isArray(a, isNumber) && z.util.assertIs<number[]>(a);
	isArray(a, isObject) && z.util.assertIs<object[]>(a);
});

test('should test assertObject helper', () => {
	let a: unknown = 2;
	expect(() => {
		assertObject(a);
		z.util.assertIs<object>(a);
	}).toThrow('Expected object, received number');
	expect(() => {
		a = { fist: 'of fury' };
		assertObject(a);
		z.util.assertIs<object>(a);
	}).not.toThrow();
	expect(() => {
		assertObject({ fist: 'of fury' });
	}).not.toThrow();
});

test('should test assertArray helper', () => {
	let a: unknown = 2;
	expect(() => {
		a = 2;
		assertArray(a);
		z.util.assertIs<unknown[]>(a);
	}).toThrow('Invalid array type');
	expect(() => {
		a = [2];
		assertArray(a);
		z.util.assertIs<unknown[]>(a);
	}).not.toThrow();
	expect(() => {
		a = [2, 3];
		assertArray(a, isObject);
		z.util.assertIs<object[]>(a);
	}).toThrow('Invalid array type');
	expect(() => {
		a = [2];
		assertArray(a, isNumber);
		z.util.assertIs<number[]>(a);
	}).not.toThrow();
	expect(() => {
		a = { fist: 'of fury' };
		assertArray(a);
		z.util.assertIs<unknown[]>(a);
	}).toThrow('Invalid array type');
	expect(() => {
		a = [[2]];
		assertArray(a, isArray);
		z.util.assertIs<unknown[][]>(a);
	}).not.toThrow();
});
