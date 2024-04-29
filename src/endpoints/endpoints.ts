import { userEndpoints, userMocks } from './user.endpoints.ts';

import { isFetchMocked } from '../config.ts';

export const endpoints = {
	user: isFetchMocked ? userMocks : userEndpoints,
};

export type Endpoints = typeof endpoints;
