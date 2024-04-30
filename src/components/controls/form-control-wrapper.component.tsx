import { View } from 'react-native';
import { HelperText } from 'react-native-paper';

import type { PropsWithChildren } from 'react';
import type { App } from '../../types/app.types.ts';

export type FormControlWrapperProps = PropsWithChildren<
	App.propsWithStyle<{
		/** the error message to show beneath the input */
		error?: string;

		/** the caption to show beneath the input */
		caption?: string;

		/** is the form control disabled? */
		disabled?: boolean;

		/** should the helper text only render when there is an error? */
		onlyRenderHelperOnError?: boolean;
	}>
>;

export const FormControlWrapper = ({
	style,
	error,
	caption,
	disabled,
	onlyRenderHelperOnError,
	children,
}: FormControlWrapperProps) => {
	const visible = Boolean(error || caption);
	return (
		<View style={style}>
			{children}
			{(visible || !onlyRenderHelperOnError) && (
				<HelperText
					type={error ? 'error' : 'info'}
					visible={visible}
					disabled={disabled}
				>
					{error || caption}
				</HelperText>
			)}
		</View>
	);
};
