import { createContext, useContext, useEffect, useState } from 'react';

import { events } from '../helpers/events.helpers.ts';
import { createStore } from '../helpers/store.helpers.ts';
import { content, defaultLanguage, languageSchema } from '../i18n.ts';

import type { PropsWithChildren, SetStateAction } from 'react';
import type { Language } from '../i18n';

const languageStore = createStore({
	key: 'language',
	schema: languageSchema,
	defaultVal: defaultLanguage,
});

const I18nContext = createContext<Language>(defaultLanguage);

export const I18nProvider = ({ children }: PropsWithChildren) => {
	const [language, setLanguage] = useState<Language>(defaultLanguage);

	useEffect(() => {
		const updateListener = events.listen('updateLanguage', (value) => {
			setLanguage((prev) => {
				const newLanguage = typeof value === 'function' ? value(prev) : value;
				languageStore.set(newLanguage);
				return newLanguage;
			});
		});

		(async () => {
			setLanguage(await languageStore.get());
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

	return {
		language,
		direction: language === 'urdu' ? 'rtl' : 'ltr',
		rtl: language === 'urdu',
		content: content[language],
	} as const;
};

export const updateLanguage = (language: SetStateAction<Language>) => {
	events.emit('updateLanguage', language);
};
