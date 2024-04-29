import { z } from 'zod';

import { formatToken } from './format-token.helpers.ts';

describe('test formatString', () => {
	it('should convert the 1st test string', () => {
		const input = 'thisIsSomeTestString';
		const expected = {
			camel: 'thisIsSomeTestString',
			pascal: 'ThisIsSomeTestString',
			snake: 'this_is_some_test_string',
			kebab: 'this-is-some-test-string',
			constant: 'THIS_IS_SOME_TEST_STRING',
			human: 'this is some test string',
		} as const;
		const response = {
			camel: formatToken(input, 'camel'),
			pascal: formatToken(input, 'pascal'),
			snake: formatToken(input, 'snake'),
			kebab: formatToken(input, 'kebab'),
			constant: formatToken(input, 'constant'),
			human: formatToken(input, 'human'),
		};

		expect(expected.camel).toStrictEqual(response.camel);
		z.util.assertIs<typeof response.camel>(expected.camel);

		expect(expected.pascal).toStrictEqual(response.pascal);
		z.util.assertIs<typeof response.pascal>(expected.pascal);

		expect(expected.snake).toStrictEqual(response.snake);
		z.util.assertIs<typeof response.snake>(expected.snake);

		expect(expected.kebab).toStrictEqual(response.kebab);
		z.util.assertIs<typeof response.kebab>(expected.kebab);

		expect(expected.constant).toStrictEqual(response.constant);
		z.util.assertIs<typeof response.constant>(expected.constant);

		expect(expected.human).toStrictEqual(response.human);
		z.util.assertIs<typeof response.human>(expected.human);
	});

	it('should convert the 2nd test string', () => {
		const input =
			'this is 1 VERY     badly   -----formatted.......##  STRING. \n sequence';
		const expected = {
			camel: 'thisIs1VeryBadlyFormattedStringSequence',
			pascal: 'ThisIs1VeryBadlyFormattedStringSequence',
			snake: 'this_is_1_very_badly_formatted_string_sequence',
			kebab: 'this-is-1-very-badly-formatted-string-sequence',
			constant: 'THIS_IS_1_VERY_BADLY_FORMATTED_STRING_SEQUENCE',
			human: 'this is 1 very badly formatted string sequence',
		} as const;
		const response = {
			camel: formatToken(input, 'camel'),
			pascal: formatToken(input, 'pascal'),
			snake: formatToken(input, 'snake'),
			kebab: formatToken(input, 'kebab'),
			constant: formatToken(input, 'constant'),
			human: formatToken(input, 'human'),
		};

		expect(expected.camel).toStrictEqual(response.camel);
		z.util.assertIs<typeof response.camel>(expected.camel);

		expect(expected.pascal).toStrictEqual(response.pascal);
		z.util.assertIs<typeof response.pascal>(expected.pascal);

		expect(expected.snake).toStrictEqual(response.snake);
		z.util.assertIs<typeof response.snake>(expected.snake);

		expect(expected.kebab).toStrictEqual(response.kebab);
		z.util.assertIs<typeof response.kebab>(expected.kebab);

		expect(expected.constant).toStrictEqual(response.constant);
		z.util.assertIs<typeof response.constant>(expected.constant);

		expect(expected.human).toStrictEqual(response.human);
		z.util.assertIs<typeof response.human>(expected.human);
	});

	it('should convert the 3rd test string', () => {
		const input = '----SaleOrderID----';
		const expected = {
			camel: 'saleOrderId',
			pascal: 'SaleOrderId',
			snake: 'sale_order_id',
			kebab: 'sale-order-id',
			constant: 'SALE_ORDER_ID',
			human: 'sale order id',
		} as const;
		const response = {
			camel: formatToken(input, 'camel'),
			pascal: formatToken(input, 'pascal'),
			snake: formatToken(input, 'snake'),
			kebab: formatToken(input, 'kebab'),
			constant: formatToken(input, 'constant'),
			human: formatToken(input, 'human'),
		};

		expect(expected.camel).toStrictEqual(response.camel);
		z.util.assertIs<typeof response.camel>(expected.camel);

		expect(expected.pascal).toStrictEqual(response.pascal);
		z.util.assertIs<typeof response.pascal>(expected.pascal);

		expect(expected.snake).toStrictEqual(response.snake);
		z.util.assertIs<typeof response.snake>(expected.snake);

		expect(expected.kebab).toStrictEqual(response.kebab);
		z.util.assertIs<typeof response.kebab>(expected.kebab);

		expect(expected.constant).toStrictEqual(response.constant);
		z.util.assertIs<typeof response.constant>(expected.constant);

		expect(expected.human).toStrictEqual(response.human);
		z.util.assertIs<typeof response.human>(expected.human);
	});

	it('should convert the 4th test string', () => {
		const input = 'alpha-   123numeric';
		const expected = {
			camel: 'alpha123Numeric',
			pascal: 'Alpha123Numeric',
			snake: 'alpha_123_numeric',
			kebab: 'alpha-123-numeric',
			constant: 'ALPHA_123_NUMERIC',
			human: 'alpha 123 numeric',
		} as const;
		const response = {
			camel: formatToken(input, 'camel'),
			pascal: formatToken(input, 'pascal'),
			snake: formatToken(input, 'snake'),
			kebab: formatToken(input, 'kebab'),
			constant: formatToken(input, 'constant'),
			human: formatToken(input, 'human'),
		};

		expect(expected.camel).toStrictEqual(response.camel);
		z.util.assertIs<typeof response.camel>(expected.camel);

		expect(expected.pascal).toStrictEqual(response.pascal);
		z.util.assertIs<typeof response.pascal>(expected.pascal);

		expect(expected.snake).toStrictEqual(response.snake);
		z.util.assertIs<typeof response.snake>(expected.snake);

		expect(expected.kebab).toStrictEqual(response.kebab);
		z.util.assertIs<typeof response.kebab>(expected.kebab);

		expect(expected.constant).toStrictEqual(response.constant);
		z.util.assertIs<typeof response.constant>(expected.constant);

		expect(expected.human).toStrictEqual(response.human);
		z.util.assertIs<typeof response.human>(expected.human);
	});

	it('should convert the 5th test string', () => {
		const input = '    Folder - file-2';
		const expected = {
			camel: 'folderFile2',
			pascal: 'FolderFile2',
			snake: 'folder_file_2',
			kebab: 'folder-file-2',
			constant: 'FOLDER_FILE_2',
			human: 'folder file 2',
		} as const;
		const response = {
			camel: formatToken(input, 'camel'),
			pascal: formatToken(input, 'pascal'),
			snake: formatToken(input, 'snake'),
			kebab: formatToken(input, 'kebab'),
			constant: formatToken(input, 'constant'),
			human: formatToken(input, 'human'),
		};

		expect(expected.camel).toStrictEqual(response.camel);
		z.util.assertIs<typeof response.camel>(expected.camel);

		expect(expected.pascal).toStrictEqual(response.pascal);
		z.util.assertIs<typeof response.pascal>(expected.pascal);

		expect(expected.snake).toStrictEqual(response.snake);
		z.util.assertIs<typeof response.snake>(expected.snake);

		expect(expected.kebab).toStrictEqual(response.kebab);
		z.util.assertIs<typeof response.kebab>(expected.kebab);

		expect(expected.constant).toStrictEqual(response.constant);
		z.util.assertIs<typeof response.constant>(expected.constant);

		expect(expected.human).toStrictEqual(response.human);
		z.util.assertIs<typeof response.human>(expected.human);
	});

	it('should convert the 6th test string', () => {
		const input = 'api helpers.helpers.js';
		const expected = {
			camel: 'apiHelpersHelpersJs',
			pascal: 'ApiHelpersHelpersJs',
			snake: 'api_helpers_helpers_js',
			kebab: 'api-helpers-helpers-js',
			constant: 'API_HELPERS_HELPERS_JS',
			human: 'api helpers helpers js',
		} as const;
		const response = {
			camel: formatToken(input, 'camel'),
			pascal: formatToken(input, 'pascal'),
			snake: formatToken(input, 'snake'),
			kebab: formatToken(input, 'kebab'),
			constant: formatToken(input, 'constant'),
			human: formatToken(input, 'human'),
		};

		expect(expected.camel).toStrictEqual(response.camel);
		z.util.assertIs<typeof response.camel>(expected.camel);

		expect(expected.pascal).toStrictEqual(response.pascal);
		z.util.assertIs<typeof response.pascal>(expected.pascal);

		expect(expected.snake).toStrictEqual(response.snake);
		z.util.assertIs<typeof response.snake>(expected.snake);

		expect(expected.kebab).toStrictEqual(response.kebab);
		z.util.assertIs<typeof response.kebab>(expected.kebab);

		expect(expected.constant).toStrictEqual(response.constant);
		z.util.assertIs<typeof response.constant>(expected.constant);

		expect(expected.human).toStrictEqual(response.human);
		z.util.assertIs<typeof response.human>(expected.human);
	});

	it('should convert the 7th test string', () => {
		const input = 'ThisIsSomeTestString';
		const expected = {
			camel: 'thisIsSomeTestString',
			pascal: 'ThisIsSomeTestString',
			snake: 'this_is_some_test_string',
			kebab: 'this-is-some-test-string',
			constant: 'THIS_IS_SOME_TEST_STRING',
			human: 'this is some test string',
		} as const;
		const response = {
			camel: formatToken(input, 'camel'),
			pascal: formatToken(input, 'pascal'),
			snake: formatToken(input, 'snake'),
			kebab: formatToken(input, 'kebab'),
			constant: formatToken(input, 'constant'),
			human: formatToken(input, 'human'),
		};

		expect(expected.camel).toStrictEqual(response.camel);
		z.util.assertIs<typeof response.camel>(expected.camel);

		expect(expected.pascal).toStrictEqual(response.pascal);
		z.util.assertIs<typeof response.pascal>(expected.pascal);

		expect(expected.snake).toStrictEqual(response.snake);
		z.util.assertIs<typeof response.snake>(expected.snake);

		expect(expected.kebab).toStrictEqual(response.kebab);
		z.util.assertIs<typeof response.kebab>(expected.kebab);

		expect(expected.constant).toStrictEqual(response.constant);
		z.util.assertIs<typeof response.constant>(expected.constant);

		expect(expected.human).toStrictEqual(response.human);
		z.util.assertIs<typeof response.human>(expected.human);
	});

	it('should convert the 8th test string', () => {
		const input = 'this_is_some_test_string';
		const expected = {
			camel: 'thisIsSomeTestString',
			pascal: 'ThisIsSomeTestString',
			snake: 'this_is_some_test_string',
			kebab: 'this-is-some-test-string',
			constant: 'THIS_IS_SOME_TEST_STRING',
			human: 'this is some test string',
		} as const;
		const response = {
			camel: formatToken(input, 'camel'),
			pascal: formatToken(input, 'pascal'),
			snake: formatToken(input, 'snake'),
			kebab: formatToken(input, 'kebab'),
			constant: formatToken(input, 'constant'),
			human: formatToken(input, 'human'),
		};

		expect(expected.camel).toStrictEqual(response.camel);
		z.util.assertIs<typeof response.camel>(expected.camel);

		expect(expected.pascal).toStrictEqual(response.pascal);
		z.util.assertIs<typeof response.pascal>(expected.pascal);

		expect(expected.snake).toStrictEqual(response.snake);
		z.util.assertIs<typeof response.snake>(expected.snake);

		expect(expected.kebab).toStrictEqual(response.kebab);
		z.util.assertIs<typeof response.kebab>(expected.kebab);

		expect(expected.constant).toStrictEqual(response.constant);
		z.util.assertIs<typeof response.constant>(expected.constant);

		expect(expected.human).toStrictEqual(response.human);
		z.util.assertIs<typeof response.human>(expected.human);
	});

	it('should convert the 9th test string', () => {
		const input = 'this-is-some-test-string';
		const expected = {
			camel: 'thisIsSomeTestString',
			pascal: 'ThisIsSomeTestString',
			snake: 'this_is_some_test_string',
			kebab: 'this-is-some-test-string',
			constant: 'THIS_IS_SOME_TEST_STRING',
			human: 'this is some test string',
		} as const;
		const response = {
			camel: formatToken(input, 'camel'),
			pascal: formatToken(input, 'pascal'),
			snake: formatToken(input, 'snake'),
			kebab: formatToken(input, 'kebab'),
			constant: formatToken(input, 'constant'),
			human: formatToken(input, 'human'),
		};

		expect(expected.camel).toStrictEqual(response.camel);
		z.util.assertIs<typeof response.camel>(expected.camel);

		expect(expected.pascal).toStrictEqual(response.pascal);
		z.util.assertIs<typeof response.pascal>(expected.pascal);

		expect(expected.snake).toStrictEqual(response.snake);
		z.util.assertIs<typeof response.snake>(expected.snake);

		expect(expected.kebab).toStrictEqual(response.kebab);
		z.util.assertIs<typeof response.kebab>(expected.kebab);

		expect(expected.constant).toStrictEqual(response.constant);
		z.util.assertIs<typeof response.constant>(expected.constant);

		expect(expected.human).toStrictEqual(response.human);
		z.util.assertIs<typeof response.human>(expected.human);
	});

	it('should convert the 10th test string', () => {
		const input = 'THIS_IS_SOME_TEST_STRING';
		const expected = {
			camel: 'thisIsSomeTestString',
			pascal: 'ThisIsSomeTestString',
			snake: 'this_is_some_test_string',
			kebab: 'this-is-some-test-string',
			constant: 'THIS_IS_SOME_TEST_STRING',
			human: 'this is some test string',
		} as const;
		const response = {
			camel: formatToken(input, 'camel'),
			pascal: formatToken(input, 'pascal'),
			snake: formatToken(input, 'snake'),
			kebab: formatToken(input, 'kebab'),
			constant: formatToken(input, 'constant'),
			human: formatToken(input, 'human'),
		};

		expect(expected.camel).toStrictEqual(response.camel);
		z.util.assertIs<typeof response.camel>(expected.camel);

		expect(expected.pascal).toStrictEqual(response.pascal);
		z.util.assertIs<typeof response.pascal>(expected.pascal);

		expect(expected.snake).toStrictEqual(response.snake);
		z.util.assertIs<typeof response.snake>(expected.snake);

		expect(expected.kebab).toStrictEqual(response.kebab);
		z.util.assertIs<typeof response.kebab>(expected.kebab);

		expect(expected.constant).toStrictEqual(response.constant);
		z.util.assertIs<typeof response.constant>(expected.constant);

		expect(expected.human).toStrictEqual(response.human);
		z.util.assertIs<typeof response.human>(expected.human);
	});
});
