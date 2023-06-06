import { Modal, Text, useStyleSheet } from '@ui-kitten/components';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

import { mortalityFields, mortalityFormSchema } from 'schemas/mortality';
import { fcrFields, fcrFormSchema } from 'schemas/fcr';
import { weightFields, weightFormSchema } from 'schemas/weight';
import { addWeight, updateWeight } from 'endpoints/weight';
import { addFcr, updateFcr } from 'endpoints/fcr';
import { addMortality, updateMortality } from 'endpoints/mortality';
import { Form } from 'components/form/Form';

import { shedModalStyles } from './shed-modal.styles';

import type { SupervisorDashboardPageProps } from '../supervisor-dashboard.types';

const mapping = {
	mortality: {
		fields: mortalityFields,
		schema: mortalityFormSchema,
	},
	fcr: {
		fields: fcrFields,
		schema: fcrFormSchema,
	},
	weights: {
		fields: weightFields,
		schema: weightFormSchema,
	},
};

export const ShedModal = ({
	route,
	navigation,
}: SupervisorDashboardPageProps<'modal'>) => {
	const styles = useStyleSheet(shedModalStyles);

	const { type, shed, id } = route.params;

	const { fields, schema } = mapping[type];

	return (
		<Modal
			backdropStyle={styles.backdrop}
			visible
			onBackdropPress={navigation.goBack}
		>
			<Animated.View
				style={styles.modal}
				entering={SlideInDown}
				exiting={SlideOutDown}
			>
				<Text style={styles.heading}>
					{type === 'fcr' ? 'FCR' : `${type[0]?.toUpperCase()}${type.slice(1)}`}
				</Text>

				<Form
					fields={fields}
					submitLabel='Update'
					submitProps={{ status: 'danger' }}
					defaultValues={type === 'weights' ? null : shed[type]}
					onSubmit={async (state) => {
						const body = schema.parse({
							...state,
							ShedId: shed.Id,
						});
						if (type === 'weights') {
							if (id) await updateWeight(id, body as any);
							else await addWeight(body as any);
						} else if (type === 'fcr') {
							if (id) await updateFcr(id, body as any);
							else await addFcr(body as any);
						} else if (type === 'mortality') {
							if (id) await updateMortality(id, body as any);
							else await addMortality(body as any);
						}
						navigation.goBack();
					}}
				/>
			</Animated.View>
		</Modal>
	);
};
