import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url'; // in Browser, the URL in native accessible on window

/** @type {import('vite').UserConfig} */
const config = defineConfig({
	plugins: [
		sveltekit(),
		{
			name: 'dev-server-data',
			configureServer: (server) => {
				server.middlewares.use((req, res, next) => {
					req.headers['__X-CUSTOM-SERVER-DATA__'] = JSON.stringify({ customData: true });

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
