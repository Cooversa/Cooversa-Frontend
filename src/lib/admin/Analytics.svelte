<script lang="ts">
	import type { User } from '$lib/client/users/types';
	import { onMount } from 'svelte';
	import { AxiosError } from 'axios';
	import client from '$lib/client';
	import { showAlert } from '$lib/utils/alert';
	import LoadingSvg from '../shared/components/LoadingSvg.svelte';

	import Chart from 'svelte-frappe-charts';

	let params = {
		skip: 0,
		limit: 10,
		page: 1,
		filterMode: 'insensitive',
		'filter.role': 'equals:STUDENT'
	};

	const getUsers = async (): Promise<User[]> => {
		try {
			const response = await client.get('/users', {
				params: { ...params }
			});
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

	let users: User[];

	let usersAnalytics: any;

	onMount(async () => {
		users = await getUsers();

		/* 
            Sanitize users to a format that can be used by the chart

            {
                labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
                datasets: [
                {
                    values: [10, 12, 3, 9, 8, 15, 9]
                }
                ]
            };
        */

		// Get data for the chart from the users array
		usersAnalytics = users.reduce(
			(acc: any, user: User) => {
				// Get the day of the week the user was created
				const day = new Date(user.createdAt).getDay();

				// Increment the value of the day by 1
				acc.datasets[0].values[day] += 1;

				return acc;
			},
			{
				labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
				datasets: [
					{
						values: [0, 0, 0, 0, 0, 0, 0]
					}
				]
			}
		);
	});
</script>

{#if users}
	<Chart data={usersAnalytics} type="line" />
{:else}
	<LoadingSvg />
{/if}
