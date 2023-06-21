<script lang="ts">
	import { onMount } from 'svelte';
	import { currentUser, initCurrentUser } from '$lib/stores/auth';
	import { showAlert } from '$lib/utils/alert';
	import { goto } from '$app/navigation';

	onMount(async () => {
		await initCurrentUser();

		if ($currentUser?.role !== 'ADMIN') {
			await goto('/admin');
			showAlert({
				message: 'Only admins can access this page',
				type: 'error'
			});
		}
	});
</script>

<slot />
