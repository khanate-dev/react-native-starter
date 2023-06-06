import { forwardRef } from 'react';
import { Datepicker, Icon } from '@ui-kitten/components';

import { getDateOrNull } from 'helpers/date';

import { formDatePickerStyles as styles } from './FormDatePicker.styles';

import type { FormDatePickerProps } from './FormDatePicker.types';

export const FormDatePicker = forwardRef<Datepicker, FormDatePickerProps>(
	(
		{
			style,
			value,
			error,
			onChange,
			size,
			status,
			hasIcon,
			noCaption,
			noMargin,
			...datePickerProps
		},
		ref
	) => {
		return (
			<Datepicker
				ref={ref}
				{...datePickerProps}
				date={getDateOrNull(value) ?? undefined}
				boundingMonth={false}
				caption={!noCaption ? error : undefined}
				size={size ?? 'large'}
				status={error ? 'danger' : status}
				style={[styles.input, !noMargin && styles.bottomMargin, style]}
				accessoryLeft={
					hasIcon
						? (props) => (
								<Icon
									{...props}
									name='calendar-outline'
								/>
						  )
						: undefined
				}
				accessoryRight={(props) => (
					<Icon
						{...props}
						name='calendar-outline'
					/>
				)}
				onSelect={(date) => onChange(date.toISOString())}
			/>
		);
	}
);
