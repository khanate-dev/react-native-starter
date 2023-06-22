/* cSpell: disable */

export const languages = ['english', 'urdu'] as const;

export type Language = (typeof languages)[number];

export const defaultLanguage: Language = 'english';

const english = {
	title: 'react native starter',
	headings: {
		welcome: 'welcome to\nreact native\nstarter!',
		login: 'hi,\nplease\nlogin!',
		register: "welcome,\nlet's get started!",
	},
	action: {
		login: 'login',
		register: 'register',
		forgotPassword: 'forgot password?',
		resetPassword: 'reset password',
		code: {
			normal: 'send code',
			error: 'resend code',
			success: 'code sent!',
		},
		verify: {
			normal: 'verify',
			error: 'retry',
			success: 'verified!',
		},
	},
	resetDescription: 'enter the email to get the reset code',
	resetSent: 'a reset code has been sent to your email',
	pages: {
		login: 'login',
		register: 'register',
		resetPassword: 'reset password',
	},
};

export type Content = typeof english;

const urdu: Content = {
	title: 'ری ایکٹ نیٹو ابتدائی',
	headings: {
		welcome: 'ابتدائی\nری اکٹ نیٹو\nمیں خوش آمدید',
		login: 'براہ کرم لاگ ان کریں',
		register: 'خوش آمدید،\nآئیے شروع کرتے ہیں۔',
	},
	action: {
		login: 'داخل ہوں',
		register: 'اندراج',
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
	resetDescription: 'تبدیلی کے کوڈ کیلئے ای میل درج کریں',
	resetSent: 'تبدیلی کا کوڈ آپ کو بھیج دیا گیا ہے',
	pages: {
		login: 'داخلہ',
		register: 'اندراج',
		resetPassword: 'پاسورڈ تبدیلی',
	},
};

export const content: Record<Language, Content> = { english, urdu };
