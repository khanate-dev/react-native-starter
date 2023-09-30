import { createContext, useContext, useEffect, useState } from 'react';

import { events } from '~/helpers/events.helpers';
import { getStorage, setStorage } from '~/helpers/storage.helpers';
import { content, defaultLanguage } from '~/i18n';

import type { PropsWithChildren, SetStateAction } from 'react';
import type { Language } from '~/i18n';

const I18nContext = createContext<Language>(defaultLanguage);

export const I18nProvider = ({ children }: PropsWithChildren) => {
	const [language, setLanguage] = useState<Language>(defaultLanguage);

	useEffect(() => {
		const updateListener = events.listen('updateLanguage', (value) => {
			setLanguage((prev) => {
				const newLanguage = typeof value === 'function' ? value(prev) : value;
				setStorage('language', newLanguage);
				return newLanguage;
			});
		});

		(async () => {
			setLanguage((await getStorage('language')) ?? defaultLanguage);
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
