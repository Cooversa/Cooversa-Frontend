<script lang="ts">
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let isOpen = true;
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import pocketbase from '$lib/pocketbase';

	const dispatchNavState = () => {
		dispatch('navState', {
			state: isOpen
		});
	};

	const toggleOpen = () => {
		isOpen = !isOpen;
		dispatchNavState();
	};
	console.log(toggleOpen());
	

	const logout = async () => {
		await pocketbase.authStore.clear();
	};

	const pages = [
		{
			name: 'Dashboard',
			url: '/dashboard',
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
			name: 'Courses',
			url: '/courses',
			svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
</svg>
`,
			activeSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
</svg>
`
		},
		{
			name: 'Discussions',
			url: '/discussions',
			svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
</svg>
`,
			activeSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
  <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
</svg>
`
		}
	];

	onMount(() => {
		if (browser) {
			const width = window.innerWidth;
			if (width <= 980) {
				isOpen = false;
			}

			window.addEventListener('resize', () => {
				const width = window.innerWidth;
				if (width <= 980) {
					isOpen = false;
					dispatchNavState();
				} else {
					isOpen = true;
					dispatchNavState();
				}
			});
			dispatchNavState();
		}
	});
</script>

<aside
	class="bg-white fixed bottom-0 md:top-0 bottom-0 right-0 left-0 flex md:flex-col md:px-5 md:py-8 px-10 z-[9999999999999] py-5 shadow {isOpen
		? 'md:w-72'
		: 'md:w-16'} w-screen transition-all"
>
	<svg
		class:rotate-180={!isOpen}
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
				src={isOpen ? '/transparent-icon.svg' : '/transparent-c.svg'}
				alt="Cooversa white icon"
				class={isOpen ? 'w-40' : 'w-10'}
			/>
		</a>
	</div>

	<div class="md:mt-10 w-full text-gray-700">
		<!-- Navigation -->
		<nav class="md:space-y-6 w-full flex justify-between md:flex-col ">
			{#each pages as nav}
				<div>
					<a class="flex items-center" on:click={toggleOpen} href={nav.url}>
						<div class="inline-block" class:text-primary={nav.url === $page.url.pathname}
						>
							{@html nav.url === $page.url.pathname ? nav.activeSvg : nav.svg}
						</div>
						<div
							class="ml-3 hidden md:flex text-[14px] duration-200 font-medium {!isOpen &&
								'scale-0'}"
						>
							{nav.name}
						</div>
					</a>
				</div>
			{/each}
			<button on:click={logout} class="flex items-center">
				<span class="">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
						/>
					</svg>
				</span>
				<span
					class="ml-3 text-[14px] duration-200 hidden md:flex	 font-medium {!isOpen && 'scale-0'}"
					>Logout</span
				>
			</button>
		</nav>
	</div>
</aside>
