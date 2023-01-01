import type {LayoutServerLoad} from "../../../../../.svelte-kit/types/src/routes/(unauthed)/auth/login/$types";
import {redirect} from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({locals}) => {
    if (locals.user) {
        throw redirect(302,'/dashboard');
    }
}