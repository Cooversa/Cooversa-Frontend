<script lang="ts">
	import type { BreadcrumbType } from '$lib/shared/types/breadcrumbs.types';
	import Breadcrumb from '$lib/shared/components/Breadcrumb.svelte';
	import Selector from '../../../../../../lib/shared/components/Selector.svelte';
	import type { Option } from '../../../../../../lib/shared/types/selector.types';
	import type { School } from '../../../../../../lib/client/schools/types';
	import { onMount } from 'svelte';
	import { getSchools } from '../../../../../../lib/client/schools';
	import LoadingSvg from '../../../../../../lib/shared/components/LoadingSvg.svelte';
	import { filteredObj } from '../../../../../../lib/utils/removeEmptyString';
	import { schema } from '../schema';
	import { z } from 'zod';
	import client from '../../../../../../lib/client';
	import { showAlert } from '../../../../../../lib/utils/alert';
	import { AxiosError } from 'axios';
	import { goto } from '$app/navigation';

	let data: any = {
		name: '',
		description: '',
		schoolId: ''
	};

	let schools: School[] = [];
	let schoolOptions: Option[] = [];
	let schoolLoading: boolean = false;

	let processing = false;

	let errors: any = {};

	let breadcrumbs: BreadcrumbType[] = [
		{
			name: 'Dashboard',
			href: '/admin',
			active: false
		},
		{
			name: 'Tracks',
			href: '/admin/tracks',
			active: false
		},
		{
			name: 'New Track',
			href: '/admin/tracks/new',
			active: true
		}
	];

	const handleSchoolSearch = async (e: any) => {
		let search = e.detail;
		try {
			schoolLoading = true;
			schools = await getSchools(search);
		} finally {
			schoolLoading = false;
		}
	};

	$: {
		schoolOptions = schools.map((school) => {
			return {
				value: school.schoolId,
				label: school.name
			};
		});

		schoolOptions.unshift({
			value: null,
			label: 'None'
		});
	}

	const handleSubmit = async () => {
		processing = true;
		errors = {};
		try {
			data = filteredObj(data);
			schema.parse(data);
			await client.post('/tracks', data);
			showAlert({
				message: 'Track created successfully',
				type: 'success'
			});
			await goto('/admin/tracks');
		} catch (err) {
			if (err instanceof z.ZodError) {
				errors = err.flatten().fieldErrors;
			} else if (err instanceof AxiosError) {
				showAlert({
					message: err.response?.data.message || 'Error creating track',
					type: 'error'
				});
			} else {
				showAlert({
					message: 'Error creating track',
					type: 'error'
				});
			}
		} finally {
			processing = false;
		}
	};

	onMount(async () => {
		try {
			schoolLoading = true;
			schools = await getSchools();
		} finally {
			schoolLoading = false;
		}
	});
</script>

<svelte:head>
	<title>New Track - Cooversa Admin</title>
</svelte:head>

<main>
	<Breadcrumb {breadcrumbs} />

	<form class="grid grid-cols-1 md:grid-cols-2 gap-5 " on:submit|preventDefault={handleSubmit}>
		<div class="form-group">
			<label for="name" class="form-label">Name: </label>
			<input type="text" id="name" class="form-input-full" bind:value={data.name} />
			{#if errors.name}
				{#each errors.name as error}
					<p class="form-error">{error}</p>
				{/each}
			{/if}
		</div>

		<div class="form-group">
			<label for="school" class="form-label">School</label>
			<Selector
				name="school"
				handleSearchExternally
				options={schoolOptions}
				optionsLoading={schoolLoading}
				bind:selected={data.schoolId}
				placeholder="Search for a school"
				on:search={handleSchoolSearch}
				full
			/>
			{#if errors.schoolId}
				{#each errors.schoolId as error}
					<p class="form-error">{error}</p>
				{/each}
			{/if}
		</div>

		<div class="form-group md:col-span-2">
			<label for="description" class="form-label">Description: </label>
			<textarea id="description" rows="10" class="form-input-full" bind:value={data.description} />
			{#if errors.description}
				{#each errors.description as error}
					<p class="form-error">{error}</p>
				{/each}
			{/if}
		</div>

		<div class="form-group md:col-span-2">
			<button class="form-button">
				{#if processing}
					<LoadingSvg />
				{:else}
					Create School
				{/if}
			</button>
		</div>
	</form>
</main>
