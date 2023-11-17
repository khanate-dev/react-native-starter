import { ActivityIndicator, Modal, Portal } from 'react-native-paper';

import { useTheme } from '../../hooks/theme.hook.tsx';

export const LoadingModal = () => {
	const theme = useTheme();
	return (
		<Portal>
			<Modal
				dismissable={false}
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: theme.colors.backdrop,
				}}
				contentContainerStyle={{
					padding: 10,
					borderRadius: 100,
					backgroundColor: theme.colors.primary,
					opacity: 0.75,
					shadowRadius: 6.27,
				}}
				visible
			>
				<ActivityIndicator
					color={theme.colors.onPrimary}
					size='large'
				/>
			</Modal>
		</Portal>
	);
};
