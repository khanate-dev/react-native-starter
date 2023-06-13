import { useRouter } from 'expo-router';

import { ErrorPage } from 'components/layout/error-page';

const NotFound = () => {
	const router = useRouter();

	return (
		<ErrorPage
			title='Path not found!'
			heading='404'
			message='The page you are looking for does not exist.'
			onBack={() => router.push('/')}
		/>
	);
};

export default NotFound;
