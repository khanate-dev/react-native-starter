import type { z } from 'zod';
import type { FormInputProps } from 'components/form/FormInput';

export type FormState<Keys extends PropertyKey> = Record<Keys, string>;

export type FormErrors<Keys extends PropertyKey> = Partial<
	Record<Keys, string>
>;

export type FormInputSchemaMap = {
	string: z.ZodString;
	int: z.ZodNumber;
	float: z.ZodNumber;
	email: z.ZodString;
	password: z.ZodString;
	phone: z.ZodString;
	search: z.ZodString;
	date: z.ZodString;
};

type StringSchemaType = Exclude<FormInputProps['type'], 'int' | 'float'>;

type NumberSchemaType = 'int' | 'float';

export type BaseSchemaField<Key extends PropertyKey> = {
	type: StringSchemaType | NumberSchemaType;
	nullable?: boolean;
	label?: string;
	hasIcon?: boolean;
	button?: FormInputProps['button'];
	dependsOn?: Key;
	inputProps?: Omit<
		FormInputProps,
		'type' | 'value' | 'error' | 'onChange' | 'button' | 'isLast'
	>;
};

export type StringSchemaField<
	Key extends PropertyKey,
	Type extends StringSchemaType = StringSchemaType
> = {
	type: Type;
} & BaseSchemaField<Key>;

export type NumberSchemaField<
	Key extends PropertyKey,
	Type extends NumberSchemaType = NumberSchemaType
> = {
	type: Type;
} & BaseSchemaField<Key>;

export type SchemaField<Key extends PropertyKey> =
	| StringSchemaField<Key>
	| NumberSchemaField<Key>;

export type SchemaFields<Schema extends PropertyKey> = Record<
	Schema,
	SchemaField<Schema>
>;
