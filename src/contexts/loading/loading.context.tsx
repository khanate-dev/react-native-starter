import { createContext, useContext, useEffect, useState } from 'react';
import { DeviceEventEmitter } from 'react-native';

import { LoadingModal } from 'components/modal/loading';

import type { SetStateAction, PropsWithChildren } from 'react';

const LoadingContext = createContext<boolean>(false);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		DeviceEventEmitter.addListener(
			'set-is-loading',
			(value: SetStateAction<boolean>) => {
				setIsLoading(value);
			}
		);

		return () => {
			DeviceEventEmitter.removeAllListeners('set-is-loading');
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

/** fires the set-is-loading event to update the current loading state */
export const setIsLoading = (value: SetStateAction<boolean>) => {
	DeviceEventEmitter.emit('set-is-loading', value);
};
