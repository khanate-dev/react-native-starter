import { useRef, useState } from 'react';
import { View } from 'react-native';
import { Text, useStyleSheet, useTheme } from '@ui-kitten/components';
import MapView, { Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import {
	updateForm,
	handleInputSubmitEditing,
	trySubmission,
} from 'helpers/form';
import { getDefaultFormState } from 'helpers/defaults';

import { useLoading, setIsLoading } from 'contexts/loading';
import { useOwnerUser } from 'contexts/user';
import { siteFields as fields, siteFormSchema } from 'schemas/site';
import { addSite } from 'endpoints/site';
import { humanizeToken } from 'helpers/string';
import { FormInput } from 'components/form/FormInput';
import { FormButton } from 'components/form/FormButton';
import { objectEntries } from 'helpers/object';

import { NewSiteWrapper } from '../wrapper';

import { addSiteStyles } from './add-site.styles';

import type { FormErrors, FormState } from 'types/form';
import type { AlertStatus } from 'types/general';
import type { NewSitePageProps } from '../new-site.types';
import type { SiteField } from 'schemas/site';
import type { Region } from 'react-native-maps';
import type { Input } from '@ui-kitten/components';

const DELTA = 0.02;

export const AddSite = ({ navigation }: NewSitePageProps<'add-site'>) => {
	const owner = useOwnerUser();

	const theme = useTheme();
	const styles = useStyleSheet(addSiteStyles);
	const isLoading = useLoading();
	const formRefs = useRef<(null | Input)[]>([]);

	const [form, setForm] = useState<FormState<SiteField>>(
		getDefaultFormState(fields)
	);
	const [errors, setErrors] = useState<FormErrors<SiteField>>({});
	const [region, setRegion] = useState<undefined | Region>(undefined);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [status, setStatus] = useState<AlertStatus>(null);

	const entries = objectEntries(fields);

	const getAddressFromRegion = async (options?: {
		regionOverride?: Region;
		isGrantedAccess?: boolean;
		skipAddress?: boolean;
	}) => {
		try {
			setIsLoading(true);
			setStatus(null);

			if (!options?.isGrantedAccess) {
				const { status } = await Location.requestForegroundPermissionsAsync();
				if (status !== 'granted') return;
			}

			const location = options?.regionOverride ?? region;
			if (!location) return;

			const [details] = await Location.reverseGeocodeAsync(location);
			if (!details) return;
			const { city, name, district } = details;

			city && updateForm(setForm, 'City', city);

			if (options?.skipAddress) return;
			const newAddress = [name, district, city]
				.filter((name) => name)
				.join(', ');
			newAddress && updateForm(setForm, 'Address', newAddress);
		} catch (error: any) {
			setStatus(`Location Error: ${error.message ?? error}`);
			setTimeout(() => setStatus(null), 3000);
		} finally {
			setIsLoading(false);
		}
	};

	const getUserLocation = async () => {
		try {
			setIsLoading(true);
			setStatus(null);

			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') return;

			const location = await Location.getCurrentPositionAsync({});

			const newRegion: Region = {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
				latitudeDelta: DELTA,
				longitudeDelta: DELTA,
			};
			setRegion(newRegion);

			getAddressFromRegion({
				regionOverride: newRegion,
				isGrantedAccess: true,
			});
		} catch (error: any) {
			setStatus(`Location Error: ${error.message ?? error}`);
			setTimeout(() => setStatus(null), 3000);
		} finally {
			setIsLoading(false);
		}
	};

	const getRegionFromAddress = async () => {
		try {
			if (!form.Address) return;

			setIsLoading(true);
			setStatus(null);

			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') return;

			const [result] = await Location.geocodeAsync(form.Address);

			if (!result) throw new Error('Invalid Address!');

			const newRegion = {
				latitude: result.latitude,
				longitude: result.longitude,
				latitudeDelta: DELTA,
				longitudeDelta: DELTA,
			};

			setRegion(newRegion);

			getAddressFromRegion({
				regionOverride: newRegion,
				isGrantedAccess: true,
				skipAddress: true,
			});
		} catch (error: any) {
			setStatus(`Location Error: ${error.message ?? error}`);
			setTimeout(() => setStatus(null), 3000);
		} finally {
			setIsLoading(false);
		}
	};

	const handleMapLocationChange = (newRegion: Region) => {
		setRegion(newRegion);
		updateForm(
			setForm,
			'Gps',
			`${newRegion.latitude.toFixed(5)}, ${newRegion.longitude.toFixed(5)}`
		);
	};

	const handleSubmit = () =>
		trySubmission(
			fields,
			setErrors,
			setStatus,
			setIsSubmitting,
			form,
			async (state) => {
				const body = siteFormSchema.parse(state);
				const addedSite = await addSite(body);
				setTimeout(() => {
					navigation.navigate('add-sheds', {
						owner,
						site: addedSite,
					});
				}, 1000);
				return 'Site Added! Please Wait...';
			}
		);

	return (
		<NewSiteWrapper
			navigation={navigation}
			page='add-site'
			isSubmitting={isSubmitting}
			isLoading={isLoading}
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
					isLast={index + 1 === entries.length}
					disabled={isLoading || isSubmitting}
					label={[
						field.label ?? humanizeToken(name),
						!field.nullable ? '*' : '',
					].join(' ')}
					button={
						name === 'Address'
							? {
									style: styles.geoLocation,
									onPress: getRegionFromAddress,
									label: 'Get GPS',
									disabled: !form.Address.trim(),
									iconLeft: 'map-outline',
									isLoading,
							  }
							: undefined
					}
					onChange={(value) => updateForm(setForm, name, value)}
					onSubmitEditing={() =>
						handleInputSubmitEditing(formRefs, index, handleSubmit)
					}
				/>
			))}

			<Text
				style={styles.mapLabel}
				appearance='hint'
				category='c1'
			>
				Select Location
			</Text>

			<View
				style={[styles.mapContainer, Boolean(status) && styles.mapWithStatus]}
			>
				{region && (
					<>
						<View style={styles.horizontalLine} />
						<View style={styles.verticalLine} />
					</>
				)}

				<View style={styles.mapActions}>
					<FormButton
						status='primary'
						size='small'
						label='My Location'
						iconLeft='navigation-2-outline'
						borders='rounded'
						isLoading={isLoading}
						noMargin
						onPress={getUserLocation}
					/>
					<FormButton
						style={styles.mapActionNotFirst}
						status='danger'
						size='small'
						label='Get Address'
						iconLeft='bulb-outline'
						borders='rounded'
						isLoading={isLoading}
						disabled={!region}
						onPress={async () => getAddressFromRegion()}
					/>
				</View>

				<MapView
					style={styles.map}
					region={region}
					provider='google'
					onRegionChangeComplete={handleMapLocationChange}
				>
					{region && (
						<Circle
							center={region}
							radius={150}
							strokeColor={theme['color-primary-500']}
							strokeWidth={2}
							fillColor={theme['color-primary-transparent-100']}
							zIndex={10000}
						/>
					)}
				</MapView>
			</View>
		</NewSiteWrapper>
	);
};
