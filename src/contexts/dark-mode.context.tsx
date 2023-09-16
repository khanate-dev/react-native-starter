import { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';

import { events } from '~/helpers/events.helpers';
import { getSetting, setSetting } from '~/helpers/settings.helpers';

import type { PropsWithChildren, SetStateAction } from 'react';

const DarkModeContext = createContext<boolean>(false);

const prefersDarkMode = Appearance.getColorScheme() === 'dark';

export const DarkModeProvider = ({ children }: PropsWithChildren) => {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(prefersDarkMode);

	useEffect(() => {
		const toggleListener = events.listen('toggleDarkMode', () => {
			setIsDarkMode((prev) => {
				const newIsDarkMode = !prev;
				setSetting('isDarkMode', newIsDarkMode);
				return newIsDarkMode;
			});
		});

		const updateListener = events.listen('updateDarkMode', (value) => {
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

export const toggleDarkMode = () => {
	events.emit('toggleDarkMode');
};

export const updateDarkMode = (isDarkMode: SetStateAction<boolean>) => {
	events.emit('updateDarkMode', isDarkMode);
};
