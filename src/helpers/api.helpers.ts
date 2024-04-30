import { getNetworkStateAsync } from 'expo-network';
import { z } from 'zod';

import { config } from '../config.ts';
import { AuthError, stringifyError } from '../errors.ts';
import { authStore, getUserOrThrowAuthError } from '../hooks/auth.hook.tsx';

import type { Utils } from '../types/utils.types.ts';

const responseSchema = z.object({
	statusCode: z.number(),
	error: z.string(),
	message: z.string(),
	data: z.unknown().optional(),
});

type ApiMethod = 'GET' | 'PATCH' | 'PUT' | 'POST' | 'DELETE';

type ApiBody = object | FormData | null;

interface BaseApiOpts {
	body?: ApiBody;
	noAuth?: boolean;
	tokenOverride?: string;
}

interface ApiRequestOpts<Schema extends z.ZodSchema> extends BaseApiOpts {
	schema?: Schema;
}

const apiRequest = async <Schema extends z.ZodSchema = z.ZodVoid>(
	apiPath: string,
	method: ApiMethod,
	opts?: ApiRequestOpts<Schema>,
): Promise<Schema['_output']> => {
	try {
		if (!config.enableMocks) {
			const { isInternetReachable } = await getNetworkStateAsync();
			if (!isInternetReachable)
				throw new Error('not connected to the internet!');
		}

		const fetchOpts: Omit<RequestInit, 'headers'> & { headers: Headers } = {
			method,
			headers: new Headers(),
		};

		if (!opts?.noAuth && !config.disableAuth) {
			const token = opts?.tokenOverride ?? getUserOrThrowAuthError().Token;
			fetchOpts.headers.set('Authorization', `Bearer ${token}`);
		}

		const body = opts?.body;
		if (body && !(body instanceof FormData)) {
			fetchOpts.body = JSON.stringify(body);
			fetchOpts.headers.set('Content-Type', 'application/json');
		} else {
			fetchOpts.body = body ?? null;
		}

		const response = await fetch(`${config.backendPath}/${apiPath}`, fetchOpts);
		if (response.status === 401) throw new AuthError('login expired!');

		const result = responseSchema.safeParse(await response.json());
		if (!result.success) throw new Error('invalid api response format!');
		const { statusCode, message, data } = result.data;
		if (statusCode !== 200) throw new Error(message);
		else if (!response.ok) throw new Error('Unknown api error');
		if (opts?.schema) return opts.schema.parse(data) as never;
		// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
		return z.void().parse(data) as never;
	} catch (error) {
		if (error instanceof AuthError) authStore.remove();
		throw error;
	}
};

export const getRequest = async <Schema extends z.ZodSchema = z.ZodVoid>(
	apiPath: string,
	opts?: ApiRequestOpts<Schema>,
): Promise<Schema['_output']> => {
	return await apiRequest(apiPath, 'GET', opts);
};

export const putRequest = async <Schema extends z.ZodSchema = z.ZodVoid>(
	apiPath: string,
	opts?: ApiRequestOpts<Schema>,
): Promise<Schema['_output']> => {
	return (await apiRequest(apiPath, 'PUT', opts)) as never;
};

export const postRequest = async <Schema extends z.ZodSchema = z.ZodVoid>(
	apiPath: string,
	opts?: ApiRequestOpts<Schema>,
): Promise<Schema['_output']> => {
	return (await apiRequest(apiPath, 'POST', opts)) as never;
};

export const deleteRequest = async <Schema extends z.ZodSchema = z.ZodVoid>(
	apiPath: string,
	opts?: ApiRequestOpts<Schema>,
): Promise<Schema['_output']> => {
	return (await apiRequest(apiPath, 'DELETE', opts)) as never;
};

export type BulkResponse<Type extends object> = {
	successful: Type[];
	failed: Utils.prettify<Type & { error: string }>[];
};

interface BulkRequestDetails extends BaseApiOpts {
	path: string;
	method: Exclude<ApiMethod, 'GET'>;
}

type BulkRequestOpts<Type extends object> = {
	data: Type[];
	details: BulkRequestDetails | ((row: Type) => BulkRequestDetails);
};

export const bulkRequest = async <Type extends object>({
	data,
	details,
}: BulkRequestOpts<Type>) => {
	const response: BulkResponse<Type> = {
		successful: [],
		failed: [],
	};
	await Promise.all(
		data.map(async (row) => {
			const opts =
				typeof details === 'function'
					? details(row)
					: { ...details, body: row };
			await apiRequest(opts.path, opts.method, opts)
				.then(() => response.successful.push(row as never))
				.catch((error: unknown) =>
					response.failed.push({
						...row,
						error: stringifyError(error),
					}),
				);
		}),
	);
	return response;
};
