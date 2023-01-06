<script lang="ts">


    import {onMount} from "svelte";
    import {getLoggedInUser} from "$lib/client";
    import {browser} from "$app/environment";
    import {goto} from "$app/navigation";

    onMount(async () => {
        const user = await getLoggedInUser();
        if (browser) {
            if (user && user.profile) {
                await goto("/dashboard");
            }

            if (user && !user.profile) {
                await goto("/apply/step2");
            }
        }
    });
</script>

<slot/>