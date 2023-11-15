import { Slot } from 'expo-router';

import { AuthProvider, authStore } from '../../contexts/auth.context';
import { useStorage } from '../../hooks/storage.hook';

const RootLayout = () => {
	const [[isLoading, user]] = useStorage(authStore);

	if (isLoading) return null;

	return (
		<AuthProvider defaultUser={user}>
			<Slot />
		</AuthProvider>
	);
};

export default RootLayout;
