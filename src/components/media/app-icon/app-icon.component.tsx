// eslint-disable-next-line no-restricted-imports
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

// eslint-disable-next-line no-restricted-imports
import type { Icon as IconType } from '@expo/vector-icons/build/createIconSet';

type map = typeof Icon extends IconType<infer T, any> ? T : never;

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
} as const satisfies Record<string, map>;

export type AppIconName = keyof typeof appIconMap;

type GetConstructorParams<T> = T extends new (...args: infer I) => any
	? I
	: never;

export type AppIconProps = Omit<
	GetConstructorParams<typeof Icon>[0],
	'name'
> & {
	name: AppIconName;
};

export const AppIcon = ({ name: mapName, ...props }: AppIconProps) => {
	const name = appIconMap[mapName];
	return (
		<Icon
			name={name}
			{...props}
		/>
	);
};
