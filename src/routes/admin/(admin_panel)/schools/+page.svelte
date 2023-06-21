<script lang="ts">
	import { getSchools } from '$lib/client/schools';
	import Loading from '$lib/shared/components/Loading.svelte';

	const schools = getSchools();
</script>

<svelte:head>
	<title>Schools - Cooversa Admin</title>
</svelte:head>
<main>
	<section>
		<p class="text-lg text-gray-300 mb-12">
			<a href="/admin">Dashboard</a> /
			<span class="text-primary font-medium">schools</span>
		</p>
	</section>

	<section class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
		{#await schools}
			<Loading />
		{:then schools}
			{#each schools as school}
				<div
					class="bg-white cursor-pointer rounded-lg flex flex-col transition-all duration-200 shadow-md hover:shadow-lg p-4"
				>
					<div class="flex flex-col gap-4">
						<h3 class="text-xl font-bold mb-2">{school.name}</h3>

						<p class="text-sm">{school.description}</p>
					</div>

					<div class="mt-4 flex justify-end w-full">
						<a
							href="/admin/schools/{school.slug}"
							class="bg-primary px-2.5 py-1.5 text-sm rounded-md text-white">View</a
						>
					</div>
				</div>
			{/each}
		{/await}
	</section>
</main>
