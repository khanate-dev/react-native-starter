import { Redirect, Stack } from 'expo-router';

import { useUserOrNull } from '../../hooks/auth.hook.tsx';

const AppLayout = () => {
	const { authStore, user } = useUserOrNull();

	if (!authStore.hasInitialized) return null;

	if (!user) return <Redirect href='/auth/' />;

	return <Stack screenOptions={{ headerShown: false }} />;
};

export default AppLayout;
