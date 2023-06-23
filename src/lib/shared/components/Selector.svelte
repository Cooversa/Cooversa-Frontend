<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import type { Option } from '$lib/shared/types/selector.types';

	const dispatch = createEventDispatcher();
	let open = false;

	export let name: string;

	function toggle() {
		open = !open;
	}

	export let placeholder: string;

	export let selected: any | null = null;

	export let selectMultiple = false;
	export let addUnavailable = false;
	export let optionsLoading = false;
	export let handleSearchExternally = false;

	function onSelected(option: Option) {
		if (selectMultiple) {
			if (selected.includes(option.value)) {
				selected = selected.filter((s: any) => s !== option.value);
			} else {
				selected = [...selected, option.value];
			}
		} else {
			selected = option.value;
		}
		dispatch('selected', selected);
		toggle();
		search = '';
	}

	const removeSelected = (index: number) => {
		selected = selected.filter((s: Option, i: number) => i !== index);
		// dispatch('remove', selectedItemIndex);
	};

	const getLabelFromValue = (value: any) => {
		const option = options.find((item) => item.value === value);

		return option?.label || '';
	};

	export let options: Option[];

	let search = '';

	let selectedLabel = '';
	export let full = false;

	$: {
		const selectedOption = options.find((value) => {
			return value.value == selected;
		});
		selectedLabel = selectedOption?.label || placeholder;
	}
	onMount(() => {
		if (!(options instanceof Option)) {
		}
	});

	// Debounce search
	// Only search after 500ms of no typing
	let timeout: any;

	$: {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			dispatch('search', search);
		}, 500);
	}
</script>

<div class="wrapper relative {full ? 'w-[100%]' : 'w-[100%] md:w-[80%] lg:w-[50%]'}">
	<div
		class="bg-white border-[#e5e5e5] border text-[14px] {selected
			? 'text-[#1a1a1a]'
			: 'text-[#454545]'} w-full p-2 flex items-center justify-between rounded-[5px] cursor-pointer"
		on:click={toggle}
	>
		<div>
			{#if selectMultiple && selected}
				<div class="flex gap-1 flex-wrap	">
					{#each selected as selectedArrayElement, index}
						<p class="p-1 bg-primary text-white rounded">
							{getLabelFromValue(selectedArrayElement)}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<iconify-icon icon="iconoir:cancel" on:click={() => removeSelected(index)} />
						</p>
					{/each}
				</div>
			{:else if selected}
				{selectedLabel.length > 30 ? selectedLabel.slice(0, 30) + '...' : selectedLabel}
			{:else}
				{placeholder}
			{/if}
		</div>

		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-4 h-4"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
			</svg>
		</div>
	</div>
	{#if open}
		<ul
			in:slide={{ duration: 200 }}
			out:slide={{ duration: 200 }}
			class="bg-white w-full z-10  shadow-md absolute max-h-60 overflow-y-auto border-[#e5e5e5] border text-[14px] text-[#454545] rounded-[5px] mt-2"
		>
			<div class="flex items-center px-2 sticky top-0 bg-white">
				<div />
				<div class="text-[#1a1a1a]">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-4 h-4"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
						/>
					</svg>
				</div>

				<input
					bind:value={search}
					type="text"
					{placeholder}
					class="placeholder:text-[#454545] p-2 outline-none w-full"
				/>
				{#if addUnavailable}
					<iconify-icon class="text-primary" width="20" icon="gridicons:add-outline" />
				{/if}
			</div>
			{#if optionsLoading}
				<div class="flex justify-center my-5">
					<svg
						class="animate-spin  h-5 w-5 text-primary"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							class="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"
						/>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
					</svg>
				</div>
			{:else}
				{#each options as option}
					<li
						class="p-2 text-[14px] flex justify-between hover:bg-primary cursor-pointer hover:text-white
					{option.label.toLowerCase() === selectedLabel.toLowerCase() && 'bg-primary text-white'}					
					{handleSearchExternally
							? 'block'
							: option.label.toLowerCase().includes(search.toLowerCase())
							? 'block'
							: 'hidden'}"
						on:click={() => onSelected(option)}
						on:keyup={() => onSelected(option)}
					>
						{#if Array.isArray(selected) && selected.some((e) => e === option.value)}
							{#if selected.includes(option.value)}
								{option.label}
								<iconify-icon icon="material-symbols:check" style="color: #22c55e;" width="20" />
							{:else}
								{option.label}
							{/if}
						{:else}
							{option.label}
						{/if}
					</li>
				{/each}
			{/if}
		</ul>
	{/if}
</div>
