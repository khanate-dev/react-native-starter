import { useState, useRef } from 'react';
import { Keyboard, View } from 'react-native';
import {
	handleInputSubmitEditing,
	trySubmission,
	updateForm,
} from 'helpers/form';
import { getDefaultFormState } from 'helpers/defaults';

import { shedFields as fields, shedFormSchema } from 'schemas/shed';
import { addShed } from 'endpoints/shed';
import { FormInput } from 'components/form/FormInput';
import { Chip } from 'components/data/Chip';

import { NewSiteWrapper } from '../wrapper';

import { addShedsStyles as styles } from './add-sheds.styles';

import type { AlertStatus } from 'types/general';
import type { FormErrors, FormState } from 'types/form';
import type { NewSitePageProps } from '../new-site.types';
import type { Shed, ShedField } from 'schemas/shed';
import type { Input } from '@ui-kitten/components';

export const AddSheds = ({
	navigation,
	route,
}: NewSitePageProps<'add-sheds'>) => {
	const { owner, site } = route.params;

	const formRefs = useRef<(null | Input)[]>([]);

	const [sheds, setSheds] = useState<Shed[]>([]);
	const [form, setForm] = useState<FormState<ShedField>>(
		getDefaultFormState(fields)
	);
	const [errors, setErrors] = useState<FormErrors<ShedField>>({});
	const [isShowingAdditional, setIsShowingAdditional] =
		useState<boolean>(false);
	const [status, setStatus] = useState<AlertStatus>(null);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const handleAddShed = () =>
		trySubmission(
			fields,
			setErrors,
			setStatus,
			setIsSubmitting,
			form,
			async (state) => {
				const newShed = shedFormSchema.parse({
					SiteId: site.Id,
					...state,
				});
				const exists = sheds.some((shed) => form.Name === shed.Name);
				if (exists)
					throw new Error('A Shed With This Name Has Already Been Added!');

				setForm(getDefaultFormState(fields));
				setSheds((prev) => [...prev, newShed]);
			}
		);

	const handleSubmit = async () => {
		try {
			Keyboard.dismiss();

			if (sheds.length === 0 || !site) return;

			setStatus(null);
			setIsSubmitting(true);

			const addedSheds = await Promise.all(
				sheds.map(async (shed) => addShed(shed))
			);

			setStatus({
				type: 'success',
				text: `${addedSheds.length} Sheds Added! Please Wait...`,
			});
			setTimeout(() => {
				navigation.navigate('add-supervisor', { owner, site });
			}, 1000);
		} catch (error: any) {
			setStatus(error.message ?? error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<NewSiteWrapper
			navigation={navigation}
			page='add-sheds'
			isSubmitting={isSubmitting}
			disableSubmit={sheds.length === 0}
			extraActions={[
				{
					id: 'toggleAdditional',
					label: `${isShowingAdditional ? 'Hide' : 'Show'} Additional Settings`,
					size: 'tiny',
					appearance: 'ghost',
					status: 'danger',
					onPress: () => {
						setIsShowingAdditional((prev) => !prev);
						Keyboard.dismiss();
					},
				},
				{
					id: 'addShed',
					label: 'Add Shed',
					onPress: handleAddShed,
					size: 'medium',
					status: 'danger',
				},
			]}
			alert={
				status
					? {
							state: status,
							hasIcon: true,
					  }
					: undefined
			}
			onSubmit={handleSubmit}
		>
			<View style={styles.chipContainer}>
				{sheds.map((shed, index) => (
					<Chip
						key={index}
						text={shed.Name}
						type='success'
						containerStyle={[
							styles.chip,
							index > 3 && styles.chipNotFirstRow,
							(index + 1) % 4 !== 0 && styles.chipNotLastColumn,
						]}
						hasClose
						onClose={() => {
							setSheds((prev) =>
								prev.filter((_, shedIndex) => shedIndex !== index)
							);
						}}
					/>
				))}
			</View>

			<FormInput
				ref={(element) => {
					formRefs.current[0] = element;
				}}
				blurOnSubmit={false}
				type='string'
				value={form.Name}
				error={errors.Name}
				label='Shed Name *'
				onSubmitEditing={() =>
					handleInputSubmitEditing(formRefs, 0, handleSubmit)
				}
				onChange={(value) => updateForm(setForm, 'Name', value)}
			/>

			<FormInput
				ref={(element) => {
					formRefs.current[1] = element;
				}}
				blurOnSubmit={false}
				type='string'
				value={form.Type}
				error={errors.Type}
				label='Shed Type *'
				onSubmitEditing={() =>
					handleInputSubmitEditing(formRefs, 1, handleSubmit)
				}
				onChange={(value) => updateForm(setForm, 'Type', value)}
			/>

			<View style={styles.rowFlex}>
				<FormInput
					ref={(element) => {
						formRefs.current[2] = element;
					}}
					style={styles.rowFlexChild}
					blurOnSubmit={false}
					type='float'
					value={form.Length}
					error={errors.Length}
					label='Length(feet) *'
					onSubmitEditing={() =>
						handleInputSubmitEditing(formRefs, 2, handleSubmit)
					}
					onChange={(value) => updateForm(setForm, 'Length', value)}
				/>

				<FormInput
					ref={(element) => {
						formRefs.current[3] = element;
					}}
					blurOnSubmit={false}
					type='float'
					value={form.Width}
					error={errors.Width}
					label='Height(feet) *'
					style={[styles.rowFlexChild, styles.rowFlexChildNotFirst]}
					onSubmitEditing={() =>
						handleInputSubmitEditing(formRefs, 3, handleSubmit)
					}
					onChange={(value) => updateForm(setForm, 'Width', value)}
				/>

				<FormInput
					ref={(element) => {
						formRefs.current[4] = element;
					}}
					blurOnSubmit={false}
					type='float'
					value={form.Height}
					error={errors.Height}
					label='Width(feet) *'
					isLast={!isShowingAdditional}
					style={[styles.rowFlexChild, styles.rowFlexChildNotFirst]}
					onSubmitEditing={() =>
						handleInputSubmitEditing(formRefs, 4, handleSubmit)
					}
					onChange={(value) => updateForm(setForm, 'Height', value)}
				/>
			</View>

			{isShowingAdditional && (
				<>
					<View style={styles.rowFlex}>
						<FormInput
							ref={(element) => {
								formRefs.current[5] = element;
							}}
							style={styles.rowFlexChild}
							blurOnSubmit={false}
							type='int'
							value={form.TunnelFans}
							error={errors.TunnelFans}
							label='Tunnel Fans'
							onSubmitEditing={() =>
								handleInputSubmitEditing(formRefs, 5, handleSubmit)
							}
							onChange={(value) => updateForm(setForm, 'TunnelFans', value)}
						/>

						<FormInput
							ref={(element) => {
								formRefs.current[6] = element;
							}}
							blurOnSubmit={false}
							type='int'
							value={form.SideFans}
							error={errors.SideFans}
							label='Side Fans'
							style={[styles.rowFlexChild, styles.rowFlexChildNotFirst]}
							onSubmitEditing={() =>
								handleInputSubmitEditing(formRefs, 6, handleSubmit)
							}
							onChange={(value) => updateForm(setForm, 'SideFans', value)}
						/>
					</View>

					<View style={styles.rowFlex}>
						<FormInput
							ref={(element) => {
								formRefs.current[7] = element;
							}}
							style={styles.rowFlexChild}
							blurOnSubmit={false}
							type='string'
							value={form.TunnelFansBrand}
							error={errors.TunnelFansBrand}
							label='Brand'
							onSubmitEditing={() =>
								handleInputSubmitEditing(formRefs, 7, handleSubmit)
							}
							onChange={(value) => {
								updateForm(setForm, 'TunnelFansBrand', value);
								updateForm(setForm, 'SideFansBrand', value);
							}}
						/>

						<FormInput
							ref={(element) => {
								formRefs.current[8] = element;
							}}
							type='float'
							value={form.PadLength}
							error={errors.PadLength}
							label='Pad Length'
							style={[styles.rowFlexChild, styles.rowFlexChildNotFirst]}
							isLast
							onSubmitEditing={() =>
								handleInputSubmitEditing(formRefs, 8, handleSubmit)
							}
							onChange={(value) => updateForm(setForm, 'PadLength', value)}
						/>
					</View>
				</>
			)}
		</NewSiteWrapper>
	);
};
