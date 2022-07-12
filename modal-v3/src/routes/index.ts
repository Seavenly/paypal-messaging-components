import type { RequestEvent, RequestHandlerOutput } from '@sveltejs/kit';
import { getModalData } from '../../src/utils/utils';

export function get({ request }: RequestEvent): RequestHandlerOutput {
	const url = new URL(request.url);

    const customData = getModalData(request);

	return {
		body: {
			zoidInterfaceUrl: 'https://localhost.paypal.com:8080/messaging.js',
			scriptUid: url.searchParams.get('scriptUID'),
			offer: url.searchParams.get('offer'),
            customData
		}
	};
}
