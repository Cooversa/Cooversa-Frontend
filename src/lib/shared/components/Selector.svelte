<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	const dispatch = createEventDispatcher();
	let open = false;

	export let name: string;

	function toggle() {
		open = !open;
	}

	type Option = {
		value: any;
		label: string;
	};

	export let placeholder: string;

	export let selected: any | null = null;

	function onSelected(option: Option) {
		selected = option.value;
		dispatch('selected', selected);
		toggle();
		search = '';
	}

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
</script>

<div class="wrapper relative {full ? 'w-[100%]' : 'w-[100%] md:w-[80%] lg:w-[50%]'}">
	<div
		class="bg-white border-[#e5e5e5] border text-[14px] {selected
			? 'text-[#1a1a1a]'
			: 'text-[#454545]'} w-full p-2 flex items-center justify-between rounded-[5px] cursor-pointer"
		on:click={toggle}
	>
		<div>
			{#if selected}
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
			class="bg-white w-full shadow-md absolute max-h-60 overflow-y-auto border-[#e5e5e5] border text-[14px] text-[#454545] rounded-[5px] mt-2"
		>
			<div class="flex items-center px-2 sticky top-0 bg-white">
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
			</div>
			{#each options as option}
				<li
					class="p-2 text-[14px] hover:bg-primary cursor-pointer hover:text-white
					{option.label.toLowerCase() === selectedLabel.toLowerCase() && 'bg-primary text-white'}					{option.label
						.toLowerCase()
						.startsWith(search.toLowerCase())
						? 'block'
						: 'hidden'}"
					on:click={() => onSelected(option)}
					on:keyup={() => onSelected(option)}
				>
					{option.label}
				</li>
			{/each}
		</ul>
	{/if}
</div>
