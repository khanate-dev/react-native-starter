import { createContext, useContext, useEffect, useState } from 'react';

import { content, defaultLanguage } from 'i18n';
import { getSetting, setSetting } from 'helpers/settings';
import { events } from 'helpers/events';

import type { Language } from 'i18n';
import type { PropsWithChildren, SetStateAction } from 'react';

const I18nContext = createContext<Language>(defaultLanguage);

export const I18nProvider = ({ children }: PropsWithChildren) => {
	const [language, setLanguage] = useState<Language>(defaultLanguage);

	useEffect(() => {
		const updateListener = events.listen('updateLanguage', (value) => {
			setLanguage((prev) => {
				const newLanguage = typeof value === 'function' ? value(prev) : value;
				setSetting('language', newLanguage);
				return newLanguage;
			});
		});

		(async () => {
			setLanguage((await getSetting('language')) ?? defaultLanguage);
		})();

		return () => {
			updateListener.remove();
		};
	}, []);

	return (
		<I18nContext.Provider value={language}>{children}</I18nContext.Provider>
	);
};

export const useI18n = () => {
	const language = useContext(I18nContext);

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (language === undefined)
		throw new Error('useDarkMode must be used within an DarkModeProvider');

	return { language, content: content[language] };
};

export const updateLanguage = (language: SetStateAction<Language>) => {
	events.emit('updateLanguage', language);
};
