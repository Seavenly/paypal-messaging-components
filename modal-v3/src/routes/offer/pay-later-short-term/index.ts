import type { RequestEvent, RequestHandlerOutput } from '@sveltejs/kit';

export function get({ request }: RequestEvent): RequestHandlerOutput {
	const customData = request.headers.get('__X-CUSTOM-SERVER-DATA__');
	const url = new URL(request.url);

	if (customData) {
		console.log('customData', customData);
	}

	return {
		status: 200,
		body: {
			zoidInterfaceUrl: 'https://localhost.paypal.com:8080/messaging.js',
			scriptUid: url.searchParams.get('scriptUID'),
			customData
		}
	};
}
