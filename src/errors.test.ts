import { AuthError, stringifyError } from './errors.ts';

test('testing AuthError', () => {
	const error = new AuthError('error message');
	expect(error).toBeInstanceOf(Error);
	expect(error.type).toBe('auth-error');
	expect(error.message).toBe('error message');
	expect(stringifyError(error)).toBe('error message');
});

test('testing stringifyError', () => {
	expect(stringifyError(new Error('error message'))).toBe('error message');
	expect(stringifyError(new Error(''))).toBe('');
	expect(stringifyError({})).toBe(JSON.stringify({}));
	expect(stringifyError('string')).toBe('string');
	expect(stringifyError(123)).toBe('123');
	expect(stringifyError(null)).toBe('null');
	expect(stringifyError(undefined)).toBe('undefined');
	expect(stringifyError(true)).toBe('true');
	expect(stringifyError(false)).toBe('false');
	expect(stringifyError(NaN)).toBe('NaN');
});
