import { forwardRef } from 'react';
import { View } from 'react-native';
import { Button, Icon, Spinner, useTheme } from '@ui-kitten/components';
import { isSmallerScreen } from 'src/config';

import { getFormButtonStyles as getStyles } from './FormButton.styles';

import type {
	FormButtonAccessoryLeftProps,
	FormButtonProps,
} from './FormButton.types';
import type { ImageStyle } from 'react-native';

const FormButtonAccessoryLeft = ({
	iconLeft,
	isLoading,
	props,
}: FormButtonAccessoryLeftProps) => {
	if (isLoading) {
		return (
			<View style={props?.style}>
				<Spinner
					status='control'
					size='small'
				/>
			</View>
		);
	}

	return (
		<Icon
			{...props}
			name={iconLeft ?? 'radio-button-off-outline'}
		/>
	);
};

export const FormButton = forwardRef<Button, FormButtonProps>(
	(
		{
			label,
			iconLeft,
			status = 'primary',
			appearance = 'filled',
			size = isSmallerScreen ? 'medium' : 'large',
			noMargin,
			hasBorder,
			borders,
			isLoading,
			disabled,
			elevated,
			...parentProps
		},
		ref
	) => {
		const theme = useTheme();
		const styles = getStyles(
			theme,
			borders,
			hasBorder || appearance === 'outline',
			noMargin,
			elevated
		);

		return (
			<Button
				{...parentProps}
				ref={ref}
				appearance={appearance}
				size={size}
				status={status}
				disabled={disabled || isLoading}
				style={[
					styles.button,
					(disabled || isLoading) && styles.disabled,
					parentProps.style,
				]}
				accessoryLeft={
					iconLeft || isLoading
						? (props) => (
								<FormButtonAccessoryLeft
									{...{
										iconLeft,
										isLoading,
										props: {
											...props,
											style: [props?.style, styles.icon as ImageStyle],
										},
									}}
								/>
						  )
						: undefined
				}
			>
				{label}
			</Button>
		);
	}
);
