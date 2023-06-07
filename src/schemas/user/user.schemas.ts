import { z } from 'zod';

import { createSchema, createSchemaFields, jwtSchema } from 'helpers/schema';

const passwordSchema = z
	.string()
	.min(4, 'Password must be at least 8 characters long');

export const [userSansMetaSchema, userSchema] = createSchema({
	email: z.string().email(),
	name: z.string(),
	password: passwordSchema,
});

export type UserSansMeta = z.infer<typeof userSansMetaSchema>;

export type User = z.infer<typeof userSchema>;

export const loginSchema = userSchema.pick({
	email: true,
	password: true,
});

export const loggedInUserSchema = userSchema.extend({
	token: jwtSchema,
});

export type LoggedInUser = z.infer<typeof loggedInUserSchema>;

export type Login = z.infer<typeof loginSchema>;

export const [loginFields, loginFormSchema] = createSchemaFields(loginSchema, {
	email: { type: 'email' },
	password: { type: 'password' },
});
export type LoginField = keyof typeof loginFields;

const [baseForgotPasswordSchema] = createSchema({
	email: z.string().email(),
	code: z.preprocess(
		(value) =>
			Number(
				z
					.string()
					.regex(/[0-9]{6}/u, 'Invalid Code')
					.parse(String(value))
			),
		z.number()
	),
	password: passwordSchema,
	confirmPassword: passwordSchema,
});

export const forgotPasswordSchema = baseForgotPasswordSchema.refine(
	(state) => state.password === state.confirmPassword,
	'The two passwords must match'
);

export const [forgotPasswordFields] = createSchemaFields(
	baseForgotPasswordSchema,
	{
		email: {
			type: 'email',
		},
		code: {
			type: 'int',
			label: 'Reset Code',
		},
		password: {
			type: 'password',
		},
		confirmPassword: {
			type: 'password',
		},
	}
);

export type ForgotPassword = z.infer<typeof forgotPasswordSchema>;
