<script lang="ts">
    import '../../styles/app.css'
    import AppNavbar from "$lib/shared/components/AppNavbar.svelte";
    import Sidebar from "$lib/shared/components/Sidebar.svelte";
    import {currentUser, initCurrentUser} from "$lib/stores/auth";
    import {onDestroy, onMount} from "svelte";

    import alerts, {makeAlert} from "$lib/shared/store/alert";
    import AlertsList from '$lib/shared/components/AlertsList.svelte';
    import Alert from '$lib/shared/components/Alert.svelte';
    import type { Alert as AlertType } from '$lib/shared/store/alert.ts';
    import loading from "$lib/shared/store/loading";
    import {navigating} from "$app/stores";
    import Loading from "$lib/shared/components/Loading.svelte";
    import {browser} from "$app/environment";
    import {goto} from "$app/navigation";


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

    let isReady = false;

    const checkIfEnrolled = () => {
        if($currentUser && !$currentUser.schoolId) {
            goto('/school');
            makeAlert({
                type: 'warning',
                title: 'School not set',
                content: 'Please enroll in a school to continue'
            })
        }
    }

    $: if($navigating) {
        checkIfEnrolled();
    }

    onMount(async () => {
        await initCurrentUser();
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
