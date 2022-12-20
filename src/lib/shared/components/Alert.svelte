<script lang="ts">
    import {onMount} from "svelte";
    import {removeAlert} from "$lib/shared/store/alert";

    export let title;
    export let duration = 5000;
    export let content;
    export let type;
    export let id;

    let nodeRef;

    onMount(() => {
        setTimeout(() => {
            nodeRef.parentNode.removeChild(nodeRef)
            removeAlert(id)
        }, duration);
    })
</script>

<div bind:this={nodeRef} class="alert my-2 alert-{type} text-white">
    <div class="flex items-center">
        {#if (type === "success")}
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                 viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
        {:else if (type === "warning")}
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                 viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
        {:else if (type === "error")}
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                 viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
        {:else if (type === "info")}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 class="stroke-current flex-shrink-0 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>

        {/if}
        <div>
            {#if (title)}
                <h3 class="font-bold">{title}</h3>
            {/if}
            <p>{content}</p>
        </div>
    </div>
</div>

<style>
    .alert {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        border-radius: 0.5rem;
    }

    .alert h3 {
        margin: 0;
    }

    .alert p {
        margin: 0;
    }

    .alert svg {
        margin-right: 1rem;
    }

    .alert-success {
        background-color: #38c172;
    }

    .alert-warning {
        background-color: #f6ad55;
    }

    .alert-error {
        background-color: #e53e3e;
    }

    .alert-info {
        background-color: #4299e1;
    }


</style>