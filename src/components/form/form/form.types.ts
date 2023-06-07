import type { FormButtonProps } from 'components/form/form-button';
import type { FormState, SchemaField, SchemaFields } from 'types/form';
import type { App } from 'types/app';

export type FormProps<
	Keys extends string,
	Fields extends SchemaFields<Keys>
> = App.PropsWithStyle<{
	/** the input fields object to use for the form */
	fields: Fields;

	/** the default values for form inputs */
	defaultValues?: null | Partial<FormState<keyof Fields>>;

	/**
	 * the function to call when the submit button is pressed.
	 *
	 * return a string from the promise to show as a success message
	 */
	onSubmit: (state: FormState<keyof Fields>) => Promise<void | string>;

	/** the function to call when an input's value changes */
	onInputChange?: (
		name: Keys,
		field: SchemaField<Keys>,
		newValue: string,
		state: FormState<keyof Fields>
	) => void;

	/** the label of the submit button */
	submitLabel?: string | ((isSubmitting: boolean) => string);

	/** the icon to show on the submit button */
	submitIcon?: string;

	/** the props to pass to the submit button */
	submitProps?: Partial<FormButtonProps>;

	/** should the form fields and submit button show icons? */
	hasIcons?: boolean;

	/** is the form page busy? */
	isBusy?: boolean | ((state: FormState<keyof Fields>) => boolean);

	/** should the form submission be disabled? */
	disabled?: boolean | ((state: FormState<keyof Fields>) => boolean);
}>;
