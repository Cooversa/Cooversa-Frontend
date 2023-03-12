<script lang="ts">
	import Navbar from '$lib/shared/components/Navbar.svelte';
	import '../../styles/app.css';
	import Footer from '$lib/shared/components/Footer.svelte';

	import { onDestroy, onMount } from 'svelte';
	import { initCurrentUser } from '$lib/stores/auth';

	import { navigating } from '$app/stores';
	import loading from '$lib/shared/store/loading';
	import Loading from '$lib/shared/components/Loading.svelte';

	$: {
		loading.set(!!$navigating);
	}

	onMount(async () => {
		await initCurrentUser();
	});
</script>

<div class="flex flex-col h-screen">
	{#if $loading}
		<Loading />
	{/if}

	<Navbar />
	<main class="pt-[100px] flex-grow">
		<slot />
	</main>
	<Footer />
</div>
