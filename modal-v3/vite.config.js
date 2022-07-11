import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
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
	]
};

export default config;
