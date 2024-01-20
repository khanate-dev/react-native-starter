export const englishContent = {
	title: 'react native starter',
	headings: {
		welcome: 'welcome to\nreact native\nstarter!',
		login: 'hi,\nplease\nlogin!',
		register: "welcome,\nlet's get started!",
	},
	action: {
		login: 'login',
		logout: 'logout',
		register: 'register',
		close: 'close',
		back: 'back',
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
	error: 'error',
	oops: 'oops',
	genericError: 'something went wrong',
	resetDescription: 'enter the email to get the reset code',
	resetSent: 'a reset code has been sent to your email',
	pathNotFound: (pathname: string) => `path ${pathname} does not exist`,
	pages: {
		notFound: 'not found',
		login: 'login',
		register: 'register',
		resetPassword: 'reset password',
	},
};
