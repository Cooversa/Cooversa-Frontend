<script lang="ts">
	import Banner from './components/Banner.svelte';
	import CoursesGrid from '$lib/shared/components/CoursesGrid.svelte';
	import { browser } from '$app/environment';
	import { AxiosError } from 'axios';
	import client from '$lib/client';
	import type { Course } from '$lib/client/schools/types';
	import { showAlert } from '$lib/utils/alert';

	const getCourses = async (): Promise<Course[]> => {
		try {
			const response = await client.get('/users/courses/all');
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
	<title>Home - Cooversa Dashboard</title>
</svelte:head>

<Banner />

<div class="container pt-16">
	<CoursesGrid {courses} />
</div>
