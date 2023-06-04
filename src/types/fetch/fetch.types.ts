import { GenericObject } from 'types/general';

export interface FetchBaseOptions extends Omit<RequestInit, 'body'> {
	method?: 'GET' | 'PUT' | 'PATCH' | 'DELETE' | 'POST',
	/** should the authorization headers be sent? */
	noAuth?: boolean,
	body?: GenericObject | GenericObject[] | FormData,
}

export interface FetchNoBodyOptions extends FetchBaseOptions {
	method?: 'GET' | 'DELETE',
	body?: undefined,
}

export interface FetchBodyOptions extends FetchBaseOptions {
	method: 'PUT' | 'PATCH' | 'POST',
	body: FetchBaseOptions['body'],
}

export type FetchOptions = FetchNoBodyOptions | FetchBodyOptions;

export type FetchResponse = GenericObject | GenericObject[];

export type ApiErrorType = 'ApiAuthError' | 'ApiResponseError' | 'ApiError' | 'ApiConnectionError' | 'InternetConnectionError';
