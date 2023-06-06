/* eslint-disable import/no-default-export */
export declare global {
	/** global type alias for a generic object type */
	type Obj = Record<string, unknown>;
}

declare module '*.mp3' {
	const value: string;
	export default value;
}

declare module '*.wav' {
	const value: string;
	export default value;
}

declare module '*.jpg' {
	const value: string;
	export default value;
}

declare module '*.png' {
	const value: string;
	export default value;
}

declare module '*.svg' {
	const value: string;
	export default value;
}
