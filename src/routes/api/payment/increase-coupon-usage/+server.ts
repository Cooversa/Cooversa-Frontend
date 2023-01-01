import PocketBase from "pocketbase";
import {PUBLIC_POCKETBASE_URL} from "$env/static/public";
import {PRIVATE_POCKETBASE_ADMIN_EMAIL, PRIVATE_POCKETBASE_ADMIN_PASSWORD} from "$env/static/private";
import type {RequestHandler} from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
    const code = url.searchParams.get('coupon');

    if (!code) {
        return new Response(JSON.stringify({
            message: 'Coupon is required'
        }), {
            status: 400
        })
    }


    try {
        const pbAdmin = new PocketBase(PUBLIC_POCKETBASE_URL);
        await pbAdmin.admins.authWithPassword(PRIVATE_POCKETBASE_ADMIN_EMAIL, PRIVATE_POCKETBASE_ADMIN_PASSWORD);
        // Update coupon usage
        const coupon = await pbAdmin.collection('coupon').getFirstListItem(`code="${code}"`);
        if (coupon) {
            console.log('coupon', coupon.code);
            const usage = coupon.usage + 1;
            const is_active = usage < coupon.max_usage;
            await pbAdmin.collection('coupon').update(coupon.id, {usage, is_active});
        }
    } catch (error: any) {
        return new Response(
            JSON.stringify({
                message: error.message || 'Ooops... something went wrong!'
            }),
            {
                status: 500
            });
    }

    return new Response(
        JSON.stringify({
            message: 'DONE'
        }), {
        status: 200
    });

}