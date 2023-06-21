<script lang="ts">
	import { onMount } from 'svelte';
	import { currentUser, initCurrentUser } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { logoutUser } from '$lib/client';
	import { browser } from '$app/environment';
	import AdminSideNav from '$lib/admin/AdminSideNav.svelte';
	import 'iconify-icon';
	import { showAlert } from '../../../lib/utils/alert';

	const logout = async () => {
		await logoutUser();
		await initCurrentUser();
		if (browser) {
			await goto('/auth/login');
		}
	};

	let sideNavOpen = false;

	const setSideNavState = () => {
		sideNavOpen = !sideNavOpen;
	};

	export const closeSideNav = () => {
		sideNavOpen = false;
	};

	onMount(async () => {
		await initCurrentUser();

		if (!$currentUser) {
			await goto('/admin/auth/login');
			showAlert({
				message: 'You are not logged in',
				type: 'error'
			});
		} // If the user is logged in but not an admin or a teacher, redirect them to the home page
		else if ($currentUser && $currentUser.role !== 'ADMIN' && $currentUser.role !== 'TEACHER') {
			await goto('/');
			showAlert({
				message: 'You are not an admin',
				type: 'error'
			});
		}
	});
</script>

<AdminSideNav on:navState={setSideNavState} />
<div
	class="{sideNavOpen ? 'md:ml-80' : 'md:ml-24'} py-[2.5rem] transition-all md:mr-10 md:px-5 px-10"
>
	<slot />
</div>
