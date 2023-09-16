import { z } from 'zod';

import { replaceString } from './replace-string.helpers';

test('test replaceString', () => {
	const first = {
		response: replaceString('example_string_value', '_', ' '),
		expected: 'example string value',
	} as const;
	expect(first.response).toBe(first.expected);
	z.util.assertEqual<typeof first.response, typeof first.expected>(true);

	const second = {
		response: replaceString('example_string_value', ' ', '-'),
		expected: 'example_string_value',
	} as const;
	expect(second.response).toBe(second.expected);
	z.util.assertEqual<typeof second.response, typeof second.expected>(true);
});
