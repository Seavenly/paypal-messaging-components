import type { Load } from '@sveltejs/kit';
import { browser } from '$app/env';

let cache: object;

export const load: Load = async ({ fetch, url }) => {
	if (cache) {
		return {
			status: 200,
			props: cache
		};
	}
	// const url = `https://cms.example.com/article/${params.slug}.json`;
	const dataUrl = `/credit-presentment/smart/modal/modalData${url.search}`;
	const response = await fetch(dataUrl);

	const data = response.ok && (await response.json());

	// Only cache client-side otherwise it messes up SSR on subsequent requests
	if (browser) {
		cache = data;
	}

	return {
		status: response.status,
		props: data
	};
};
