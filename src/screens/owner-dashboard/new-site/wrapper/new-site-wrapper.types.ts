import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { AlertProps } from 'components/feedback/Alert';
import type { FormButtonProps } from 'components/form/FormButton';
import type { NewSitePages, NewSitePageProps } from '../new-site.types';

type WrapperAction = {
	id: string;
} & FormButtonProps;

export type NewSiteWrapperProps<
	Page extends keyof NewSitePages = keyof NewSitePages
> = {
	formStyle?: StyleProp<ViewStyle>;
	page: Page;
	children: ReactNode;
	onSubmit: () => void;
	extraActions?: WrapperAction[];
	alert?: AlertProps;
	disableSubmit?: boolean;
	isLoading?: boolean;
	isSubmitting?: boolean;
} & Pick<NewSitePageProps<Page>, 'navigation'>;
