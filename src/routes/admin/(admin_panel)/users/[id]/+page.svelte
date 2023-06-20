<script lang="ts">
	import { page } from '$app/stores';
	import client from '$lib/client';
	import type { User } from '$lib/client/users/types';
	import Loading from '$lib/shared/components/Loading.svelte';
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
			console.log(user);
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
	{#if user}
		<title>{user.profile.firstName} {user.profile.lastName} | Cooversa Admin</title>
	{:else}
		<title>User Detail | Cooversa Admin</title>
	{/if}
</svelte:head>

{#if loading}
	<Loading />
{:else if user}
	<main class="px-5">
		<form class="form py-5 grid grid-cols-1  w-full md:grid-cols-2">
			<div class="form-group">
				<label for="firstName" class="form-label">First Name:</label>
				<input id="firstName" type="text" class="form-input" bind:value={user.profile.firstName} />
			</div>
			<div class="form-group">
				<label for="lastName" class="form-label">Last Name:</label>
				<input id="lastName" type="text" class="form-input" bind:value={user.profile.lastName} />
			</div>
			<div class="form-group">
				<label for="email" class="form-label">Email:</label>
				<input id="email" type="email" disabled class="form-input" bind:value={user.email} />
			</div>
			<div class="form-group">
				<label for="phone" class="form-label">Phone number:</label>
				<input type="phone" disabled class="form-input" bind:value={user.profile.phoneNumber} />
			</div>
			<div class="form-group">
				<label for="country" class="form-label">Country:</label>
				<input
					id="country"
					type="text"
					disabled
					class="form-input"
					bind:value={user.profile.country}
				/>
			</div>
			<div class="form-group">
				<label for="state" class="form-label">State:</label>
				<input id="state" type="text" disabled class="form-input" bind:value={user.profile.state} />
			</div>

			<div class="form-group">
				<label for="role" class="form-label">Role:</label>
				<Selector
					name="Role"
					placeholder="User Role"
					options={RoleOptions}
					bind:selected={user.role}
					on:selected={handleRoleSelected}
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
				/>
			</div>
			<div class="form-group">
				<label for="gender" class="form-label">Gender:</label>
				<Selector
					name="Status"
					placeholder="User Status"
					options={GenderOption}
					bind:selected={user.profile.gender}
					on:selected={handleGenderSelected}
				/>
			</div>
		</form>
	</main>
{/if}
