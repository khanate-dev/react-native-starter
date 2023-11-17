import { Slot } from 'expo-router';

import { AuthProvider, authStore } from '../../contexts/auth.context.tsx';
import { useStorage } from '../../hooks/storage.hook.tsx';

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
