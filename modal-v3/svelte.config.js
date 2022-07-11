import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		paths: {
			base: '/credit-presentment/smart/modal'
		}
	},

	// TODO: figure out how to deal with the "unused" css properly
	onwarn: (warning, handler) => {
		const { code } = warning;

		if (code === 'css-unused-selector') return;

		handler(warning);
	}
};

export default config;
