<script lang="ts">
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let isOpen = true;
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { logoutUser } from '$lib/client';
	import { goto } from '$app/navigation';
	import { initCurrentUser } from '$lib/stores/auth';

	const dispatchNavState = () => {
		dispatch('navState', {
			state: isOpen
		});
	};

	const toggleOpen = () => {
		isOpen = !isOpen;
		dispatchNavState();
	};

	const logout = async () => {
		await logoutUser();
		await initCurrentUser();
		if (browser) {
			await goto('/auth/login');
		}
	};

	const pages = [
		{
			name: 'Dashboard',
			url: '/admin',
			svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
</svg>
`,
			activeSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clip-rule="evenodd" />
</svg>
	`
		},
		{
			name: 'Users',
			url: '/admin/users',
			svg: `<iconify-icon icon="mdi:users" width="25" />`,
			activeSvg: `<iconify-icon icon="mdi:users" class="text-primary" width="25" />`
		},
		{
			name: 'Courses',
			url: '/admin/courses',
			svg: `<iconify-icon icon="ph:books-duotone" width="25" />`,
			activeSvg: `<iconify-icon icon="ph:books-duotone" class="text-primary" width="25" />`
		},

		{
			name: 'Schools',
			url: '/admin/schools',
			svg: `<iconify-icon icon="ep:school" width="25" />`,
			activeSvg: `<iconify-icon icon="ep:school" class="text-primary" width="25" />`
		},
		{
			name: 'Tracks',
			url: '/admin/tracks',
			svg: `<iconify-icon icon="ph:git-branch-duotone"  width="25" />`,
			activeSvg: `<iconify-icon icon="ph:git-branch-duotone" class="text-primary" width="25" />`
		}
	];

	onMount(() => {
		if (browser) {
			const width = window.innerWidth;
			if (width <= 980) {
				isOpen = false;
			}

			dispatchNavState();
		}
	});
</script>

<aside
	class="bg-white fixed bottom-0 md:top-0 right-0 left-0 flex md:flex-col md:px-5 md:py-8 px-10 z-[21] py-5 shadow {isOpen
		? 'md:w-16'
		: 'md:w-72'} w-screen transition-all z-[99999999]"
>
	<svg
		class:rotate-180={isOpen}
		on:click={toggleOpen}
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="4"
		stroke="currentColor"
		class="w-6 h-6 bg-primary text-white hidden md:block rounded-full p-1 absolute -right-3 border cursor-pointer"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
		/>
	</svg>

	<!-- Logo -->
	<div class="hidden md:flex">
		<a href="/dashboard">
			<img
				src={!isOpen ? '/transparent-icon.svg' : '/transparent-c.svg'}
				alt="Cooversa white icon"
				class={isOpen ? 'w-10' : 'w-40'}
			/>
		</a>
	</div>

	<div class="md:mt-10 w-full flex md:flex-col h-full justify-between text-gray-700">
		<!-- Navigation -->
		<nav class="md:space-y-6 w-full md:w-full flex justify-between md:flex-col ">
			{#each pages as nav}
				<div>
					<a class="flex items-center" href={nav.url}>
						<div class="inline-block" class:text-primary={nav.url === $page.url.pathname}>
							{@html nav.url === $page.url.pathname ? nav.activeSvg : nav.svg}
						</div>
						<div
							class="ml-3 hidden md:flex text-[14px] duration-200 font-medium {isOpen && 'scale-0'}"
						>
							{nav.name}
						</div>
					</a>
				</div>
			{/each}

			<button on:click={logout} class=" md:hidden  items-center">
				<span class="">
					<iconify-icon icon="solar:logout-2-linear" width="25" />
				</span>
			</button>
		</nav>
		<button on:click={logout} class="md:flex hidden  items-center">
			<span class="">
				<iconify-icon icon="solar:logout-2-linear" width="25" />
			</span>
			<span class="ml-3 text-[14px] duration-200 hidden md:flex	 font-medium {isOpen && 'scale-0'}"
				>Logout</span
			>
		</button>
	</div>
</aside>
