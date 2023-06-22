import { usePathname, useRouter } from 'expo-router';

import { ErrorPage } from '~/components/layout/error-page';
import { useI18n } from '~/contexts/i18n';

const NotFound = () => {
	const router = useRouter();
	const pathname = usePathname();

	const { content } = useI18n();

	return (
		<ErrorPage
			title={content.pages.notFound}
			message={content.pathNotFound(pathname)}
			onBack={() => router.push('/')}
		/>
	);
};

export default NotFound;
