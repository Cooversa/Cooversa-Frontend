<script lang="ts">
	import '../../styles/app.css';

	import { onMount } from 'svelte';
	import { currentUser, initCurrentUser } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { logoutUser } from '$lib/client';
	import { browser } from '$app/environment';
	import { showAlert } from '$lib/utils/alert';

	const logout = async () => {
		await logoutUser();
		await initCurrentUser();
		if (browser) {
			await goto('/auth/login');
		}
	};

	onMount(async () => {
		await initCurrentUser();

		if ($currentUser && $currentUser.role !== 'ADMIN') {
			await goto('/');
		}
	});
</script>

<slot />
<button class="button" on:click={logout}>Logout</button>
