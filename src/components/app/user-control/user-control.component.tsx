import { Divider, Menu, Text, TouchableRipple } from 'react-native-paper';
import { useState } from 'react';
import { Image, View } from 'react-native';

import { useTheme } from 'hooks/theme';
import { Icon } from 'components/app/icon';
import { useUserOrNull } from 'contexts/auth';
import { Button } from 'components/controls/button';

import type { StyleProp, ViewStyle } from 'react-native';

export type UserControlProps = {
	buttonStyle?: StyleProp<ViewStyle>;
};

export const UserControl = ({ buttonStyle }: UserControlProps) => {
	const user = useUserOrNull();
	const theme = useTheme();

	const [visible, setVisible] = useState(false);

	if (!user) return null;

	const avatar = user.image_url ? (
		<Image
			style={{
				width: 35,
				height: 35,
				borderRadius: 10,
			}}
			source={{
				uri: user.image_url,
				width: 35,
				height: 35,
			}}
		/>
	) : (
		<Icon
			name='user-account'
			color={theme.colors.primary}
			size={30}
			style={{ padding: 2.5 }}
		/>
	);

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
					onPress={() => setVisible(true)}
				>
					{avatar}
				</TouchableRipple>
			}
			onDismiss={() => setVisible(false)}
		>
			<View style={{ gap: 5, minWidth: 150 }}>
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
					label='logout'
					color='error'
					mode='outlined'
					onPress={() => false}
				/>
			</View>
		</Menu>
	);
};
