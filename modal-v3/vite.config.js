import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url'; // in Browser, the URL in native accessible on window

import { getModalData } from './utils/utils.js';

/** @type {import('vite').UserConfig} */
const config = defineConfig({
	plugins: [
		sveltekit(),
		{
			name: 'dev-server-data',
			configureServer: server => {
				server.middlewares.use((req, res, next) => {
					const url = new URL(`https://localhost.paypal.com:8090${req.url}`);

					if (url.pathname.includes('/smart/modal') && !url.pathname.includes('.png')) {
						const data = getModalData(req);

						req.headers['x-custom-server-data'] = Buffer.from(JSON.stringify(data)).toString(
							'base64'
						);
					}

					next();
				});
			}
		}
	],
	resolve: {
		alias: {
			'@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src')
		}
	}
});

export default config;
