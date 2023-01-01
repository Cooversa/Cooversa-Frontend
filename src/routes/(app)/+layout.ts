import {initCurrentUser} from "$lib/stores/auth";

export async function load() {
    // load user from session
    await initCurrentUser();
}