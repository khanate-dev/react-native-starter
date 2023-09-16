import { DeviceEventEmitter } from 'react-native';

import type { SetStateAction } from 'react';
import type { AlertModalProps } from '~/components/feedback/alert-modal.component';
import type { Language } from '~/i18n';
import type { LoggedInUser } from '~/schemas/user.schemas';

export type EventMap = {
	login: LoggedInUser;
	logout: undefined;
	toggleDarkMode: undefined;
	updateDarkMode: SetStateAction<boolean>;
	addAlert: string | Error | AlertModalProps;
	removeAlert: undefined;
	setIsLoading: SetStateAction<boolean> | Promise<unknown>;
	updateLanguage: SetStateAction<Language>;
};

export const events = {
	emit: <T extends keyof EventMap>(
		...args: EventMap[T] extends undefined
			? [event: T]
			: [event: T, data: EventMap[T]]
	) => {
		DeviceEventEmitter.emit(args[0], args[1]);
	},
	listen: <T extends keyof EventMap>(
		event: T,
		listener: (
			...args: EventMap[T] extends undefined ? [] : [data: EventMap[T]]
		) => void,
	) => {
		const subscription = DeviceEventEmitter.addListener(
			event,
			listener as never,
		);
		return {
			remove: () => {
				subscription.remove();
			},
		};
	},
};
