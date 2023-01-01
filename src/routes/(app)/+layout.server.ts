import type {LayoutServerLoad} from "../../../.svelte-kit/types/src/routes/(app)/$types";
import {redirect} from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({locals}) => {
    // if (!locals.user) {
    //     throw redirect(302,'/auth/login');
    // }
}