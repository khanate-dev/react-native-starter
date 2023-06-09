import { z } from 'zod';

import { createSchema, emailSchema, jwtSchema } from 'helpers/schema';

import { FormSchema } from '..';

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

export const loggedInUserSchema = userSchema.extend({
	token: jwtSchema,
});

export type LoggedInUser = z.infer<typeof loggedInUserSchema>;

export const loginSchema = userSchema.pick({ email: true, password: true });

export type Login = z.infer<typeof loginSchema>;

export const loginFormSchema = new FormSchema({
	email: {
		zod: loginSchema.shape.email,
		type: 'email',
	},
	password: {
		zod: loginSchema.shape.password,
		type: 'password',
	},
});

const forgotPasswordSchema = userSchema
	.pick({ email: true, password: true })
	.extend({
		code: z.number().int().min(0).max(999999),
		confirmPassword: userSchema.shape.password,
	});

export type ForgotPassword = z.infer<typeof forgotPasswordSchema>;

export const forgotPasswordFormSchema = new FormSchema({
	email: {
		zod: forgotPasswordSchema.shape.email,
		type: 'email',
	},
	code: {
		zod: forgotPasswordSchema.shape.code,
		type: 'int',
		label: 'Reset Code',
	},
	password: {
		zod: forgotPasswordSchema.shape.password,
		type: 'password',
	},
	confirmPassword: {
		zod: forgotPasswordSchema.shape.confirmPassword,
		type: 'password',
		label: 'Confirm Password',
	},
});
