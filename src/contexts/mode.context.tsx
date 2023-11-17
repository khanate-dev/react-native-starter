import { createContext, useContext, useEffect, useReducer } from 'react';
import { Appearance } from 'react-native';
import { z } from 'zod';

import { events } from '../helpers/events.helpers.ts';
import { createStore } from '../helpers/store.helpers.ts';

import type { PropsWithChildren, Reducer } from 'react';

const modes = ['system', 'dark', 'light'] as const;

export type Mode = (typeof modes)[number];

export type ModeState = { setting: Mode; scheme: Exclude<Mode, 'system'> };

const modeStore = createStore({
	key: 'mode',
	secureStore: false,
	schema: z.enum(modes),
	defaultVal: 'system',
});

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
				modeStore.set(newMode);
				return newMode;
			});
		});

		(async () => {
			dispatch(await modeStore.get());
		})();

		const appearanceListener = Appearance.addChangeListener(() => {
			dispatch('system');
		});

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
