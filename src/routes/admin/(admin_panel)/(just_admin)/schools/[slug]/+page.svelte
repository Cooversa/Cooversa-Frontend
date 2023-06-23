<script lang="ts">
	import { page } from '$app/stores';
	import client from '$lib/client';
	import type { Course, School } from '$lib/client/schools/types';
	// import Editor from '$lib/shared/components/Editor.svelte';
	import Loading from '$lib/shared/components/Loading.svelte';
	import { showAlert } from '$lib/utils/alert';
	import { AxiosError } from 'axios';
	import { onMount } from 'svelte';
	import { getAllCourses } from '../../../courses/logic';
	import type { BreadcrumbType } from '$lib/shared/types/breadcrumbs.types';
	import Breadcrumb from '$lib/shared/components/Breadcrumb.svelte';
	import LoadingSvg from '../../../../../../lib/shared/components/LoadingSvg.svelte';

	const breadcrumbs: BreadcrumbType[] = [
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

	const slug: string = $page.params.slug;

	let school: School;
	let loading: boolean = false;
	let processing: boolean = false;

	const handleSubmit = async () => {
		processing = true;
		try {
			await client.patch(`schools/${slug}`, school);
			showAlert({
				message: 'School updated successfully!',
				type: 'success'
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
			processing = false;
		}
	};

	onMount(async () => {
		loading = true;
		try {
			const response = await client.get(`schools/${slug}`);
			school = response.data;
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
		<Breadcrumb {breadcrumbs} />
		<form on:submit|preventDefault={handleSubmit} class="form py-5 ">
			<div class="form-group">
				<label for="name" class="form-label">Name:</label>
				<input id="name" type="text" class="form-input-full" bind:value={school.name} />
			</div>
			<div class="form-group">
				<label for="slug" class="form-label">Slug:</label>
				<input id="slug" type="text" class="form-input-full" disabled bind:value={school.slug} />
			</div>
			<div class="form-group">
				<label for="description" class="form-label">Description:</label>
				<textarea
					id="description"
					rows="5"
					class="form-input-full"
					bind:value={school.description}
				/>
			</div>
			<div class="form-group ">
				<button type="submit" class="form-button">
					{#if processing}
						<LoadingSvg />
					{:else}
						Save
					{/if}
				</button>
			</div>
		</form>
	</main>
{/if}
