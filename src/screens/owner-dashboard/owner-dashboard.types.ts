import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type OwnerDashboardPages = {
	'view-sites': undefined;
	'new-site': undefined;
};

export type OwnerDashboardPageProps<Page extends keyof OwnerDashboardPages> =
	NativeStackScreenProps<OwnerDashboardPages, Page>;
