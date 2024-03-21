import { z } from 'zod';

import type Component from '@expo/vector-icons/MaterialCommunityIcons';
import type { Icon as Type } from '@expo/vector-icons/build/createIconSet';

type map = typeof Component extends Type<infer T, string> ? T : never;

export const appIconMap = {
	logout: 'power',
	'user-account': 'account-circle-outline',
	'light-mode': 'white-balance-sunny',
	'dark-mode': 'weather-night',
	'system-mode': 'theme-light-dark',
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

type invalidIcons =
	//   ^?
	keyof {
		[k in keyof typeof appIconMap as (typeof appIconMap)[k] extends map
			? never
			: k]: true;
	};

z.util.assertEqual<invalidIcons, never>(true);

export type IconName = keyof typeof appIconMap;
