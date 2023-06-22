import { createContext, useEffect, useState } from 'react';

import { AlertModal } from '~/components/feedback/alert-modal';
import { events } from '~/helpers/events';

import type { EventMap } from '~/helpers/events';
import type { PropsWithChildren } from 'react';
import type { AlertModalProps } from '~/components/feedback/alert-modal';

const AlertContext = createContext(null);

export const AlertProvider = ({ children }: PropsWithChildren) => {
	const [alert, setAlert] = useState<null | AlertModalProps>(null);

	useEffect(() => {
		const addListener = events.listen('addAlert', (data) => {
			setAlert(
				typeof data === 'string'
					? { text: data }
					: data instanceof Error
					? { text: data.message }
					: data
			);
		});

		const removeListener = events.listen('removeAlert', () => setAlert(null));

		return () => {
			addListener.remove();
			removeListener.remove();
		};
	}, []);

	return (
		<AlertContext.Provider value={null}>
			{alert && <AlertModal {...alert} />}
			{children}
		</AlertContext.Provider>
	);
};

/** fires the add-alert event to show the given alert */
export const addAlert = (...args: EventMap['addAlert']) =>
	events.emit('addAlert', ...args);

/** fires the remove-alert event to remove showing alerts */
export const removeAlert = () => events.emit('removeAlert');
