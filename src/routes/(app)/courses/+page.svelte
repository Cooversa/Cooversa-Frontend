<script lang="ts">
	import CoursesGrid from '$lib/shared/components/CoursesGrid.svelte';
	import type { Course } from '$lib/client/schools/types';
	import client from '$lib/client';
	import { showAlert } from '$lib/utils/alert';

	const getCourses = async (): Promise<Course[]> => {
		try {
			const response = await client.get<Course[]>('/users/courses/all');
			return response.data;
		} catch (e) {
			showAlert({
				type: 'error',
				message: "Couldn't load courses!"
			});
			throw e;
		}
	};

	let courses = getCourses();
</script>

<svelte:head>
	<title>Courses - Cooversa Dashboard</title>
</svelte:head>

<main>
	<h1 class="text-3xl font-semibold">All Courses</h1>
	<div class="pt-10 ">
		<CoursesGrid {courses} />
	</div>
</main>
