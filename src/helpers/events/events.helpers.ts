import { DeviceEventEmitter } from 'react-native';

export const createEventHandlers = <ArgMap extends Record<string, any[]>>() => {
	return {
		emit: <T extends keyof ArgMap & string>(event: T, ...args: ArgMap[T]) => {
			DeviceEventEmitter.emit(event, ...args);
		},
		listen: <T extends keyof ArgMap & string>(
			event: T,
			listener: (...args: ArgMap[T]) => void
		) => {
			const subscription = DeviceEventEmitter.addListener(
				event,
				listener as never
			);
			return { remove: () => subscription.remove() };
		},
	};
};
