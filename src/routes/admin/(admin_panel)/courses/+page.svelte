<script lang="ts">
	import { onMount } from 'svelte';
	import { getAllCourses } from './logic';

	onMount(async () => {
		await getAllCourses();
	});
</script>
