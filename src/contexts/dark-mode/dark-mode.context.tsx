import { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';

import { getSetting, setSetting } from 'helpers/settings';
import { createEventHandlers } from 'helpers/events/events.helpers';

import type { PropsWithChildren, SetStateAction } from 'react';

const DarkModeContext = createContext<boolean>(false);

const prefersDarkMode = Appearance.getColorScheme() === 'dark';

const { emit, listen } = createEventHandlers<{
	'toggle-dark-mode': [];
	'update-dark-mode': [SetStateAction<boolean>];
}>();

export const DarkModeProvider = ({ children }: PropsWithChildren) => {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(prefersDarkMode);

	useEffect(() => {
		const toggleListener = listen('toggle-dark-mode', () => {
			setIsDarkMode((prev) => {
				const newIsDarkMode = !prev;
				setSetting('isDarkMode', newIsDarkMode);
				return newIsDarkMode;
			});
		});

		const updateListener = listen('update-dark-mode', (value) => {
			setIsDarkMode((prev) => {
				const newIsDarkMode = typeof value === 'boolean' ? value : value(prev);
				setSetting('isDarkMode', newIsDarkMode);
				return newIsDarkMode;
			});
		});

		(async () => {
			setIsDarkMode((await getSetting('isDarkMode')) ?? prefersDarkMode);
		})();

		Appearance.addChangeListener(({ colorScheme }) => {
			setIsDarkMode(colorScheme === 'dark');
		});

		return () => {
			toggleListener.remove();
			updateListener.remove();
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

export const toggleDarkMode = () => emit('toggle-dark-mode');

export const updateDarkMode = (isDarkMode: SetStateAction<boolean>) =>
	emit('update-dark-mode', isDarkMode);
