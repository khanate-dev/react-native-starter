import { z } from 'zod';

import { humanizeToken } from 'helpers/string';

import type { ZodDate, ZodEmail, ZodPhone, ZodTime } from 'helpers/schema';
import type { Utils } from 'types/utils';

type schemaMap = {
	string: z.ZodString | z.ZodNullable<z.ZodString>;
	password: z.ZodString | z.ZodNullable<z.ZodString>;
	search: z.ZodString | z.ZodNullable<z.ZodString>;
	email: ZodEmail | z.ZodNullable<ZodEmail>;
	phone: ZodPhone | z.ZodNullable<ZodPhone>;
	int: z.ZodNumber | z.ZodNullable<z.ZodNumber>;
	float: z.ZodNumber | z.ZodNullable<z.ZodNumber>;
	boolean: z.ZodBoolean | z.ZodNullable<z.ZodBoolean>;
	date: ZodDate | z.ZodNullable<ZodDate>;
	time: ZodTime | z.ZodNullable<ZodTime>;
};

export type SchemaFieldType = keyof schemaMap;

type equal<T, U> = (<G>(x: G) => G extends T ? 1 : 2) extends <G>(
	x: G
) => G extends U ? 1 : 2
	? true
	: false;

type matchInUnion<
	T extends z.ZodSchema,
	Union
> = Union extends infer U extends z.ZodSchema
	? equal<z.infer<T>, z.infer<U>>
	: never;

export type FormSchemaField<Zod extends schemaMap[keyof schemaMap]> = {
	/** the zod schema for the field */
	zod: Zod;

	/** the type of the schema field */
	type: keyof {
		[k in keyof schemaMap as matchInUnion<Zod, schemaMap[k]> extends false
			? never
			: k]: true;
	};

	/** label of the field */
	label?: string;

	/** is this field unavailable in update form? */
	noUpdate?: boolean;

	/** can the field's value be null?  */
	notRequired?: boolean;
} & (Zod extends z.ZodNullable<any>
	? { notRequired: true }
	: { notRequired?: false });

export type FormSchemaWorkingObj<
	T extends Record<string, schemaMap[SchemaFieldType]>
> = Utils.prettify<{
	[k in keyof T]: T[k] extends schemaMap['int'] | schemaMap['float']
		? string
		: T[k] extends schemaMap['boolean']
		? boolean
		: T[k] extends schemaMap['date'] | schemaMap['time']
		? z.infer<T[k]> | null
		: string;
}>;

const transformSchema = <T extends z.ZodSchema, D extends boolean>(
	input: T,
	isDefault?: D
): D extends true ? z.ZodCatch<T> : T => {
	let zod;
	let def = null;
	if (input instanceof z.ZodString) {
		zod = input.trim();
		def = '';
	} else if (input instanceof z.ZodNumber) {
		const coerceSchema = isDefault
			? z.coerce.number().catch(0)
			: z.coerce.number();
		zod = z.preprocess((val) => coerceSchema.parse(val), input);
		def = 0;
	} else if (input instanceof z.ZodNullable) {
		const unwrapped = input.unwrap() as z.ZodSchema;
		if (unwrapped instanceof z.ZodString) {
			zod = unwrapped.trim().nullable();
			def = '';
		} else if (unwrapped instanceof z.ZodNumber) {
			const coerceSchema = isDefault
				? z.coerce.number().catch(0)
				: z.coerce.number();
			zod = z
				.preprocess((val) => coerceSchema.parse(val), unwrapped)
				.nullable();
			def = 0;
		} else {
			zod = input;
			if (unwrapped instanceof z.ZodBoolean) def = false;
		}
	} else {
		zod = input;
		if (input instanceof z.ZodBoolean) def = false;
	}
	if (!isDefault) return zod as never;
	return (zod as z.ZodSchema).catch(def) as never;
};

export class FormSchema<T extends Record<string, schemaMap[SchemaFieldType]>> {
	/** the zod schema for the form */
	zod: z.ZodObject<{ [k in keyof T]: T[k] }, 'strict', z.ZodUndefined>;

	/** the zod schema to get the default state object */
	defaultZod: z.ZodObject<
		{ [k in keyof T]: z.ZodCatch<T[k]> },
		'strip',
		z.ZodUndefined
	>;

	/** list of schema fields */
	fields: {
		[k in keyof T]: T[k] & {
			/** the name of the field */
			name: k;
			label: string;
		};
	};

	/** the schema's fields in an array */
	fieldsArray: (typeof this.fields)[keyof typeof this.fields][];

	/** the default object for the schema */
	defaultValues: FormSchemaWorkingObj<T>;

	constructor(fields: { [k in keyof T]: FormSchemaField<T[k]> }) {
		const zodObject = {} as { [k in keyof T]: T[k] };
		const defaultZodObject = {} as {
			[k in keyof T]: z.ZodCatch<T[k]>;
		};
		this.fields = (
			Object.entries(fields) as [keyof T, FormSchemaField<T[keyof T]>][]
		).reduce<typeof this.fields>((obj, [key, field]) => {
			const zod = transformSchema(field.zod);
			zodObject[key] = zod as never;
			defaultZodObject[key] = transformSchema(field.zod, true) as never;

			obj[key] = {
				...field,
				name: key,
				label: field.label ?? humanizeToken(String(key)),
				zod,
			} as never;
			return obj;
		}, {} as typeof this.fields);
		this.fieldsArray = Object.values(this.fields);
		this.zod = z.strictObject(zodObject);
		this.defaultZod = z.object(defaultZodObject).strip();
		this.defaultValues = this.defaultZod.parse({}) as never;
	}
}
