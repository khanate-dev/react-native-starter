import { useState, useRef } from 'react';
import {
	updateForm,
	handleInputSubmitEditing,
	trySubmission,
} from 'helpers/form';
import { getDefaultFormState } from 'helpers/defaults';

import {
	supervisorFields as fields,
	supervisorFormSchema,
} from 'schemas/supervisor';
import { addSupervisor } from 'endpoints/supervisor';
import { updateSite } from 'endpoints/site';
import { humanizeToken } from 'helpers/string';
import { objectEntries } from 'helpers/object';
import { FormInput } from 'components/form/FormInput';

import { NewSiteWrapper } from '../wrapper';

import type { AlertStatus } from 'types/general';
import type { SupervisorField } from 'schemas/supervisor';
import type { Input } from '@ui-kitten/components';
import type { FormErrors, FormState } from 'types/form';
import type { NewSitePageProps } from '../new-site.types';

export const AddSupervisor = ({
	navigation,
	route,
}: NewSitePageProps<'add-supervisor'>) => {
	const { site } = route.params;

	const formRefs = useRef<(null | Input)[]>([]);

	const [form, setForm] = useState<FormState<SupervisorField>>(
		getDefaultFormState(fields)
	);
	const [errors, setErrors] = useState<FormErrors<SupervisorField>>({});
	const [status, setStatus] = useState<null | AlertStatus>(null);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const entries = objectEntries(fields);

	const handleSubmit = async () =>
		trySubmission(
			fields,
			setErrors,
			setStatus,
			setIsSubmitting,
			form,
			async (state) => {
				const body = supervisorFormSchema.parse(state);
				const addedSupervisor = await addSupervisor(body);

				await updateSite(site.Id, {
					Name: site.Name,
					City: site.City,
					Gps: site.Gps,
					Address: site.Address,
					SupervisorId: addedSupervisor.Id,
				});

				setTimeout(() => {
					navigation.getParent()?.goBack();
				}, 1000);
				return 'Site Addition Complete! Please Wait...';
			}
		);

	return (
		<NewSiteWrapper
			navigation={navigation}
			page='add-supervisor'
			isSubmitting={isSubmitting}
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
			{entries.map(([name, field], index) => (
				<FormInput
					key={name}
					ref={(element) => {
						formRefs.current[index] = element;
					}}
					type={field.type}
					value={form[name]}
					error={errors[name]}
					blurOnSubmit={index + 1 === entries.length}
					disabled={isSubmitting}
					isLast={index + 1 === entries.length}
					label={[
						field.label ?? humanizeToken(name),
						!field.nullable ? '*' : '',
					].join(' ')}
					onChange={(value) => updateForm(setForm, name, value)}
					onSubmitEditing={() =>
						handleInputSubmitEditing(formRefs, index, handleSubmit)
					}
				/>
			))}
		</NewSiteWrapper>
	);
};
