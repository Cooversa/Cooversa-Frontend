<script lang="ts">
	import Users from '$lib/admin/Users.svelte';
	import 'iconify-icon';

	import type { BreadcrumbType } from '$lib/shared/types/breadcrumbs.types';
	import Breadcrumb from '../../../../../lib/shared/components/Breadcrumb.svelte';

	let breadcrumbs: BreadcrumbType[] = [
		{
			name: 'Dashboard',
			href: '/admin',
			active: false
		},
		{
			name: 'users',
			href: '/admin/users',
			active: true
		}
	];
</script>

<svelte:head>
	<title>Users - Cooversa Admin</title>
</svelte:head>
<section class="admin-home py-[2.5em] ">
	<Breadcrumb {breadcrumbs} />

	<Users />
</section>

<style>
</style>
