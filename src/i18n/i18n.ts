/* cSpell: disable */

export const languages = ['english', 'urdu'] as const;

export type Language = (typeof languages)[number];

export const defaultLanguage: Language = 'english';

const english = {
	title: 'react native starter',
	pageTitles: {
		alphabet: 'alphabet',
	},
};

export type Content = typeof english;

const urdu: Content = {
	title: 'ری اکٹ نیٹو ابتدائی',
	pageTitles: {
		alphabet: 'حروفِ تہجی',
	},
};

export const content: Record<Language, Content> = { english, urdu };
