<script lang="ts">
    import '../../styles/app.css'

    import {onDestroy, onMount} from "svelte";
    import {currentUser, initCurrentUser} from "$lib/stores/auth";
    import {goto} from "$app/navigation";
    import alerts, {makeAlert} from "$lib/shared/store/alert";
    import type {Alert as AlertType} from "$lib/shared/store/alert";
    import AlertsList from "$lib/shared/components/AlertsList.svelte";
    import Alert from "$lib/shared/components/Alert.svelte";
    import {logoutUser} from "$lib/client";
    import {browser} from "$app/environment";



    let alertsList: AlertType[] = [];

    let unsub = alerts.subscribe((data) => {
        alertsList = data;
    });

    onDestroy(() => {
        unsub();
    });

    const logout = async () => {
        await logoutUser();
        await initCurrentUser();
        if (browser) {
            await goto("/auth/login");
        }
    }

    onMount(async () => {
        await initCurrentUser();

        if ($currentUser && $currentUser.role !== "ADMIN") {
            await goto("/");
            makeAlert({
                type: "error",
                title: "Unauthorized",
                content: "You are not authorized to access this page."
            })
        }
    })
</script>

{#if alertsList.length}
    <AlertsList>
        {#each alertsList as alert}
            <Alert
                    id={alert.id}
                    type={alert.type}
                    duration={alert.duration}
                    content={alert.content}
                    title={alert.title}
            />
        {/each}
    </AlertsList>
{/if}
<slot/>
<button class="button" on:click={logout}>Logout</button>
