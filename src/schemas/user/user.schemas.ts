import { z } from 'zod';

import { createSchema, emailSchema, jwtSchema } from 'helpers/schema';

const passwordSchema = z
	.string()
	.min(4, 'Password must be at least 8 characters long');

export const [userSansMetaSchema, userSchema] = createSchema({
	email: emailSchema,
	name: z.string(),
	password: passwordSchema,
});

export type UserSansMeta = z.infer<typeof userSansMetaSchema>;

export type User = z.infer<typeof userSchema>;

export const loggedInUserSchema = userSchema.extend({ token: jwtSchema });

export type LoggedInUser = z.infer<typeof loggedInUserSchema>;
