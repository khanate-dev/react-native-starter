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

export type ApiErrorType =
	| 'ApiAuthError'
	| 'ApiResponseError'
	| 'ApiError'
	| 'ApiConnectionError'
	| 'InternetConnectionError';

export class ApiError extends Error {
	type: ApiErrorType;
	constructor(message: string, type: ApiErrorType = 'ApiError') {
		super(message);
		this.type = type;
	}
}
