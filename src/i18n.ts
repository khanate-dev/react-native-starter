import { useSyncExternalStore } from 'react';
import { z } from 'zod';

import { englishContent } from './content/english.content.ts';
import { urduContent } from './content/urdu.content.ts';
import { Store } from './helpers/store.helpers.ts';

export const languages = ['english', 'urdu'] as const;

export const languageSchema = z.enum(languages);

export type Language = (typeof languages)[number];

export const defaultLanguage: Language = 'english';

export const languageLabel: Record<Language, string> = {
	english: 'English',
	urdu: 'اردو', // cSpell: disable-line
};

export type Content = typeof englishContent;

const content: Record<Language, Content> = {
	english: englishContent,
	urdu: urduContent,
};

const store = new Store({
	key: 'language',
	schema: languageSchema,
	defaultVal: defaultLanguage,
});

const getLanguage = () => store.getSnapShot();

const subscribe = (callback: () => void) => {
	return store.subscribe(callback);
};

export const updateLanguage = (language: Language) => {
	store.set(language);
};

export const useI18n = () => {
	const language = useSyncExternalStore(subscribe, getLanguage);
	return {
		language,
		updateLanguage,
		direction: language === 'urdu' ? 'rtl' : 'ltr',
		rtl: language === 'urdu',
		content: content[language],
	} as const;
};

export const getI18n = () => {
	const language = store.getSnapShot();
	return {
		language,
		updateLanguage,
		direction: language === 'urdu' ? 'rtl' : 'ltr',
		rtl: language === 'urdu',
		content: content[language],
	} as const;
};
