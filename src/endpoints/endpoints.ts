import { userEndpoints, userMocks } from './user.endpoints.js';

import { isFetchMocked } from '../config.js';

export const endpoints = {
	user: isFetchMocked ? userMocks : userEndpoints,
};

export type Endpoints = typeof endpoints;
