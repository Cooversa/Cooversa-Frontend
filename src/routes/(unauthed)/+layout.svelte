<script lang="ts">
	import Navbar from '$lib/shared/components/Navbar.svelte';
	import '../../styles/app.css';
	import Footer from '$lib/shared/components/Footer.svelte';
	import alerts from '$lib/shared/store/alert.ts';
	import { onDestroy, onMount } from 'svelte';
	import AlertsList from '$lib/shared/components/AlertsList.svelte';
	import Alert from '$lib/shared/components/Alert.svelte';
	import type { Alert as AlertType } from '$lib/shared/store/alert.ts';
	import pocketbase from '$lib/pocketbase';
	import { currentUser } from '$lib/stores/auth';
	import { ClientResponseError } from 'pocketbase';
	import {browser} from "$app/environment";

	import {navigating} from "$app/stores";
	import loading from "$lib/shared/store/loading";
	import Loading from "$lib/shared/components/Loading.svelte";

	$: {
		loading.set(!!$navigating);
	};

	let alertsList: AlertType[] = [];

	let unsub = alerts.subscribe((data) => {
		alertsList = data;
	});

	onDestroy(() => {
		unsub();
	});

	const validateUserOrLogout = async () => {
		try {
			await pocketbase.collection('users').getOne($currentUser?.id || '');
		} catch (err) {
			if (err instanceof ClientResponseError && err.status === 404) {
				await pocketbase.authStore.clear();
				currentUser.set(null);
				return;
			}
			throw err;
		}
	};

	onMount(async () => {
		if (browser) {
			await validateUserOrLogout();
			pocketbase.authStore.onChange((token, model) => {
				console.log('authStore.onChange', token, model);
				currentUser.set(model);
			});
		}
	});
</script>

<div class="flex flex-col h-screen">
	{#if ($loading)}
		<Loading />
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

	<Navbar />
	<main class="pt-[100px] flex-grow">
		<slot />
	</main>
	<Footer />
</div>
