import { Redirect, Slot } from 'expo-router';

import { useUserOrNull } from '../../hooks/auth.hook.tsx';

const AppLayout = () => {
	const { authStore, user } = useUserOrNull();

	if (authStore.hasInitialized && user) return <Redirect href='/(app)' />;

	return <Slot />;
};

export default AppLayout;
