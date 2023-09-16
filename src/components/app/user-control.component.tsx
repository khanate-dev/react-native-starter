import { useState } from 'react';
import { Image, View } from 'react-native';
import { Divider, Menu, Text, TouchableRipple } from 'react-native-paper';

import { Icon } from '~/components/app/icon.component';
import { Button } from '~/components/controls/button.component';
import { logout, useUserOrNull } from '~/contexts/auth.context';
import { useI18n } from '~/contexts/i18n.context';
import { useTheme } from '~/hooks/theme.hook';

import type { ImageStyle, StyleProp, ViewStyle } from 'react-native';

const Avatar = (props: {
	size: number;
	style?: StyleProp<ImageStyle>;
	url: string | null;
}) => {
	const theme = useTheme();

	if (props.url) {
		return (
			<Image
				style={[
					{
						width: props.size,
						height: props.size,
						borderRadius: 10,
						marginLeft: 'auto',
						marginRight: 'auto',
					},
					props.style,
				]}
				source={{
					uri: props.url,
					width: props.size,
					height: props.size,
				}}
			/>
		);
	}
	return (
		<Icon
			name='user-account'
			color={theme.colors.primary}
			size={props.size - 5}
			style={[
				{ padding: 2.5, marginLeft: 'auto', marginRight: 'auto' },
				props.style,
			]}
		/>
	);
};

export type UserControlProps = {
	buttonStyle?: StyleProp<ViewStyle>;
};

export const UserControl = ({ buttonStyle }: UserControlProps) => {
	const user = useUserOrNull();
	const theme = useTheme();
	const { content } = useI18n();

	const [visible, setVisible] = useState(false);

	if (!user) return null;

	return (
		<Menu
			visible={visible}
			anchorPosition='bottom'
			contentStyle={{ padding: 8, borderRadius: 10 }}
			anchor={
				<TouchableRipple
					style={[
						{
							borderRadius: 10,
							marginHorizontal: 7,
							padding: 2.5,
							backgroundColor: theme.colors.primaryContainer,
						},
						buttonStyle,
					]}
					borderless
					onPress={() => {
						setVisible(true);
					}}
				>
					<Avatar
						size={35}
						url={user.image_url}
					/>
				</TouchableRipple>
			}
			onDismiss={() => {
				setVisible(false);
			}}
		>
			<View style={{ gap: 0, minWidth: 150 }}>
				<Avatar
					size={70}
					url={user.image_url}
					style={{
						borderWidth: user.image_url ? 3 : undefined,
						borderColor: theme.colors.primaryContainer,
						marginBottom: 5,
					}}
				/>
				<Text
					variant='titleMedium'
					style={{ color: theme.colors.primary, textAlign: 'center' }}
					numberOfLines={1}
				>
					{user.name}
				</Text>
				<Text
					variant='labelMedium'
					style={{ color: theme.colors.primary, textAlign: 'center' }}
					numberOfLines={1}
				>
					{user.email}
				</Text>
				<Divider
					style={{ marginVertical: 10 }}
					bold
				/>
				<Button
					icon='logout'
					label={content.action.logout}
					color='error'
					mode='outlined'
					onPress={logout}
				/>
			</View>
		</Menu>
	);
};
