import {redirect} from "@sveltejs/kit";
import pocketbase from "$lib/pocketbase";

export const load = async ( ) => {
    if (pocketbase.authStore.token) {
        throw redirect(301, '/dashboard');
    }
}