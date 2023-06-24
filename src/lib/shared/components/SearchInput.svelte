<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import LoadingSvg from './LoadingSvg.svelte';

	const dispatch = createEventDispatcher();

	let input: HTMLInputElement;

	export let search = '';
	export let placeholder = 'Search';
	export let loading: boolean = false;

	const focusInput = () => {
		input.focus();
		input.style.flexBasis = '80%';
	};

	let handleSearch = () => {
		dispatch('search', search);
	};
</script>

<form on:submit|preventDefault={handleSearch} class="w-full mb-20">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		on:click={focusInput}
		class="w-full rounded-3xl cursor-text flex item-center px-2 justify-between py-2 transition-all bg-gray-100"
	>
		<div class="flex w-[83%] gap-2 items-center">
			<label for="search-input" class="hidden">Search</label>
			<input
				bind:value={search}
				bind:this={input}
				type="text"
				id="search-input"
				name="search-input"
				aria-label="Search"
				{placeholder}
				class="outline-none bg-transparent w-full px-1 text-sm"
			/>
		</div>

		<button class="bg-primary flex justify-center rounded-full text-white p-1 ">
			{#if loading}
				<LoadingSvg />
			{:else}
				<iconify-icon icon="ic:outline-search" width="20" />
			{/if}
		</button>
	</div>
</form>
