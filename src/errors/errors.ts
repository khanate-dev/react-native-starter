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
