import type { RequestEvent, RequestHandlerOutput } from '@sveltejs/kit';

export function get({ request }: RequestEvent): RequestHandlerOutput {
	const url = new URL(request.url);

	return {
		body: {
			offer: url.searchParams.get('offer')
		}
	};
}
