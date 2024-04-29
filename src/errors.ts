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

export const stringifyError = (error: unknown): string => {
	if (error instanceof Error) return error.message;
	if (typeof error === 'object') return JSON.stringify(error);
	return String(error);
};
