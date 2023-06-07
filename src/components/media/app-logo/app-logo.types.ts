import type { App } from 'types/app';

export type AppLogoProps = App.PropsWithStyle<{
	/** the size of the logo @default 35 */
	size?: number;

	/** the logo's colors @default 'default' */
	type?: 'default' | 'single-color';
}>;
