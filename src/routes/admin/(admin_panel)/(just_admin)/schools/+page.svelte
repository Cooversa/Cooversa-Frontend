<script lang="ts">
	import { getSchools } from '$lib/client/schools';
	import Loading from '$lib/shared/components/Loading.svelte';
	import NewButton from '$lib/shared/components/NewButton.svelte';
	import type { BreadcrumbType } from '$lib/shared/types/breadcrumbs.types';
	import Breadcrumb from '$lib/shared/components/Breadcrumb.svelte';

	const schools = getSchools();

	const breadcrumbs: BreadcrumbType[] = [
		{
			name: 'Dashboard',
			href: '/admin',
			active: false
		},
		{
			name: 'schools',
			href: '/admin/schools',
			active: true
		}
	];
</script>

<svelte:head>
	<title>Schools - Cooversa Admin</title>
</svelte:head>
<main>
	<Breadcrumb {breadcrumbs} />

	<NewButton href="/admin/schools/new" tooltip="New School" />

	<section class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-10">
		{#await schools}
			<Loading />
		{:then schools}
			{#each schools as school}
				<a href="/admin/schools/{school.slug}">
					<div
						class="bg-white h-full cursor-pointer rounded-lg flex flex-col transition-all duration-200 shadow-md hover:shadow-lg p-4"
					>
						<div class="flex flex-col gap-4">
							<h3 class="text-lg font-bold mb-2 line-clamp-1">{school.name}</h3>

							<p class="text-sm text-gray-500 line-clamp-3">{school.description}</p>
						</div>
					</div>
				</a>
			{/each}
		{/await}
	</section>
</main>
