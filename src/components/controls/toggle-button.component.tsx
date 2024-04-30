import { View } from 'react-native';

import { Button } from './button.component.tsx';

import { humanizeToken } from '../../helpers/humanize-token.helpers.ts';
import { omit } from '../../helpers/object.helpers.ts';
import { useTheme } from '../../hooks/theme.hook.tsx';

import type { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import type { Utils } from '../../types/utils.types.ts';
import type { ButtonProps } from './button.component.tsx';

export type ToggleButtonObjectOption<Value extends string> = Utils.prettify<
	Omit<ButtonProps, 'onPress' | 'mode' | 'label'> & {
		label: string;
		value: Value;
	}
>;

export type ToggleButtonProps<Opt extends string> = Omit<
	ViewProps,
	'options' | 'onChange' | 'value' | 'children'
> & {
	/** the options to toggle between */
	options: ReadonlyArray<Opt | ToggleButtonObjectOption<Opt>>;

	/** the currently selected option */
	value: null | NoInfer<Opt>;

	/** the function to call when the selected option changes */
	onChange: (value: NoInfer<Opt>) => void;
};

export const ToggleButton = <const Opt extends string>({
	options,
	value,
	onChange,
	...viewProps
}: ToggleButtonProps<Opt>) => {
	const theme = useTheme();
	return (
		<View
			{...viewProps}
			style={[theme.styles.view.row, viewProps.style]}
		>
			{options.map((option, idx) => {
				const isObj = typeof option === 'object';
				const label = isObj ? option.label : humanizeToken(option);
				const currValue = isObj ? option.value : option;
				const props = isObj ? omit(option, 'label', 'value') : {};

				return (
					<Button
						{...props}
						key={idx}
						label={label}
						mode={value === currValue ? 'contained' : 'contained-tonal'}
						labelStyle={{ textTransform: 'capitalize' }}
						style={{
							borderTopLeftRadius: idx === 0 ? undefined : 0,
							borderBottomLeftRadius: idx === 0 ? undefined : 0,
							borderTopRightRadius: idx === options.length - 1 ? undefined : 0,
							borderBottomRightRadius:
								idx === options.length - 1 ? undefined : 0,
						}}
						onPress={() => {
							onChange(currValue);
						}}
					/>
				);
			})}
		</View>
	);
};
