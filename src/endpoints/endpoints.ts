import { userEndpoints, userMocks } from './user.endpoints.ts';

import { config } from '../config.ts';

export const endpoints = {
	user: config.enableMocks ? userMocks : userEndpoints,
};

export type Endpoints = typeof endpoints;
