import type { LinearGradientProps } from 'expo-linear-gradient';

export const gradients = [
	['#e66', '#eaa'],
	['#9d9', '#2dd'],
	['#48c', '#8cf'],
	['#b7b', '#faf'],
	['#ea6', '#faa'],
	['#aa9', '#cc7'],
] as const;

export const getGradientByIndex = (index: number) =>
	gradients[
		(index % gradients.length) + Math.floor(index / gradients.length)
	] ?? gradients[0];

export const getHeadingGradientProps = (
	theme: Record<string, string>
): LinearGradientProps => {
	const start = theme['color-primary-400'] ?? '#662B8C';
	const end = theme['color-primary-200'] ?? '#ED00B9';

	return {
		colors: [start, end],
		start: { x: 0, y: 0 },
		end: { x: 0.1, y: 1 },
	};
};
