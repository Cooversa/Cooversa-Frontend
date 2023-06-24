<script lang="ts">
	import { onMount } from 'svelte';
	import type { Track } from '$lib/client/schools/types';
	import Breadcrumb from '$lib/shared/components/Breadcrumb.svelte';
	import type { BreadcrumbType } from '$lib/shared/types/breadcrumbs.types';
	import { getTracks } from '$lib/client/schools';
	import Loading from '$lib/shared/components/Loading.svelte';
	import NewButton from '$lib/shared/components/NewButton.svelte';
	import SearchInput from '../../../../../lib/shared/components/SearchInput.svelte';
	import { AxiosError } from 'axios';
	import { showAlert } from '../../../../../lib/utils/alert';

	let breadcrumbs: BreadcrumbType[] = [
		{
			name: 'Dashboard',
			href: '/admin',
			active: false
		},
		{
			name: 'Tracks',
			href: '/admin/tracks',
			active: true
		}
	];

	let tracks: Track[];
	let searching: boolean = false;

	const handleSearch = async (e: any) => {
		searching = true;
		let search = e.detail;
		try {
			tracks = await getTracks(search);
		} catch (e) {
			if (e instanceof AxiosError) {
				showAlert({
					message: e.response?.data?.message || 'Something went wrong',
					type: 'error'
				});
				return;
			}

			showAlert({
				message: 'Something went wrong',
				type: 'error'
			});
		} finally {
			searching = false;
		}
	};

	onMount(async () => {
		tracks = await getTracks();
	});
</script>

<svelte:head>
	<title>Tracks - Cooversa Admin</title>
</svelte:head>

<main>
	<Breadcrumb {breadcrumbs} />
	<NewButton href="/admin/tracks/new" tooltip="New track" />

	<SearchInput on:search={handleSearch} placeholder="Search for tracks" loading={searching} />

	{#if tracks}
		<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">
			{#each tracks as track}
				<a class="shadow" href="/admin/tracks/{track.slug}">
					<div class="p-5">
						<h3 class="line-clamp-1 text-lg font-semibold">{track.name}</h3>
						<p class="line-clamp-3 text-sm mt-3 text-gray-500">{track.description}</p>
					</div>
				</a>
			{:else}
				<p class="text-center md:col-span-2 text-lg font-semibold text-gray-500">No track found</p>
			{/each}
		</section>
	{:else}
		<Loading />
	{/if}
</main>
