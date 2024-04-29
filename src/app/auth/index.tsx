import { Text } from 'react-native-paper';

import { ButtonLink } from '../../components/controls/button-link.component.js';
import { ScreenWrapper } from '../../components/layout/screen-wrapper.component.js';
import { useTheme } from '../../hooks/theme.hook.js';
import { useI18n } from '../../i18n.js';

const Auth = () => {
	const theme = useTheme();
	const { content } = useI18n();

	return (
		<ScreenWrapper
			style={{
				flexGrow: 1,
				padding: 40,
				gap: 20,
			}}
		>
			<Text
				variant='headlineLarge'
				style={theme.styles.text.heading}
			>
				{content.headings.welcome}
			</Text>

			<ButtonLink
				href='/auth/register'
				label={content.action.register}
			/>

			<ButtonLink
				href='/auth/login'
				label={content.action.login}
			/>
		</ScreenWrapper>
	);
};

export default Auth;
