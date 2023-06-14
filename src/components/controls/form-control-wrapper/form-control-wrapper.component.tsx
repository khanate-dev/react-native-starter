import { View } from 'react-native';
import { HelperText } from 'react-native-paper';

import type { PropsWithChildren } from 'react';
import type { App } from 'types/app';

export type FormControlWrapperProps = PropsWithChildren<
	App.PropsWithStyle<{
		/** the error message to show beneath the input */
		error?: string;

		/** the caption to show beneath the input */
		caption?: string;

		/** is the form control disabled? */
		disabled?: boolean;
	}>
>;

export const FormControlWrapper = ({
	style,
	error,
	caption,
	disabled,
	children,
}: FormControlWrapperProps) => {
	return (
		<View style={style}>
			{children}
			<HelperText
				type={error ? 'error' : 'info'}
				visible={Boolean(error || caption)}
				disabled={disabled}
			>
				{error || caption}
			</HelperText>
		</View>
	);
};
