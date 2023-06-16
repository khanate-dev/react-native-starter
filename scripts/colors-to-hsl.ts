import { readFile, writeFile } from 'fs/promises';

import { convertColor, HEX_REGEX, RGB_REGEX } from 'helpers/color';

export const convertColorsToHsl = async () => {
	const file = await readFile('./src/styles/theme/theme.styles.ts', 'utf8');
	const converted = file
		.replace(new RegExp(RGB_REGEX, 'gu'), (match) =>
			convertColor('rgb', 'hsl', match)
		)
		.replace(new RegExp(HEX_REGEX, 'gu'), (match) =>
			convertColor('hex', 'hsl', match)
		);
	return writeFile('./src/styles/theme/theme.styles.ts', converted);
};

convertColorsToHsl();
