import type { RequestEvent, RequestHandlerOutput } from '@sveltejs/kit';

export function get(req: RequestEvent): RequestHandlerOutput {
    return {
        status: 200,
    };
}