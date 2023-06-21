<script lang="ts">
	import { page } from '$app/stores';
	import client from '$lib/client';
	import type { Course, School } from '$lib/client/schools/types';
	import Editor from '$lib/shared/components/Editor.svelte';
	import Loading from '$lib/shared/components/Loading.svelte';
	import Selector from '$lib/shared/components/Selector.svelte';
	import { showAlert } from '$lib/utils/alert';
	import { AxiosError } from 'axios';
	import { onMount } from 'svelte';
	import { getAllCourses } from '../../courses/logic';

	const slug: string = $page.params.slug;

	let school: School;
	let loading: boolean = false;

	let coursesOptions: any[] = [];
	let coursesArray: any[] = [];
	onMount(async () => {
		loading = true;
		try {
			const response = await client.get(`schools/${slug}`);
			const courses = await getAllCourses();
			console.log(courses);

			school = response.data;

			courses.map((course: Course) => {
				coursesOptions = [...coursesOptions, { label: course.name, value: course }];
			});
			school.courses.map((course: Course) => {
				coursesArray = [...coursesArray, { label: course.name, value: course }];
			});
		} catch (err) {
			if (err instanceof AxiosError) {
				showAlert({
					message: err.response?.data.message || 'Ooops... Something went wrong!',
					type: 'error'
				});
				return;
			}
			showAlert({
				message: 'Ooops... Something went wrong!',
				type: 'error'
			});
		} finally {
			loading = false;
		}
	});

	$: console.log(coursesArray);
</script>

<svelte:head>
	{#if school}
		<title>{school.name} | Cooversa Admin</title>
	{:else}
		<title>School Detail | Cooversa Admin</title>
	{/if}
</svelte:head>

{#if loading}
	<Loading />
{:else if school}
	<main>
		<section>
			<p class="text-lg text-gray-300 mb-12">
				<a href="/admin">Dashboard</a> /
				<a href="/admin/courses">schools</a> /
				<span class="text-primary font-medium">{school.slug}</span>
			</p>
		</section>
		<form
			action=""
			class="form bg-gray-50 px-2 rounded-md py-5 gap-x-10 grid grid-cols-1  w-full md:grid-cols-2"
		>
			<div class="form-group">
				<label for="name" class="form-label">Name:</label>
				<input id="name" type="text" class="form-input-full" bind:value={school.name} />
			</div>
			<div class="form-group">
				<label for="slug" class="form-label">Slug:</label>
				<input id="slug" type="text" class="form-input-full" disabled bind:value={school.slug} />
			</div>
			<div class=" md:col-span-2">
				<label for="description" class="form-label">Description:</label>
				<Editor html={school.description} />
			</div>
			<div class="form-group mt-5">
				<label for="courses" class="form-label hidden">Courses:</label>
				<Selector
					name="courses"
					placeholder="Select Courses"
					bind:selected={coursesArray}
					options={coursesOptions}
					selectMultiple={true}
					addUnavailable={true}
				/>
			</div>
		</form>
	</main>
{/if}
