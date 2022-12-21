<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { confirmEmail } from './logic';
	import Loading from '$lib/shared/components/Loading.svelte';
    import {makeAlert} from "$lib/shared/store/alert";
    import {goto} from "$app/navigation";

	// Get token parameter from URL
	let token = $page.url.searchParams.get('token');
	let loading = false;
	let success: boolean;



	onMount(async () => {
        if (!token) {
            makeAlert({
                type: 'error',
                title: 'Error',
                content: 'No token provided for email confirmation',
            })
            await goto('/')
            return;
        }

		loading = true;

        try {
            await confirmEmail(token)
            success = true;
        } catch (error) {
            success = false;
        }

		loading = false;
	});
</script>

<svelte:head>
    {#if loading}
        <title>Confirm your email</title>
    {:else if success}
        <title>
            Email confirmed
        </title>
    {:else if success === false}
        <title>
            Email confirmation failed
        </title>
    {/if}
</svelte:head>

<section class="confirm">
	<div class="wrapper">
		{#if loading}
			<Loading />
		{:else if success}
			<!-- Success Icon -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current flex-shrink-0 h-36 w-36 text-[#38c172]"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
            <h1 class="text-3xl font-bold text-center mt-4">Email confirmed!</h1>
            <p class="text-center mt-4">You can now
                <a href="/auth/login" class="text-[#3182ce]">
                    log in to your account.
                </a>
            </p>

		{:else if success === false}
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-36 w-36 text-[#e53e3e]" fill="none"
                 viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <h1 class="text-3xl font-bold text-center mt-4">Email confirmation failed!</h1>
            <p class="text-center mt-4">
                Please request for a new confirmation mail
                <a href="/user/verification/send" class="text-[#3182ce]">here</a>.
            </p>

        {/if}
	</div>
</section>

<style>
	.confirm {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px 60px;
		flex-direction: column;
		max-width: 1300px;
		margin: 0 auto;
		height: 100%;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
</style>
