<script lang="ts">
	import type { CreateCourse } from '$lib/client/schools/types';
	import Editor from '$lib/shared/components/Editor.svelte';

	let newCourseData: CreateCourse = {
		name: '',
		description: '',
		excerpt: '',
		featuredImage: '',
		schoolId: '',
		acceptedStatuses: []
	};
</script>

<svelte:head>
	<title>New Course - Cooversa Admin</title>
</svelte:head>

<main>
	<section>
		<p class="text-lg text-gray-300 mb-12">
			<a href="/admin">Dashboard</a> /
			<a href="/admin/courses">courses</a> /
			<span class="text-primary font-medium">new</span>
		</p>
	</section>

	<form class="form py-5 gap-x-10 grid grid-cols-1  w-full md:grid-cols-2">
		<div class="form-group md:col-span-2">
			<label for="name" class="form-label">Name:</label>
			<input id="name" type="text" class="form-input-full" bind:value={newCourseData.name} />
		</div>

		<div class="form-group md:col-span-2">
			<label for="excerpt" class="form-label">Excerpt:</label>
			<textarea id="excerpt" rows="5" class="form-input-full" bind:value={newCourseData.excerpt} />
			<p class="mt-2 text-xs font-medium text-gray-500">
				A short description of the course, please be clear and concise
			</p>
		</div>

		<div class="form-group md:col-span-2">
			<label for="description" class="form-label">Description:</label>
			<Editor html={newCourseData.description} />
		</div>
	</form>
</main>
