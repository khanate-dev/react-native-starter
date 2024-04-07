/* cSpell: disable */

import type { Content } from '../i18n.js';

export const urduContent: Content = {
	action: {
		back: 'واپس',
		close: 'بند کریں',
		code: {
			error: 'دوبارہ بھیجیں',
			normal: 'کوڈ بھیجیں',
			success: 'بھیج دیا',
		},
		forgotPassword: 'پاسورڈ بھول گئے؟',
		login: 'داخل ہوں',
		logout: 'خارج ہوں',
		register: 'اندراج',
		resetPassword: 'پاسورڈ بدلیں',
		verify: {
			error: 'دوبارہ کریں',
			normal: 'تصدیق کریں',
			success: 'تصدیق شدہ!',
		},
	},
	error: 'غلطی',
	genericError: 'نامعلوم مسئلہ درپیش آیا',
	headings: {
		login: 'براہ کرم لاگ ان کریں',
		register: 'خوش آمدید،\nآئیے شروع کرتے ہیں۔',
		welcome: 'ابتدائی\nری اکٹ نیٹو\nمیں خوش آمدید',
	},
	oops: 'اوہو',
	pages: {
		login: 'داخلہ',
		notFound: 'نامعلوم صفحہ',
		register: 'اندراج',
		resetPassword: 'پاسورڈ تبدیلی',
	},
	pathNotFound: (pathname: string) => `نامعلوم صفحہ: ${pathname}`,
	resetDescription: 'تبدیلی کے کوڈ کیلئے ای میل درج کریں',
	resetSent: 'تبدیلی کا کوڈ آپ کو بھیج دیا گیا ہے',
	title: 'ری ایکٹ نیٹو ابتدائی',
};
