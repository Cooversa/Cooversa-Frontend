import {writable} from "svelte/store";
import pocketbase from "$lib/pocketbase";

export const currentUser = writable(pocketbase.authStore.model);
export const currentUserProfile = writable({});

export const initCurrentUser = async () => {
    currentUser.subscribe(async (user) => {
        if (user) {
            const profile = await pocketbase.collection("profile").getOne(user.profile);
            currentUserProfile.set(profile);
        }
    });
}
