import type { RequestEvent, RequestHandlerOutput } from '@sveltejs/kit';

export function get({ request }: RequestEvent): RequestHandlerOutput {
	const url = new URL(request.url);

	return {
		status: 200,
		body: {
			zoidInterfaceUrl: 'https://localhost.paypal.com:8080/messaging.js',
			scriptUid: url.searchParams.get('scriptUID'),
		}
	};
}
