<script lang="ts">
    import '../../styles/app.css'
    import AppNavbar from "$lib/shared/components/AppNavbar.svelte";
    import Sidebar from "$lib/shared/components/Sidebar.svelte";
    import {currentUser} from "$lib/stores/auth";
    import {onDestroy, onMount} from "svelte";
    import {browser} from "$app/environment";
    import {goto} from "$app/navigation";
    import pocketbase from "$lib/pocketbase";

    import alerts from "$lib/shared/store/alert";
    import AlertsList from '$lib/shared/components/AlertsList.svelte';
    import Alert from '$lib/shared/components/Alert.svelte';
    import type { Alert as AlertType } from '$lib/shared/store/alert.ts';
    import loading from "$lib/shared/store/loading";
    import {navigating} from "$app/stores";
    import Loading from "$lib/shared/components/Loading.svelte";


    let isSidebarOpen = true;

    $: loading.set(!!$navigating)

    const setSidebarState = (e) => {
        isSidebarOpen = e.detail.state
    }

    let alertsList: AlertType[] = [];

    let unsub = alerts.subscribe((data) => {
        alertsList = data;
    });

    onDestroy(() => {
        unsub();
    });

    onMount(async () => {
        if (browser) {
            if (!$currentUser) {
              await goto('/auth/login')
            }

            await pocketbase.authStore.onChange((token, model) => {
                if (!token) {
                    goto('/auth/login')
                }
            })
        }
    })

</script>




<div class="relative min-h-screen md:flex">
    <Sidebar on:navState={setSidebarState}/>
    <div class=" my-16 md:my-0 p w-full {isSidebarOpen ? 'md:ml-72' : 'md:ml-16'} ml-0 transition-all">
        <AppNavbar/>
        <div class="p-7">
            {#if $loading}
                <Loading/>
            {/if}
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
        </div>
    </div>
</div>
