import { DeviceEventEmitter } from 'react-native';

import type { SetStateAction } from 'react';
import type { LoggedInUser } from '~/schemas/user';
import type { AlertModalProps } from '~/components/feedback/alert-modal';
import type { Language } from '~/i18n';

export type EventMap = {
	login: [LoggedInUser];
	logout: [];
	toggleDarkMode: [];
	updateDarkMode: [SetStateAction<boolean>];
	addAlert: [string | Error | AlertModalProps];
	removeAlert: [];
	setIsLoading: [SetStateAction<boolean> | Promise<any>];
	updateLanguage: [SetStateAction<Language>];
};

export const events = {
	emit: <T extends keyof EventMap>(event: T, ...args: EventMap[T]) => {
		DeviceEventEmitter.emit(event, ...args);
	},
	listen: <T extends keyof EventMap>(
		event: T,
		listener: (...args: EventMap[T]) => void
	) => {
		const subscription = DeviceEventEmitter.addListener(
			event,
			listener as never
		);
		return { remove: () => subscription.remove() };
	},
};
