import { usePathname, useRouter } from 'expo-router';

import { ErrorPage } from '~/components/layout/error-page';

const NotFound = () => {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<ErrorPage
			title='not found!'
			message={`path ${pathname} does not exist!`}
			onBack={() => router.push('/')}
		/>
	);
};

export default NotFound;
