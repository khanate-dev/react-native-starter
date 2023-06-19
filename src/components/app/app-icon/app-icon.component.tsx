// eslint-disable-next-line no-restricted-imports
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { z } from 'zod';

// eslint-disable-next-line no-restricted-imports
import type {
	Icon as Type,
	IconProps,
} from '@expo/vector-icons/build/createIconSet';

type map = typeof Icon extends Type<infer T, any> ? T : never;

export const appIconMap = {
	logout: 'power',
	'user-account': 'account-circle-outline',
	'light-mode': 'white-balance-sunny',
	'dark-mode': 'weather-night',
	'arrow-back': 'arrow-left-circle-outline',
	'arrow-next': 'arrow-right-circle-outline',
	'arrow-up': 'arrow-up-circle-outline',
	'arrow-down': 'arrow-down-circle-outline',
	visible: 'eye-outline',
	hidden: 'eye-off-outline',
	notifications: 'bell-ring-outline',
	error: 'alert-circle-outline',
	success: 'check-circle-outline',
	info: 'information-outline',
	warning: 'alert-circle-outline',
	email: 'email-outline',
	'email-at': 'at',
	phone: 'phone',
	number: 'numeric',
	password: 'form-textbox-password',
	text: 'format-text-variant',
	search: 'magnify',
	date: 'calendar-month',
	time: 'clock-time-four-outline',
	close: 'close-circle-outline',
	submit: 'arrow-up-circle-outline',
	check: 'check-all',
	restore: 'history',
	language: 'translate',
	unchecked: 'check-circle-outline',
	checked: 'check-circle',
} as const;

type _ =
	//   ^?
	keyof {
		[k in keyof typeof appIconMap as (typeof appIconMap)[k] extends map
			? never
			: k]: true;
	};

z.util.assertEqual<_, never>(true);

export type AppIconName = keyof typeof appIconMap;

export type AppIconProps = Omit<IconProps<any>, 'name'> & {
	name: AppIconName;
};

export const AppIcon = ({ name: mapName, ...props }: AppIconProps) => {
	const name = appIconMap[mapName];
	return (
		<Icon
			name={name as never}
			{...props}
		/>
	);
};
