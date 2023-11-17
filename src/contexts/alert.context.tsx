import { createContext, useEffect, useState } from 'react';

import { AlertModal } from '../components/feedback/alert-modal.component.tsx';
import { events } from '../helpers/events.helpers.ts';

import type { PropsWithChildren } from 'react';
import type { AlertModalProps } from '../components/feedback/alert-modal.component.tsx';
import type { EventMap } from '../helpers/events.helpers.ts';

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
					: data,
			);
		});

		const removeListener = events.listen('removeAlert', () => {
			setAlert(null);
		});

		return () => {
			addListener.remove();
			removeListener.remove();
		};
	}, []);

	return (
		<AlertContext.Provider value={null}>
			{alert && (
				<AlertModal
					{...alert}
					onClose={() => {
						setAlert(null);
					}}
				/>
			)}
			{children}
		</AlertContext.Provider>
	);
};

/** fires the add-alert event to show the given alert */
export const addAlert = (data: EventMap['addAlert']) => {
	events.emit('addAlert', data);
};

/** fires the remove-alert event to remove showing alerts */
export const removeAlert = () => {
	events.emit('removeAlert');
};
