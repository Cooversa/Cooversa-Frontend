<script lang="ts">
    import '../../styles/app.css'
    import AppNavbar from "$lib/shared/components/AppNavbar.svelte";
    import Sidebar from "$lib/shared/components/Sidebar.svelte";
    import {currentUser, initCurrentUser} from "$lib/stores/auth";
    import {onDestroy, onMount} from "svelte";
    import {browser} from "$app/environment";
    import {goto} from "$app/navigation";
    import pocketbase from "$lib/pocketbase";

    import alerts from "$lib/shared/store/alert";
    import AlertsList from '$lib/shared/components/AlertsList.svelte';
    import Alert from '$lib/shared/components/Alert.svelte';
    import type { Alert as AlertType } from '$lib/shared/store/alert.ts';


    let isSidebarOpen = true;

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

            await initCurrentUser()

            await pocketbase.authStore.onChange((token, model) => {
                if (!token) {
                    goto('/auth/login')
                }
            })
        }
    })

</script>




<div class="hidden relative min-h-screen md:flex">
    <Sidebar on:navState={setSidebarState}/>
    <div class="h-screen p w-full {isSidebarOpen ? 'ml-72' : 'ml-16'} transition-all">
        <AppNavbar/>
        <div class="p-7">
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

<div class="md:hidden flex flex-col h-screen justify-center items-center text-lg">
    <div class="flex flex-col items-center space-y-5">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>

        Open this page on your laptop
    </div>
</div>