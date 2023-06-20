<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentUser, initCurrentUser } from '$lib/stores/auth';
	import { onMount } from 'svelte';

	onMount(async () => {
		await initCurrentUser();

		if ($currentUser) {
			await goto('/admin');
		}
	});
</script>

<div class="h-screen w-screen flex flex-col justify-center p-10 items-center">
	<div class="md:w-[480px] shadow w-full p-5">
		<slot />
	</div>
</div>
