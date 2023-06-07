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
