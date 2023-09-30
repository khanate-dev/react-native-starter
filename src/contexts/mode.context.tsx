import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { Appearance } from 'react-native';

import { events } from '~/helpers/events.helpers';

import type { PropsWithChildren, Reducer } from 'react';

const modes = ['system', 'dark', 'light'] as const;

export type Mode = (typeof modes)[number];

export type ModeState = { setting: Mode; scheme: Exclude<Mode, 'system'> };

const isMode = (val: unknown): val is Mode => {
	return modes.includes(String(val));
};

const defaultModeState: ModeState = {
	setting: 'system',
	scheme: Appearance.getColorScheme() ?? 'light',
};

const ModeContext = createContext<ModeState>(defaultModeState);

export const ModeProvider = ({ children }: PropsWithChildren) => {
	const [mode, dispatch] = useReducer<
		Reducer<ModeState, Mode | ((prev: Mode) => Mode)>
	>((state, action) => {
		const value = typeof action === 'function' ? action(state.setting) : action;
		return {
			setting: value,
			scheme:
				value === 'system' ? Appearance.getColorScheme() ?? 'light' : value,
		};
	}, defaultModeState);

	useEffect(() => {
		const toggleListener = events.listen('toggleMode', () => {
			dispatch((prev) => {
				const newMode =
					prev === 'system' ? 'light' : prev === 'light' ? 'dark' : 'system';
				AsyncStorage.setItem('mode', newMode);
				return newMode;
			});
		});

		(async () => {
			const stored = await AsyncStorage.getItem('mode');
			if (!isMode(stored)) {
				await AsyncStorage.setItem('mode', 'system');
				dispatch('system');
				return;
			}
			dispatch(stored);
		})();

		const appearanceListener = Appearance.addChangeListener(
			({ colorScheme }) => {
				dispatch(colorScheme ?? 'light');
			},
		);

		return () => {
			toggleListener.remove();
			appearanceListener.remove();
		};
	}, []);

	return <ModeContext.Provider value={mode}>{children}</ModeContext.Provider>;
};

export const useMode = () => {
	const mode = useContext(ModeContext);
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (mode === undefined)
		throw new Error('useMode must be used within an ModeProvider');
	return mode;
};

export const toggleMode = () => {
	events.emit('toggleMode');
};
