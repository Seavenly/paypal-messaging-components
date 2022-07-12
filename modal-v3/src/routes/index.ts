import type { RequestEvent, RequestHandlerOutput } from '@sveltejs/kit';
import { getModalData } from '../utils/utils';

export function get(req: RequestEvent): RequestHandlerOutput {


    const customData = getModalData(req);
	console.log(customData)

    return {
        status: 200,
        body: {
            customData
        }
    };
}