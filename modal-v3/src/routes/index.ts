import type { RequestEvent, RequestHandlerOutput } from '@sveltejs/kit';
import { getModalData } from 'src/utils/utils';

export function get(req: RequestEvent): RequestHandlerOutput {

    const customData = getModalData(req);
    
    return {
        status: 200,
        body:{
            customData
        }
    };
}