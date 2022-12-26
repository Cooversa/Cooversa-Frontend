import type {RequestHandler} from "@sveltejs/kit";
import {sendWelcomeEmail} from "./helpers";

export const GET: RequestHandler = async ({url}) => {

    const email = url.searchParams.get('email');
    const name = url.searchParams.get('name');

    if (!email || !name) {
        return new Response(JSON.stringify({
            message: 'Email and name are required'
        }), {
            status: 400
        })
    }

    try {
        await sendWelcomeEmail(email, name);
    } catch (error: any) {
        return new Response(
            JSON.stringify({
                message: error.message || 'Ooops... something went wrong!'
            }),
            {
                status: 500
            });
    }


    return new Response(JSON.stringify({
        message: 'DONE',
    }), {
        status: 200,
    })
}