<script lang="ts">
	import { onMount } from 'svelte';
	import { currentUser, initCurrentUser } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { logoutUser } from '$lib/client';
	import { browser } from '$app/environment';

	const logout = async () => {
		await logoutUser();
		await initCurrentUser();
		if (browser) {
			await goto('/auth/login');
		}
	};

	onMount(async () => {
		await initCurrentUser();

		if (!$currentUser) {
			await goto('/admin/auth/login');
		} else if ($currentUser && $currentUser.role !== 'ADMIN') {
			await goto('/');
		}
	});
</script>

<slot />
<button class="button" on:click={logout}>Logout</button>
