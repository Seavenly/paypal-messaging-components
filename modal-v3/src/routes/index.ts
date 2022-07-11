import type { RequestEvent, RequestHandlerOutput } from '@sveltejs/kit';

export function get(req: RequestEvent): RequestHandlerOutput {
	const customData = req.request.headers.get('__X-CUSTOM-SERVER-DATA__');

	if (customData) {
		console.log('customData', customData);
	}

	return {
		status: 200,
		body: {
			customData
		}
	};
}
