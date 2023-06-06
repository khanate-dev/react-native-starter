import type { GenericObject } from 'types/general';

export type FetchBaseOptions = {
	method?: 'GET' | 'PUT' | 'PATCH' | 'DELETE' | 'POST';
	/** should the authorization headers be sent? */
	noAuth?: boolean;
	body?: GenericObject | GenericObject[] | FormData;
} & Omit<RequestInit, 'body'>;

export type FetchNoBodyOptions = {
	method?: 'GET' | 'DELETE';
	body?: undefined;
} & FetchBaseOptions;

export type FetchBodyOptions = {
	method: 'PUT' | 'PATCH' | 'POST';
	body: FetchBaseOptions['body'];
} & FetchBaseOptions;

export type FetchOptions = FetchNoBodyOptions | FetchBodyOptions;

export type FetchResponse = GenericObject | GenericObject[];

export type ApiErrorType =
	| 'ApiAuthError'
	| 'ApiResponseError'
	| 'ApiError'
	| 'ApiConnectionError'
	| 'InternetConnectionError';
