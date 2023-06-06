import type {
	NativeStackNavigationProp,
	NativeStackScreenProps,
} from '@react-navigation/native-stack';
import type {
	ShedFormStep,
	ShedModalType,
	ShedWithGradient,
} from 'schemas/shed';
import type { ContractModel } from 'schemas/contract';

export type UpdateShedBase = {
	type: ShedFormStep;
	shedId: number;
	contract?: ContractModel;
};

export type UpdateShedNonContractProps = {
	type: Exclude<ShedFormStep, 'contract'>;
	contract?: never;
} & UpdateShedBase;

export type UpdateShedContractProps = {
	type: 'contract';
	contract: ContractModel;
} & UpdateShedBase;

export type UpdateShedProps =
	| UpdateShedNonContractProps
	| UpdateShedContractProps;

export type SupervisorDashboardPages = {
	'view-sheds': undefined;
	'update-shed': UpdateShedProps;
	'update-weights': {
		shed: ShedWithGradient;
	};
	'book-sales': {
		shedId: number;
	};
	modal: {
		type: ShedModalType;
		shed: ShedWithGradient;
		id?: number;
	};
};

export type SupervisorDashboardPageProps<
	Page extends keyof SupervisorDashboardPages
> = NativeStackScreenProps<SupervisorDashboardPages, Page>;

export type SupervisorDashboardNavigation<
	Page extends keyof SupervisorDashboardPages
> = NativeStackNavigationProp<SupervisorDashboardPages, Page>;

export type CurrentSupervisorPage = {
	name: ShedFormStep | 'weightForm' | 'bookSales';
	shed: ShedWithGradient;
	contract?: ContractModel;
};
