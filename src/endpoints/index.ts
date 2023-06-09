import { isFetchMocked } from '~/config';

import { userEndpoints, userMocks } from './user';

export const endpoints = {
	user: isFetchMocked ? userMocks : userEndpoints,
};

export type Endpoints = typeof endpoints;
