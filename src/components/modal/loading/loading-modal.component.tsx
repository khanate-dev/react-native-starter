import { Modal, ActivityIndicator, useStyleSheet } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const loadingModalStyles = StyleSheet.create({
	backdrop: {
		backgroundColor: 'color-primary-900',
		opacity: 0.7,
	},
	modal: {
		padding: 10,
		borderRadius: 100,
		backgroundColor: 'color-primary-100',
		opacity: 0.6,
		shadowRadius: 6.27,
	},
});

export const LoadingModal = () => {
	const styles = useStyleSheet(loadingModalStyles);

	return (
		<Modal
			style={styles.modal}
			backdropStyle={styles.backdrop}
			focusable={false}
			visible
		>
			<ActivityIndicator
				status='control'
				size='giant'
			/>
		</Modal>
	);
};
