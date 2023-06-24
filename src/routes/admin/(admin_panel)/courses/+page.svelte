<script lang="ts">
	import { getAllCourses } from './logic';
	import Loading from '$lib/shared/components/Loading.svelte';
	import NewButton from '$lib/shared/components/NewButton.svelte';
	import type { BreadcrumbType } from '$lib/shared/types/breadcrumbs.types';
	import Breadcrumb from '../../../../lib/shared/components/Breadcrumb.svelte';
	import SearchInput from '../../../../lib/shared/components/SearchInput.svelte';

	let courses = getAllCourses();
	let searching: boolean = false;

	let handleSearch = (e: any) => {
		searching = true;
		let search = e.detail;
		try {
			courses = getAllCourses(search);
		} catch (e) {
			console.log(e);
		} finally {
			searching = false;
		}
	};

	let breadcrumbs: BreadcrumbType[] = [
		{
			name: 'Dashboard',
			href: '/admin',
			active: false
		},
		{
			name: 'courses',
			href: '/admin/courses',
			active: true
		}
	];
</script>

<svelte:head>
	<title>Courses - Cooversa Admin</title>
</svelte:head>

<main>
	<Breadcrumb {breadcrumbs} />

	<NewButton href="/admin/courses/new" tooltip="New Course" />

	<SearchInput on:search={handleSearch} loading={searching} placeholder="Search for course" />

	<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
		{#await courses}
			<Loading />
		{:then courses}
			{#each courses as course}
				<div class="bg-white rounded-lg shadow-lg p-4">
					<!-- Image -->
					<a href="/admin/courses/{course.slug}">
						<div class="h-48 bg-gray-200 rounded">
							<img
								src={course.featuredImage}
								alt={course.name}
								class="object-cover h-full w-full object-center rounded"
							/>
						</div>
					</a>
					<div class="mt-5">
						<a href="/admin/courses/{course.slug}">
							<h3 class="text-xl font-bold mb-2">{course.name}</h3>
						</a>
						<p class="text-gray-500 line-clamp-3 text-[14px]">{course.excerpt}</p>
					</div>
				</div>
			{:else}
				<p class="text-center md:col-span-2 text-lg font-semibold text-gray-500">No course found</p>
			{/each}
		{/await}
	</section>
</main>
