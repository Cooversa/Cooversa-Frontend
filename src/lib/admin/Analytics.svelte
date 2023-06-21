<script lang="ts">
	import type { User } from '$lib/client/users/types';
	import { onMount } from 'svelte';
	import { AxiosError } from 'axios';
	import client from '$lib/client';
	import { showAlert } from '$lib/utils/alert';
	import LoadingSvg from '../shared/components/LoadingSvg.svelte';

	import Chart from 'svelte-frappe-charts';
	import type { Course, School, Track } from '../client/schools/types';

	let users: User[];
	let totalStudents: number;

	let schools: School[];
	let totalSchools: number;

	let courses: Course[];
	let totalCourses: number;

	let usersAnalytics: any;

	const getUsers = async () => {
		try {
			const response = await client.get('/users', {
				params: {
					skip: 0,
					limit: 500,
					page: 1,
					filterMode: 'insensitive',
					'filter.role': 'equals:STUDENT'
				}
			});
			users = response.data.items;
			totalStudents = response.data.meta.totalCount;
		} catch (error: any) {
			if (error instanceof AxiosError) {
				showAlert({
					type: 'error',
					message: "Ooops something went wrong... Couldn't fetch users"
				});
				throw error;
			}
			return error;
		}
	};
	const getSchools = async () => {
		try {
			const response = await client.get('/schools', {
				params: {
					skip: 0,
					limit: 500,
					page: 1
				}
			});
			schools = response.data.items;
			totalSchools = response.data.meta.totalCount;
		} catch (error: any) {
			if (error instanceof AxiosError) {
				showAlert({
					type: 'error',
					message: "Ooops something went wrong... Couldn't fetch schools"
				});
				throw error;
			}
			return error;
		}
	};
	const getCourses = async () => {
		try {
			const response = await client.get('/courses', {
				params: {
					skip: 0,
					limit: 500,
					page: 1
				}
			});
			courses = response.data.items;
			totalCourses = response.data.meta.totalCount;
		} catch (error: any) {
			if (error instanceof AxiosError) {
				showAlert({
					type: 'error',
					message: "Ooops something went wrong... Couldn't fetch schools"
				});
				throw error;
			}
			return error;
		}
	};

	let loading = false;

	onMount(async () => {
		loading = true;
		try {
			await getUsers();
			await getSchools();
			await getCourses();
		} finally {
			loading = false;
		}

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

<section class="py-10">
	<div class="mb-5">
		<h2 class="text-2xl text-gray-500 font-medium">Basic Analytics</h2>
		<p class="text-gray-500 text-sm">
			These are basic analytics for Cooversa, more will be added in the future
		</p>
	</div>
	{#if loading}
		<div class="flex justify-center">
			<svg
				class="animate-spin  h-5 w-5 text-primary"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
			</svg>
		</div>
	{:else}
		<div class="grid gris-cols-2 gap-5 md:gap-10 md:grid-cols-3 mb-5">
			<!-- Card to display total students -->
			<div class="bg-white w-full h-full shadow-md rounded-md p-5 border-b-4 border-primary">
				<h3 class="text-xl text-gray-500 font-medium">Students</h3>
				<p class="text-3xl text-gray-500 font-bold mt-5">{totalStudents}</p>
			</div>
			<!-- Card to display total students -->
			<div class="bg-white w-full h-full shadow-md rounded-md p-5 border-b-4 border-primary">
				<h3 class="text-xl text-gray-500 font-medium">Schools</h3>
				<p class="text-3xl text-gray-500 font-bold mt-5">{totalSchools}</p>
			</div>
			<!-- Card to display total students -->
			<div class="bg-white w-full h-full shadow-md rounded-md p-5 border-b-4 border-primary">
				<h3 class="text-xl text-gray-500 font-medium">Courses</h3>
				<p class="text-3xl text-gray-500 font-bold mt-5">{totalCourses}</p>
			</div>
		</div>
		<div>
			{#if users}
				<div class="w-full h-full">
					<Chart
						data={usersAnalytics}
						type="line"
						title="Weekly User Analytics"
						colors={[
							'#5c57ff',
							'#1b3bff',
							'#8F00FF',
							'#ff0011',
							'#ff7300',
							'#ffd600',
							'#00c30e',
							'#65ff00',
							'#d200ff',
							'#FF00FF',
							'#7d7d7d',
							'#5d5d5d'
						]}
					/>
				</div>
			{:else}
				<LoadingSvg />
			{/if}
		</div>
	{/if}
</section>
