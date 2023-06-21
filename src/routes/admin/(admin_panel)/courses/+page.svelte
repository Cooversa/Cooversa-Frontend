<script lang="ts">
	import { onMount } from 'svelte';
	import { getAllCourses } from './logic';
	import Loading from '$lib/shared/components/Loading.svelte';

	let courses = getAllCourses();
</script>

<svelte:head>
	<title>Courses - Cooversa Admin</title>
</svelte:head>

<main>
	<section>
		<p class="text-lg text-gray-300 mb-12">
			<a href="/admin">Dashboard</a> /
			<span class="text-primary font-medium">courses</span>
		</p>
	</section>

	<a
		href="/admin/courses/new"
		class="bg-primary group p-2.5 flex items-center text-white fixed rounded-full bottom-5 right-5 border border-primary hover:bg-white hover:text-primary z-10"
	>
		<iconify-icon icon="akar-icons:plus" width="20" />
		<span
			class="group-hover:opacity-100 transition-opacity text-xs bg-gray-800 px-1 text-gray-100 rounded-md absolute left-1/2 
    -translate-x-[130%]  opacity-0 m-4 mx-auto">New Course</span
		>
	</a>

	<section class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
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
			{/each}
		{/await}
	</section>
</main>
