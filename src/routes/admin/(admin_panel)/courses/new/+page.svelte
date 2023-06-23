<script lang="ts">
	import type { CreateCourse, School } from '$lib/client/schools/types';
	import type { BreadcrumbType } from '$lib/shared/types/breadcrumbs.types';
	import Breadcrumb from '$lib/shared/components/Breadcrumb.svelte';
	import RichTextEditor from '$lib/shared/components/RichTextEditor.svelte';
	import { showAlert } from '$lib/utils/alert';
	import { PUBLIC_CLOUDINARY_CLOUD_NAME } from '$env/static/public';
	import Selector from '$lib/shared/components/Selector.svelte';
	import type { Option } from '$lib/shared/types/selector.types';
	import { getSchools } from '$lib/client/schools';
	import { onMount } from 'svelte';
	import LoadingSvg from '$lib/shared/components/LoadingSvg.svelte';
	import { schema } from '../schema';
	import { z } from 'zod';
	import { filteredObj } from '$lib/utils/removeEmptyString';
	import client from '$lib/client';
	import { goto } from '$app/navigation';
	import { AxiosError } from 'axios';

	let breadcrumbs: BreadcrumbType[] = [
		{
			name: 'Dashboard',
			href: '/admin',
			active: false
		},
		{
			name: 'courses',
			href: '/admin/courses',
			active: false
		},
		{
			name: 'New Course',
			href: '/admin/courses/new',
			active: true
		}
	];

	let newCourseData: CreateCourse = {
		name: '',
		description: '',
		excerpt: '',
		featuredImage: '',
		schoolId: '',
		acceptedStatuses: []
	};

	let acceptedStatusesOptions: Option[] = [
		{
			value: 'PENDING_PAYMENT',
			label: 'Pending Payment'
		},
		{
			value: 'APPLIED',
			label: 'Applied'
		},
		{
			value: 'ACCEPTED',
			label: 'Accepted'
		},
		{
			value: 'PROBATION',
			label: 'Probation'
		},
		{
			value: 'EXPELLED',
			label: 'Expelled'
		}
	];

	let errors: any = {};

	const openFeatureImageUpload = () => {
		const myWidget = cloudinary.createUploadWidget(
			{
				cloudName: PUBLIC_CLOUDINARY_CLOUD_NAME,
				uploadPreset: 'cooversa'
			},
			(error: any, result: any) => {
				if (!error && result && result.event === 'success') {
					console.log('Done! Here is the image info: ', result.info);
					newCourseData.featuredImage = result.info.secure_url;
				} else if (error) {
					showAlert({
						message: 'Error uploading image',
						type: 'error'
					});
				}
			}
		);
		myWidget.open();
	};

	let schools: School[] = [];
	let schoolsOptions: Option[] = [];
	let schoolsLoading = true;

	const handleSchoolSearch = async (e: any) => {
		const search = e.detail;
		try {
			schoolsLoading = true;
			schools = await getSchools(search);
		} finally {
			schoolsLoading = false;
		}
	};

	const mapSchoolsToOptions = (schools: School[]) => {
		return schools.map((school) => {
			return {
				value: school.schoolId,
				label: school.name
			};
		});
	};

	$: {
		schoolsOptions = mapSchoolsToOptions(schools);
		// Append a none option to the first index
		schoolsOptions.unshift({
			value: null,
			label: 'None'
		});
	}

	let processing = false;

	const handleSubmit = async () => {
		processing = true;
		errors = {};
		try {
			const data = filteredObj(newCourseData);
			schema.parse(data);

			const response = await client.post('/courses', data);
			showAlert({
				message: 'Course created successfully',
				type: 'success'
			});
			await goto(`/admin/courses`);
		} catch (err) {
			if (err instanceof z.ZodError) {
				errors = err.flatten().fieldErrors;
				console.log(errors);
				return;
			} else if (err instanceof AxiosError) {
				showAlert({
					message: err.response?.data.message || 'Error updating course',
					type: 'error'
				});
			} else {
				showAlert({
					message: 'Error updating course',
					type: 'error'
				});
			}
		} finally {
			processing = false;
		}
	};

	onMount(async () => {
		schoolsLoading = true;
		try {
			schools = await getSchools();
			schoolsOptions = mapSchoolsToOptions(schools);
		} catch (error) {
			console.log(error);
		} finally {
			schoolsLoading = false;
		}
	});
</script>

<svelte:head>
	<title>New Course - Cooversa Admin</title>
</svelte:head>

<main>
	<Breadcrumb {breadcrumbs} />

	<form
		on:submit|preventDefault={handleSubmit}
		class="form py-5 gap-x-10 grid grid-cols-1  w-full md:grid-cols-2"
	>
		<div class="form-group md:col-span-2">
			<label for="name" class="form-label">Name:</label>
			<input id="name" type="text" class="form-input-full" bind:value={newCourseData.name} />
			{#if errors.name}
				{#each errors.name as error}
					<p class="form-error">{error}</p>
				{/each}
			{/if}
		</div>

		<div class="form-group ">
			<label for="excerpt" class="form-label">Excerpt:</label>
			<textarea id="excerpt" class="form-input-full h-full" bind:value={newCourseData.excerpt} />
			{#if errors.excerpt}
				{#each errors.excerpt as error}
					<p class="form-error">{error}</p>
				{/each}
			{:else}
				<p class="mt-2 text-xs font-medium text-gray-500">
					A short description of the course, please be clear and concise
				</p>
			{/if}
		</div>

		<div class="form-group ">
			<label for="featuredImage" class="form-label">Featured Image</label>
			{#if newCourseData.featuredImage}
				<div class="w-full overflow-hidden max-h-60">
					<img
						src={newCourseData.featuredImage}
						alt="Featured"
						class="w-full object-cover object-center"
					/>
				</div>
			{:else}
				<div class="w-full h-52 bg-gray-200" />
			{/if}
			<div class="mt-2">
				{#if errors.featuredImage}
					{#each errors.featuredImage as error}
						<p class="text-red-500 text-xs font-medium">{error}</p>
					{/each}
				{/if}
			</div>
			<button class="button mt-5" type="button" on:click={openFeatureImageUpload}>Upload</button>
		</div>

		<div class="form-group md:col-span-2">
			<label for="description" class="form-label">Description:</label>
			<RichTextEditor bind:html={newCourseData.description} />
			{#if errors.description}
				{#each errors.description as error}
					<p class="form-error">{error}</p>
				{/each}
			{/if}
		</div>

		<div class="form-group">
			<label for="accepted_statuses" class="form-label">Accepted Statuses</label>
			<Selector
				selectMultiple={true}
				options={acceptedStatusesOptions}
				placeholder="Accepted Statuses"
				full={true}
				name="acceptedStatuses"
				bind:selected={newCourseData.acceptedStatuses}
			/>
			{#if errors.acceptedStatuses}
				{#each errors.acceptedStatuses as error}
					<p class="form-error">{error}</p>
				{/each}
			{:else}
				<p class="mt-2 text-xs font-medium text-gray-500">
					Select the statuses that will be accepted for this course.
				</p>
			{/if}
		</div>

		<div class="form-group">
			<label for="accepted_statuses" class="form-label">School (optional)</label>
			<Selector
				options={schoolsOptions}
				placeholder="Select School"
				full={true}
				name="school"
				bind:selected={newCourseData.schoolId}
				optionsLoading={schoolsLoading}
				on:search={handleSchoolSearch}
				handleSearchExternally
			/>
			{#if errors.schoolId}
				{#each errors.schoolId as error}
					<p class="form-error">{error}</p>
				{/each}
			{:else}
				<p class="mt-2 text-xs font-medium text-gray-500">
					The school that the course is directly below.
				</p>
			{/if}
		</div>

		<div class="form-group col-span-2">
			<button class="form-button">
				{#if processing}
					<LoadingSvg />
				{:else}
					Create Course
				{/if}
			</button>
		</div>
	</form>
</main>
