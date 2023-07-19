import { spawnSync } from 'child_process';
import { mkdir, readFile, readdir, rm, writeFile } from 'fs/promises';
import path from 'path';

import { transform } from '@svgr/core';

import { formatToken } from '~/helpers/string';

import type { Config } from '@svgr/core';

const colors = {
	reset: '\x1b[0m',
	dim: '\x1b[2m',
	blue: '\x1b[34m',
};

const sourceFolder = './src/assets/icons';
const targetFolder = './src/components/app/icons';

const config: Config = {
	expandProps: 'end',
	typescript: true,
	jsxRuntime: 'automatic',
	native: true,
	template: ({ props, jsx, componentName }, { tpl }) => {
		return tpl`
			import { Svg, Path, Circle } from 'react-native-svg';

			import type { SvgProps } from 'react-native-svg';

			export const ${componentName} = (${props}) => (${jsx});
		`;
	},
	svgoConfig: {
		plugins: [
			{
				name: 'preset-default',
				params: {
					overrides: {
						removeViewBox: false,
					},
				},
			},
			'reusePaths',
			'sortAttrs',
			'removeDimensions',
		],
	},
	plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
};

const generateIcons = async (folder?: string) => {
	if (!folder) {
		console.info(`${colors.blue}Deleting existing folder...${colors.reset}`);
		await rm(targetFolder, {
			recursive: true,
			force: true,
		});
		console.info(`${colors.blue}Converting icons...${colors.reset}`);
	}

	const currentTargetFolder = path.join(targetFolder, folder ?? '');

	await mkdir(currentTargetFolder);

	const files = await readdir(path.join(sourceFolder, folder ?? ''), {
		withFileTypes: true,
		recursive: true,
	});

	const indexFile = files
		.filter((row) => row.isFile() && row.name.endsWith('.svg'))
		.map((file) => `export * from './${file.name.replace('.svg', '.icon')}';`)
		.join('\n');

	if (indexFile.trim())
		writeFile(path.join(currentTargetFolder, 'index.tsx'), `${indexFile}\n`);

	return Promise.all(
		files.map(async (file) => {
			if (file.isDirectory()) {
				await generateIcons(file.name);
				return;
			}
			if (!file.isFile() || !file.name.endsWith('.svg')) return;

			const sourcePath = path.join(sourceFolder, folder ?? '', file.name);
			const componentPath = path.join(
				currentTargetFolder,
				file.name.replace('.svg', '.icon.tsx'),
			);
			await readFile(sourcePath, 'utf-8')
				.then(async (value) => {
					const componentName = `${formatToken(
						file.name.replace('.svg', ''),
						'pascal',
					)}Icon`;
					return transform(value, config, { componentName });
				})
				.then(async (data) => {
					console.info(
						`${colors.dim}${sourcePath} -> ${componentPath}${colors.reset}`,
					);
					return writeFile(componentPath, data);
				});
		}),
	).then(() => {
		if (folder) return;
		console.info(
			`${colors.blue}Linting generated components...${colors.reset}`,
		);
		spawnSync('yarn', ['eslint', '--fix', targetFolder]);
		console.info(
			`${colors.blue}Prettifying generated components...${colors.reset}`,
		);
		spawnSync('yarn', ['prettier', '--write', targetFolder]);
	});
};

generateIcons();
