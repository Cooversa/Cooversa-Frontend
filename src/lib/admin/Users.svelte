<script lang="ts">
	import client from '$lib/client';
	import { showAlert } from '$lib/utils/alert';
	import { AxiosError } from 'axios';
	import LoadingSvg from '$lib/shared/components/LoadingSvg.svelte';
	import type { User } from '$lib/client/users/types';
	import { goto } from '$app/navigation';

	let params = {
		skip: 0,
		limit: 10,
		page: 1,
		filterMode: 'insensitive',
		'filter.role': 'equals:STUDENT'
	};

	let filterParams: any = {};
	let paginationMeta: any = null;

	const getUsers = async (): Promise<User[]> => {
		try {
			const response = await client.get('/users', {
				params: { ...params, ...filterParams }
			});
			paginationMeta = response.data.meta;
			return response.data.items;
		} catch (error: any) {
			if (error instanceof AxiosError) {
				showAlert({
					type: 'error',
					message: "Ooops something went wrong... Couldn't fetch users"
				});
				// console.log(error);
				throw error;
			}
			return error;
		}
	};

	let users = getUsers();

	const tableHeaders = ['email', 'status', 'role', 'isEmailVerified', 'createdAt'];

	let input: HTMLInputElement;

	const focusInput = () => {
		input.focus();
		input.style.flexBasis = '80%';
	};

	let filter = '';

	$: {
		try {
			// Modify the string to be a valid JSON format by adding double quotes around the keys
			const modifiedString = filter.replace(/'/g, '"');
			// Parse the modified string using JSON.parse()
			const parsedObject = JSON.parse(modifiedString);

			for (const key in parsedObject) {
				if (key === 'role') continue;
				filterParams[`filter.${key}`] = parsedObject[key];
			}
		} catch {}
	}

	const handleFilter = async () => {
		users = getUsers();
	};
</script>

<main class="relative">
	<form on:submit={handleFilter} class="w-full mb-20">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			on:click={focusInput}
			class="w-full rounded-3xl cursor-text flex item-center px-2 justify-between py-2 transition-all bg-gray-100"
		>
			<div class="flex w-[83%] gap-2 items-center">
				<label for="search-input" class="hidden">Search</label>
				<input
					bind:value={filter}
					bind:this={input}
					type="text"
					id="search-input"
					name="search-input"
					aria-label="Search"
					placeholder={`{ 'email': 'contains:johndoe@company.com', 'status': 'equals:APPLIED' }`}
					class="outline-none bg-transparent w-full px-1 text-sm"
				/>
			</div>

			<button
				on:click={handleFilter}
				class="bg-primary flex justify-center rounded-full text-white p-1 "
				><iconify-icon icon="ic:outline-search" width="20" /></button
			>
		</div>
		<p class="text-xs text-gray-500 font-medium pt-5">
			Available Operators: equals, contains, not, in, notIn, lt (less than), gt (greater than), gte
			(greater than or equals), lte (less than or equals to), search, startsWith, endsWith
		</p>
	</form>

	<div class="flex flex-col overflow-x-auto rounded-lg shadow-md border">
		<div class="sm:-mx-6 lg:-mx-8">
			<div class="inline-block min-w-full  sm:px-6 lg:px-8">
				<div class="overflow-x-auto">
					<table class="min-w-full text-left text-sm font-light">
						<thead class="bg-gray-100 font-medium dark:border-neutral-500">
							<tr>
								{#each tableHeaders as header}
									<th scope="col" class="font-normal text-gray-500 px-6 py-4">
										<div class="">
											<p class="font-semibold  text-sm">{header}</p>
										</div>
									</th>
								{/each}
							</tr>
						</thead>
						<tbody>
							{#await users}
								<LoadingSvg />
							{:then users}
								{#each users as user}
									<tr
										class="rounded cursor-pointer hover:bg-gray-100 text-sm "
										on:click={() => goto(`/admin/users/${user.userId}`)}
									>
										<td class="whitespace-nowrap px-6 py-4">{user.email}</td>
										<td class="whitespace-nowrap px-6 py-4">{user.status}</td>
										<td class="whitespace-nowrap px-6 py-4">{user.role}</td>
										<td class="whitespace-nowrap px-6 py-4">
											{#if user.isEmailVerified}
												<iconify-icon
													icon="material-symbols:check"
													style="color: #22c55e;"
													width="20"
												/>
											{:else}
												<iconify-icon icon="heroicons:x-mark" class="text-red-500" width="20" />
											{/if}
										</td>
										<td class="overflow-ellipsis"
											>{new Date(user.createdAt).toLocaleDateString('US', {
												weekday: 'short',
												day: '2-digit',
												month: 'short',
												year: 'numeric'
											})}</td
										>
									</tr>
								{/each}
							{/await}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	th > div {
		display: flex;
		align-items: center;
		justify-items: center;
		gap: 10px;
		width: 100%;
	}
	th,
	td {
		/* border: 1px solid #dddddd; */
		text-align: left;
		padding: 15px;
	}
</style>
