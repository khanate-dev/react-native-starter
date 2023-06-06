import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { OwnerModel } from 'schemas/owner';
import type { SiteModel } from 'schemas/site';

export type NewSitePages = {
	'add-site': undefined;
	'add-sheds': { owner: OwnerModel; site: SiteModel };
	'add-supervisor': { owner: OwnerModel; site: SiteModel };
};

export type NewSitePageProps<Page extends keyof NewSitePages> =
	NativeStackScreenProps<NewSitePages, Page>;
