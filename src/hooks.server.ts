import type {Handle} from "@sveltejs/kit";
import pocketbase from "$lib/pocketbase";
import PocketBase from "pocketbase";
import {PUBLIC_POCKETBASE_URL} from "$env/static/public";

export const handle: Handle = async ({event, resolve}) => {
    const pocketbase = new PocketBase(PUBLIC_POCKETBASE_URL);


    pocketbase.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        pocketbase.authStore.isValid && await pocketbase.collection('users').authRefresh();
    } catch (_) {
        // clear the auth store on failed refresh
        pocketbase.authStore.clear();
    }


    const response = await resolve(event);

    response.headers.set('set-cookie', pocketbase.authStore.exportToCookie());

    return response;
};