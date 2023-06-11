import { createContext, useEffect, useState } from 'react';

import { AlertModal } from 'components/feedback/alert-modal';
import { createEventHandlers } from 'helpers/events/events.helpers';

import type { PropsWithChildren } from 'react';
import type { AlertModalProps } from 'components/feedback/alert-modal';

const AlertContext = createContext(undefined);

type AddAlertInput = string | Error | AlertModalProps;

const { emit, listen } = createEventHandlers<{
	'add-alert': [AddAlertInput];
	'remove-alert': [];
}>();

export const AlertProvider = ({ children }: PropsWithChildren) => {
	const [alert, setAlert] = useState<null | AlertModalProps>(null);

	useEffect(() => {
		const addListener = listen('add-alert', (data) => {
			setAlert(
				typeof data === 'string'
					? { text: data }
					: data instanceof Error
					? { text: data.message }
					: data
			);
		});

		const removeListener = listen('remove-alert', () => setAlert(null));

		return () => {
			addListener.remove();
			removeListener.remove();
		};
	}, []);

	return (
		<AlertContext.Provider value={undefined}>
			{alert && <AlertModal {...alert} />}
			{children}
		</AlertContext.Provider>
	);
};

/** fires the add-alert event to show the given alert */
export const addAlert = (message: AddAlertInput) => emit('add-alert', message);

/** fires the remove-alert event to remove showing alerts */
export const removeAlert = () => emit('remove-alert');
