<script lang="ts">
	import Users from '$lib/admin/Users.svelte';
	import 'iconify-icon';
</script>

<svelte:head>
	<title>Users - Cooversa Admin</title>
</svelte:head>
<section class="admin-home py-[2.5em] ">
	<section>
		<p class="text-lg text-gray-300 mb-12">
			<a href="/admin">Dashboard</a> / <span class="text-primary font-medium">users</span>
		</p>
	</section>

	<Users />
</section>

<style>
</style>
