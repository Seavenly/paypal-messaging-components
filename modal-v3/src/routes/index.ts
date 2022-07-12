import type { RequestEvent, RequestHandlerOutput } from '@sveltejs/kit';
import { getModalData } from '../utils/utils';

export function get(req: RequestEvent): RequestHandlerOutput {
    const customData = req.request.headers.get('__X-CUSTOM-SERVER-DATA__');


    const props = getModalData(req);
	console.log(props);

    return {
        status: 200,
        body: {
            props
        }
    };
}