import { createContext, useContext, useEffect, useState } from 'react';
import { Appearance, DeviceEventEmitter } from 'react-native';

import { getSetting, setSetting } from 'helpers/settings';

import type { PropsWithChildren, SetStateAction } from 'react';

const DarkModeContext = createContext<boolean>(false);

const prefersDarkMode = Appearance.getColorScheme() === 'dark';

export const DarkModeProvider = ({ children }: PropsWithChildren) => {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(prefersDarkMode);

	useEffect(() => {
		DeviceEventEmitter.addListener('toggle-dark-mode', () => {
			setIsDarkMode((prev) => {
				const newIsDarkMode = !prev;
				setSetting('isDarkMode', newIsDarkMode);
				return newIsDarkMode;
			});
		});

		DeviceEventEmitter.addListener(
			'set-is-dark-mode',
			(value: SetStateAction<boolean>) => {
				setIsDarkMode((prev) => {
					const newIsDarkMode =
						typeof value === 'boolean' ? value : value(prev);
					setSetting('isDarkMode', newIsDarkMode);
					return newIsDarkMode;
				});
			}
		);

		(async () => {
			setIsDarkMode((await getSetting('isDarkMode')) ?? prefersDarkMode);
		})();

		Appearance.addChangeListener(({ colorScheme }) => {
			setIsDarkMode(colorScheme === 'dark');
		});

		return () => {
			DeviceEventEmitter.removeAllListeners('toggle-dark-mode');
			DeviceEventEmitter.removeAllListeners('set-is-dark-mode');
		};
	}, []);

	return (
		<DarkModeContext.Provider value={isDarkMode}>
			{children}
		</DarkModeContext.Provider>
	);
};

export const useDarkMode = () => {
	const isDarkMode = useContext(DarkModeContext);
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (isDarkMode === undefined)
		throw new Error('useDarkMode must be used within an DarkModeProvider');

	return isDarkMode;
};

export const toggleDarkMode = () => {
	const toggleEvent = new Event('toggle-dark-mode', {
		bubbles: true,
	});
	window.dispatchEvent(toggleEvent);
};

export const updateDarkMode = (isDarkMode: boolean) => {
	const updateEvent = new CustomEvent('update-dark-mode', {
		detail: isDarkMode,
		bubbles: true,
	});
	window.dispatchEvent(updateEvent);
};
