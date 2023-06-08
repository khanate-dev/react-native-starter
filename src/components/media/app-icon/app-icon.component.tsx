/* eslint-disable no-restricted-imports */
import Icon from '@expo/vector-icons/MaterialIcons';

import type map from '@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/MaterialIcons.json';

type Map = keyof typeof map;

export const materialIconMap = {
	'error-triangle': 'report-problem',
	logout: 'power-settings-new',
	'user-account': 'account-circle',
	'light-mode': 'wb-sunny',
	'dark-mode': 'nightlight-round',
	'arrow-back': 'arrow-back',
	visible: 'visibility',
	hidden: 'visibility-off',
	notifications: 'notifications-active',
	'error-circle': 'error-outline',
	'success-circle': 'check-circle-outline',
	email: 'email',
	'email-at': 'alternate-email',
	phone: 'phone',
	number: 'tag',
	password: 'vpn-key',
	text: 'title',
	search: 'search',
	date: 'date-range',
	time: 'schedule',
} as const satisfies Record<string, Map>;

export type AppIconName = keyof typeof materialIconMap;

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
	const name = materialIconMap[mapName];
	return (
		<Icon
			name={name}
			{...props}
		/>
	);
};
