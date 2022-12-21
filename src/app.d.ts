// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
import type {User} from "$lib/types/user.type";
import Pocketbase from "$lib/pocketbase";

declare namespace App {
	// interface Error {}
	interface Locals {
        pb: Pocketbase;
        user: User;
    }
	// interface PageData {}
	// interface Platform {}
}
