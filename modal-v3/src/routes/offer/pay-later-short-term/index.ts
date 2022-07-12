import type { RequestEvent, RequestHandlerOutput } from '@sveltejs/kit';
import { getModalData } from '../../../utils/utils';

export function get({ request }: RequestEvent): RequestHandlerOutput {
	const url = new URL(request.url);

	const customData = getModalData(request);

	return {
		status: 200,
		body: {
			zoidInterfaceUrl: 'https://localhost.paypal.com:8080/messaging.js',
			scriptUid: url.searchParams.get('scriptUID'),
			customData
		}
	};
}
