import { Redirect, Stack } from 'expo-router';

import { useUserOrNull } from '../../hooks/user.hook.js';

const AppLayout = () => {
	const { hasInitialized, user } = useUserOrNull();

	if (!hasInitialized) return null;

	if (!user) return <Redirect href='/auth/' />;

	return <Stack screenOptions={{ headerShown: false }} />;
};

export default AppLayout;
