import {writable} from "svelte/store";
import type {User} from "$lib/client/users/types";
import {getLoggedInUser} from "$lib/client";

export const currentUser = writable<User | null>(null);


export const initCurrentUser = async () => {
    const user = await getLoggedInUser();
    currentUser.set(user);
}