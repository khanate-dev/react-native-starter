export const FORM_ERRORS = {
	string: 'Must Be Valid Text Value',
	email: 'Email Address Is Not Valid',
	password: 'Password Must Be At Least 4 Characters',
	int: 'Must Be A Valid Integer',
	decimal: 'Must Be A Valid Decimal Number',
	phone: 'Phone Number Is Invalid',
	search: 'Search Must Be Valid Text',
	date: 'Must Be A Valid Date',
	empty: 'Can Not Be Empty!',
};

export class AuthError extends Error {
	type = 'auth-error';
}

export class ApiError extends Error {
	type = 'api-error';
}

export class ConnectionError extends Error {
	type = 'connection-error';
}

/**
 * @description
 * This function is used to get the error message from the error object.
 *
 * - If the error is an instance of `Error`, it will return the error message.
 * - If the error is an `object`, it will return the stringified version of the object.
 * - If the error is a `string`, it will return the string.
 * - If the error is anything else, it will return the stringified version of the error.
 * @param error
 */
export const stringifyError = (error: unknown): string => {
	if (error instanceof Error) return error.message;
	if (typeof error === 'object') return JSON.stringify(error);
	return String(error);
};
