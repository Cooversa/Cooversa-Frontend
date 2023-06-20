<script lang="ts">
	import Users from '$lib/admin/Users.svelte';
	import 'iconify-icon';
</script>

<svelte:head>
	<title>Users - Cooversa Admin</title>
</svelte:head>
<section class="admin-home py-[2.5em] ">
	<section>
		<p class="md:text-xl text-gray-300 mb-12">
			Dashboard / <span class="text-gray-700 text-lg">users</span>
		</p>
	</section>

	<Users />
</section>

<style>
</style>
