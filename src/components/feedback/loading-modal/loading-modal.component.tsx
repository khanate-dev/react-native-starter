import { Modal, ActivityIndicator, Portal } from 'react-native-paper';

import { useTheme } from 'hooks/theme';

export const LoadingModal = () => {
	const theme = useTheme();
	return (
		<Portal>
			<Modal
				dismissable={false}
				style={{
					backgroundColor: theme.colors.primaryContainer,
					opacity: 0.7,
				}}
				contentContainerStyle={{
					padding: 10,
					borderRadius: 100,
					backgroundColor: theme.colors.inversePrimary,
					opacity: 0.6,
					shadowRadius: 6.27,
				}}
				visible
			>
				<ActivityIndicator
					color={theme.colors.primary}
					size='large'
				/>
			</Modal>
		</Portal>
	);
};
