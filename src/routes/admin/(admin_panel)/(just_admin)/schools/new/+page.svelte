<script lang="ts">
	import type { BreadcrumbType as BreadcrumbType } from '$lib/shared/types/breadcrumbs.types';
	import Breadcrumb from '$lib/shared/components/Breadcrumb.svelte';
	import LoadingSvg from '$lib/shared/components/LoadingSvg.svelte';
	import { schema } from './schema';
	import { filteredObj } from '$lib/utils/removeEmptyString';
	import { z } from 'zod';
	import client from '$lib/client';
	import { AxiosError } from 'axios';
	import { showAlert } from '$lib/utils/alert';
	import { goto } from '$app/navigation';

	let breadcrumbs: BreadcrumbType[] = [
		{
			name: 'Dashboard',
			href: '/admin',
			active: false
		},
		{
			name: 'schools',
			href: '/admin/schools',
			active: false
		},
		{
			name: 'New School',
			href: '/admin/schools/new',
			active: true
		}
	];

	let data: any = {
		name: '',
		description: ''
	};

	let loading = false;
	let errors: any = {};

	const handleSubmit = async () => {
		errors = {};
		loading = true;
		try {
			data = filteredObj(data);
			schema.parse(data);

			await client.post('/schools', data);
			showAlert({
				message: 'School created successfully',
				type: 'success'
			});
			await goto('/admin/schools');
		} catch (err) {
			if (err instanceof z.ZodError) {
				errors = err.flatten().fieldErrors;
				return;
			} else if (err instanceof AxiosError) {
				showAlert({
					message: err.response?.data.message || 'Oops! Something went wrong',
					type: 'error'
				});
			} else {
				showAlert({
					message: 'Oops! Something went wrong',
					type: 'error'
				});
			}
		} finally {
			loading = false;
		}
	};
</script>

<main>
	<Breadcrumb {breadcrumbs} />

	<form class="form" on:submit|preventDefault={handleSubmit}>
		<div class="form-group">
			<label for="name" class="form-label">Name</label>
			<input
				type="text"
				bind:value={data.name}
				class="form-input-full"
				id="name"
				placeholder="Enter name"
			/>
			{#if errors.name}
				{#each errors.name as error}
					<p class="form-error">{error}</p>
				{/each}
			{/if}
		</div>

		<div class="form-group">
			<label for="description" class="form-label">Description</label>
			<textarea
				bind:value={data.description}
				class="form-input-full"
				id="description"
				placeholder="Enter description"
				rows="5"
			/>
			{#if errors.description}
				{#each errors.description as error}
					<p class="form-error">{error}</p>
				{/each}
			{/if}
		</div>

		<div class="form-group">
			<button type="submit" class="form-button">
				{#if loading}
					<LoadingSvg />
				{:else}
					<span>Submit</span>
				{/if}
			</button>
		</div>
	</form>
</main>
