import { z } from 'zod';
import { isDayjs } from 'dayjs';

import { JWT_REGEX, PHONE_REGEX } from 'config';
import { dayjsUtc } from 'helpers/date';

export const dbIdSchema = z.number().int().positive().finite().brand('DbKey');

export type ZodDbId = typeof dbIdSchema;

export type DbId = z.infer<ZodDbId>;

export const jwtSchema = z.string().regex(JWT_REGEX).brand('jwt');

export type ZodJwt = typeof jwtSchema;

export type Jwt = z.infer<typeof jwtSchema>;

export const emailSchema = z.string().email();

export const phoneSchema = z.string().regex(PHONE_REGEX);

export const dayjsSchema = z.instanceof(
	dayjsUtc as unknown as typeof dayjsUtc.Dayjs
);

export type ZodDayjs = typeof dayjsSchema;

export const dateSchema = z.preprocess((value) => {
	if (isDayjs(value)) return value;
	const parsed = dayjsUtc.utc(value as never);
	return parsed.isValid() ? parsed : null;
}, dayjsSchema);

export type ZodDate = typeof dateSchema;

export const timeSchema = z.preprocess(
	(value) => {
		const parsed = isDayjs(value)
			? value
			: dayjsUtc.utc(value as never, 'HH:mm');
		if (!parsed.isValid()) return null;
		return { hour: parsed.hour(), minute: parsed.minute() };
	},
	z.object({
		hours: z.number().min(0).max(23),
		minutes: z.number().min(0).max(59),
	})
);

export type ZodTime = typeof timeSchema;

export type Time = z.infer<ZodTime>;

export const gradientSchema = z.tuple([z.string(), z.string()]);

export type Gradient = z.infer<typeof gradientSchema>;

export const _localIdSchema = z
	.number()
	.int()
	.positive()
	.finite()
	.brand('_localId');

type _LocalId = z.infer<typeof _localIdSchema>;

/**
 * creates a `localId` for the next row in a list.
 * id is found by finding the last id and incrementing it by 1
 * @param list the existing list of data
 */
export const createLocalId = <T extends { _localId: _LocalId }>(
	list: T[]
): _LocalId => {
	const lastId = Math.max(
		...list.map((row) => row._localId as unknown as number),
		0
	);
	return (lastId + 1) as _LocalId;
};

type OptionalGroup<T extends Record<string, unknown>> =
	| T
	| { [K in keyof T]?: never };

export const createGroupedOptionalSchema = <
	Schema extends z.ZodObject<any, any, any, any>
>(
	schema: Schema
): z.Schema<OptionalGroup<z.infer<Schema>>> => {
	return schema.or(
		z.object(
			Object.keys(schema.shape as Record<string, unknown>).reduce(
				(acc, key) => {
					acc[key] = z.undefined();
					return acc;
				},
				{} as Record<string, z.ZodUndefined>
			)
		)
	);
};

export const dbMetaSchema = z.strictObject({
	id: dbIdSchema,
	created_at: dateSchema,
	updated_at: dateSchema,
});

export type DbMeta = z.infer<typeof dbMetaSchema>;

export const createSchema = <
	Keys extends string,
	Input extends Record<Keys, z.ZodTypeAny>
>(
	input: Input
) => {
	const schema = z.strictObject(input);
	const modelSchema = z.strictObject({
		...dbMetaSchema.shape,
		...schema.shape,
	});

	return [schema, modelSchema] as const;
};
