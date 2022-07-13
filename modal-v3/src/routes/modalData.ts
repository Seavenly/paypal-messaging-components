import type { RequestEvent, RequestHandlerOutput } from '@sveltejs/kit';

export function get({ request }: RequestEvent): RequestHandlerOutput {
	const url = new URL(request.url);
	const jsonDataString = Buffer.from(
		request.headers.get('x-custom-server-data') ?? Buffer.from('{}').toString('base64'),
		'base64'
	).toString('utf8');
	const modalData = JSON.parse(jsonDataString);

	return {
		body: {
			zoidInterfaceUrl: 'https://localhost.paypal.com:8080/messaging.js',
			scriptUid: url.searchParams.get('scriptUID'),
			offer: url.searchParams.get('offer'),
			modalData
		}
	};
}
