import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthPages = {
	'auth-start': undefined;
	login?: {
		Email: string;
		Password: string;
	};
	register: undefined;
	'forgot-password': undefined;
};

export type AuthPageProps<Page extends keyof AuthPages> =
	NativeStackScreenProps<AuthPages, Page>;
