import {writable} from "svelte/store";
import pocketbase from "$lib/pocketbase";

export const currentUser = writable(pocketbase.authStore.model);
