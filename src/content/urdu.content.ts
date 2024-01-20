/* cSpell: disable */

import type { Content } from '../i18n.ts';

export const urduContent: Content = {
	title: 'ری ایکٹ نیٹو ابتدائی',
	headings: {
		welcome: 'ابتدائی\nری اکٹ نیٹو\nمیں خوش آمدید',
		login: 'براہ کرم لاگ ان کریں',
		register: 'خوش آمدید،\nآئیے شروع کرتے ہیں۔',
	},
	action: {
		login: 'داخل ہوں',
		logout: 'خارج ہوں',
		register: 'اندراج',
		close: 'بند کریں',
		back: 'واپس',
		forgotPassword: 'پاسورڈ بھول گئے؟',
		resetPassword: 'پاسورڈ بدلیں',
		code: {
			normal: 'کوڈ بھیجیں',
			error: 'دوبارہ بھیجیں',
			success: 'بھیج دیا',
		},
		verify: {
			normal: 'تصدیق کریں',
			error: 'دوبارہ کریں',
			success: 'تصدیق شدہ!',
		},
	},
	error: 'غلطی',
	oops: 'اوہو',
	genericError: 'نامعلوم مسئلہ درپیش آیا',
	resetDescription: 'تبدیلی کے کوڈ کیلئے ای میل درج کریں',
	resetSent: 'تبدیلی کا کوڈ آپ کو بھیج دیا گیا ہے',
	pathNotFound: (pathname: string) => `نامعلوم صفحہ: ${pathname}`,
	pages: {
		notFound: 'نامعلوم صفحہ',
		login: 'داخلہ',
		register: 'اندراج',
		resetPassword: 'پاسورڈ تبدیلی',
	},
};
