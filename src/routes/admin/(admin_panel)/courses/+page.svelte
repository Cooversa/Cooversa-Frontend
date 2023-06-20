<script lang="ts">
	import { onMount } from 'svelte';
	import { getAllCourses } from './logic';

	onMount(async () => {
		await getAllCourses();
	});
</script>

<main>
	<section>
		<p class="text-lg text-gray-300 mb-12">
			<a href="/admin">Dashboard</a> /
			<span class="text-primary font-medium">courses</span>
		</p>
	</section>
</main>
