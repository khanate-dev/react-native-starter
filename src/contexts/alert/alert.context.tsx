import { createContext, useContext, useEffect, useState } from 'react';
import { DeviceEventEmitter } from 'react-native';

import { AlertModal } from 'components/feedback/alert-modal';

import type { Dispatch, SetStateAction, PropsWithChildren } from 'react';
import type { AlertModalProps } from 'components/feedback/alert-modal';

const AlertContext = createContext<
	Dispatch<SetStateAction<null | AlertModalProps>>
>(() => false);

type AddAlertInput = string | Error | AlertModalProps;

export const AlertProvider = ({ children }: PropsWithChildren) => {
	const [alert, setAlert] = useState<null | AlertModalProps>(null);

	useEffect(() => {
		DeviceEventEmitter.addListener('add-alert', (data: AddAlertInput) => {
			setAlert(
				typeof data === 'string'
					? { text: data }
					: data instanceof Error
					? { text: data.message }
					: data
			);
		});

		DeviceEventEmitter.addListener('remove-alert', () => {
			setAlert(null);
		});

		return () => {
			DeviceEventEmitter.removeAllListeners('add-alert');
			DeviceEventEmitter.removeAllListeners('remove-alert');
		};
	}, []);

	return (
		<AlertContext.Provider value={setAlert}>
			{alert && <AlertModal {...alert} />}
			{children}
		</AlertContext.Provider>
	);
};

export const useAlert = () => {
	const setAlert = useContext(AlertContext);
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (!setAlert)
		throw new Error('useAlert must be used within an AlertProvider');

	return { addAlert: setAlert };
};

/** fires the add-alert event to show the given alert */
export const addAlert = (message: AddAlertInput) => {
	DeviceEventEmitter.emit('add-alert', message);
};

/** fires the remove-alert event to remove showing alerts */
export const removeAlert = () => {
	DeviceEventEmitter.emit('remove-alert');
};
