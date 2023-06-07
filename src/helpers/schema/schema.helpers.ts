import { z } from 'zod';
import { isDayjs } from 'dayjs';

import { CNIC_REGEX, JWT_REGEX, PHONE_REGEX } from 'config';
import { dayjsUtc } from 'helpers/date';
import { objectEntries } from 'helpers/object';

import type { SchemaField } from 'types/form';

export const dbIdSchema = z.number().int().positive().finite().brand('DbKey');

export type ZodDbId = typeof dbIdSchema;

export type DbId = z.infer<ZodDbId>;

export const jwtSchema = z.string().regex(JWT_REGEX);

export const phoneSchema = z.string().regex(PHONE_REGEX);

export const cnicSchema = z.string().regex(CNIC_REGEX);

export const dayjsSchema = z.instanceof(
	dayjsUtc as unknown as typeof dayjsUtc.Dayjs
);

export type ZodDayjs = typeof dayjsSchema;

export const datetimeSchema = z.preprocess((value) => {
	if (isDayjs(value)) return value;
	const parsed = dayjsUtc.utc(value as never);
	return parsed.isValid() ? parsed : null;
}, dayjsSchema);

export type ZodDatetime = typeof datetimeSchema;

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
	created_at: datetimeSchema,
	updated_at: datetimeSchema,
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

export const createSchemaFields = <
	Schema extends z.AnyZodObject,
	SchemaKeys extends keyof z.infer<Schema>,
	InputFields extends {
		[Key in SchemaKeys]?: SchemaField<SchemaKeys>;
	},
	Fields extends {
		[Key in keyof InputFields]: SchemaField<keyof InputFields>;
	}
>(
	schema: Schema,
	input: InputFields
) => {
	const formSchema = z.strictObject(
		objectEntries(schema.shape as Record<string, z.ZodAny>).reduce(
			(object, [name, current]) => ({
				...object,
				[name]: z.preprocess(
					(value) =>
						current.isNullable() && value !== 0 && !value
							? null
							: ['int', 'float'].includes(
									input[name as keyof InputFields]?.type ?? 'string'
							  )
							? Number(value)
							: value,
					current
				),
			}),
			{}
		)
	) as Schema;

	return [input as unknown as Fields, formSchema] as const;
};
