import { Redirect, Slot } from 'expo-router';

import { useUserOrNull } from '../../hooks/user.hook.js';

const AppLayout = () => {
	const { hasInitialized, user } = useUserOrNull();

	if (hasInitialized && user) return <Redirect href='/(app)' />;

	return <Slot />;
};

export default AppLayout;
