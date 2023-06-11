import { createContext, useContext, useEffect, useState } from 'react';

import { LoadingModal } from 'components/feedback/loading-modal';
import { createEventHandlers } from 'helpers/events/events.helpers';

import type { SetStateAction, PropsWithChildren } from 'react';

const LoadingContext = createContext<boolean>(false);

const { emit, listen } = createEventHandlers<{
	'set-is-loading': [SetStateAction<boolean>];
}>();

export const LoadingProvider = ({ children }: PropsWithChildren) => {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const listener = listen('set-is-loading', setIsLoading);

		return () => {
			listener.remove();
		};
	}, []);

	return (
		<LoadingContext.Provider value={isLoading}>
			{isLoading && <LoadingModal />}
			{children}
		</LoadingContext.Provider>
	);
};

export const useLoading = () => {
	const isLoading = useContext(LoadingContext);
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (isLoading === undefined)
		throw new Error('useLoading must be used within an LoadingProvider');

	return isLoading;
};

export const setIsLoading = (value: SetStateAction<boolean>) =>
	emit('set-is-loading', value);
