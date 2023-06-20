<script lang="ts">
	import { onMount } from 'svelte';
	import { currentUser, initCurrentUser } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { logoutUser } from '$lib/client';
	import { browser } from '$app/environment';
	import AdminSideNav from '$lib/admin/AdminSideNav.svelte';
	import 'iconify-icon';

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
		} else if ($currentUser && $currentUser.role !== 'ADMIN') {
			await goto('/');
		}
	});
</script>

<AdminSideNav on:navState={setSideNavState} />
<div class="{!sideNavOpen ? 'md:ml-24' : 'md:ml-80'} py-[2.5rem] transition-all md:mr-10 px-5">
	<slot />
</div>
