<script lang="ts">
	import { page } from '$app/stores';
	import client from '$lib/client';
	import type { User } from '$lib/client/users/types';
	import Loading from '$lib/shared/components/Loading.svelte';
	import LoadingSvg from '$lib/shared/components/LoadingSvg.svelte';
	import Selector from '$lib/shared/components/Selector.svelte';
	import { showAlert } from '$lib/utils/alert';
	import { AxiosError } from 'axios';
	import { onMount } from 'svelte';

	const id = $page.params.id;

	let loading = false;
	let user: User;

	const handleRoleSelected = (e: CustomEvent) => {
		user.role = e.detail;
	};
	const handleStatusSelected = (e: CustomEvent) => {
		user.status = e.detail;
	};
	const handleGenderSelected = (e: CustomEvent) => {
		user.profile.gender = e.detail;
	};

	const RoleOptions = [
		{
			label: 'Admin',
			value: 'ADMIN'
		},
		{
			label: 'Student',
			value: 'STUDENT'
		},
		{
			label: 'Teacher',
			value: 'TEACHER'
		}
	];

	const StatusOption = [
		{
			label: 'Applied',
			value: 'APPLIED'
		},
		{
			label: 'Pending Payment',
			value: 'PENDING_PAYMENT'
		},
		{
			label: 'Accepted',
			value: 'ACCEPTED'
		},
		{
			label: 'Probation',
			value: 'PROBATION'
		},
		{
			label: 'Expelled',
			value: 'EXPELLED'
		}
	];

	const GenderOption = [
		{
			label: 'Male',
			value: 'male'
		},
		{
			label: 'Female',
			value: 'female'
		},
		{
			label: 'Prefer not to say',
			value: 'prefer_not_to_say'
		},
		{
			label: 'Others',
			value: 'others'
		}
	];

	onMount(async () => {
		loading = true;
		try {
			const response = await client.get<User>(`/users/${id}`);
			user = response.data;
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

	let saving = false;

	const handleSave = async () => {
		saving = true;
		try {
			await client.patch(`/users/${user.userId}`, user);
			if (user.profile) {
				await client.patch(`/users/profile/${user.userId}`, user.profile);
			}

			showAlert({
				message: 'User updated successfully',
				type: 'success'
			});
		} catch (err) {
			if (err instanceof AxiosError) {
				showAlert({
					message:
						err.response?.data.message || 'Ooops... something went wrong, please try again later!',
					type: 'error'
				});
				return;
			}
			showAlert({
				message: 'Ooops... something went wrong, please try again later!',
				type: 'error'
			});
		} finally {
			saving = false;
		}
	};
</script>

<svelte:head>
	{#if user && user.profile}
		<title>{user.profile.firstName} {user.profile.lastName} | Cooversa Admin</title>
	{:else}
		<title>User Detail | Cooversa Admin</title>
	{/if}
</svelte:head>

{#if loading}
	<Loading />
{:else if user}
	<main>
		<section>
			<p class="text-lg text-gray-300 mb-12">
				<a href="/admin">Dashboard</a> / <a href="/admin/users">users</a> /
				<span class="text-primary font-medium">{user.userId}</span>
			</p>
		</section>
		<form
			on:submit|preventDefault={handleSave}
			class="form py-5 gap-x-10 grid grid-cols-1  w-full md:grid-cols-1"
		>
			{#if user.profile}
				<div class="form-group">
					<label for="firstName" class="form-label">First Name:</label>
					<input
						id="firstName"
						type="text"
						class="form-input-full"
						bind:value={user.profile.firstName}
					/>
				</div>
				<div class="form-group">
					<label for="lastName" class="form-label">Last Name:</label>
					<input
						id="lastName"
						type="text"
						class="form-input-full"
						bind:value={user.profile.lastName}
					/>
				</div>
				<div class="form-group">
					<label for="lastName" class="form-label">Age:</label>
					<input id="lastName" type="text" class="form-input-full" bind:value={user.profile.age} />
				</div>
			{/if}
			<div class="form-group">
				<label for="email" class="form-label">Email:</label>
				<input id="email" type="email" disabled class="form-input-full" bind:value={user.email} />
			</div>
			{#if user.profile}
				<div class="form-group">
					<label for="phone" class="form-label">Phone number:</label>
					<input
						type="phone"
						disabled
						class="form-input-full"
						bind:value={user.profile.phoneNumber}
					/>
				</div>
				<div class="form-group">
					<label for="country" class="form-label">Country:</label>
					<input
						id="country"
						type="text"
						disabled
						class="form-input-full"
						bind:value={user.profile.country}
					/>
				</div>
				<div class="form-group">
					<label for="state" class="form-label">State:</label>
					<input
						id="state"
						type="text"
						disabled
						class="form-input-full"
						bind:value={user.profile.state}
					/>
				</div>
			{/if}

			<div class="form-group">
				<label for="role" class="form-label">Role:</label>
				<Selector
					name="role"
					placeholder="User Role"
					options={RoleOptions}
					bind:selected={user.role}
					on:selected={handleRoleSelected}
					full
				/>
			</div>
			<div class="form-group">
				<label for="status" class="form-label">Status:</label>
				<Selector
					name="Status"
					placeholder="User Status"
					options={StatusOption}
					bind:selected={user.status}
					on:selected={handleStatusSelected}
					full
				/>
			</div>
			{#if user.profile}
				<div class="form-group">
					<label for="gender" class="form-label">Gender:</label>
					<Selector
						name="Status"
						placeholder="Gender"
						options={GenderOption}
						bind:selected={user.profile.gender}
						on:selected={handleGenderSelected}
						full
					/>
				</div>
			{/if}

			<div class="form-group md:col-span-2">
				<button class="w-full rounded flex justify-center px-3 py-2 bg-primary text-white">
					{#if saving} <LoadingSvg /> {:else} Save {/if}
				</button>
			</div>
		</form>
		{#if !user.profile}
			<p class="text-sm font-medium text-gray-500">
				Note: This user hasn't completed their registration
			</p>
		{/if}
	</main>
{/if}
