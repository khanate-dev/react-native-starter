export const englishContent = {
	action: {
		back: 'back',
		close: 'close',
		code: {
			error: 'resend code',
			normal: 'send code',
			success: 'code sent!',
		},
		forgotPassword: 'forgot password?',
		login: 'login',
		logout: 'logout',
		register: 'register',
		resetPassword: 'reset password',
		verify: {
			error: 'retry',
			normal: 'verify',
			success: 'verified!',
		},
	},
	error: 'error',
	genericError: 'something went wrong',
	headings: {
		login: 'hi,\nplease\nlogin!',
		register: "welcome,\nlet's get started!",
		welcome: 'welcome to\nreact native\nstarter!',
	},
	oops: 'oops',
	pages: {
		login: 'login',
		notFound: 'not found',
		register: 'register',
		resetPassword: 'reset password',
	},
	pathNotFound: (pathname: string) => `path ${pathname} does not exist`,
	resetDescription: 'enter the email to get the reset code',
	resetSent: 'a reset code has been sent to your email',
	title: 'react native starter',
};
