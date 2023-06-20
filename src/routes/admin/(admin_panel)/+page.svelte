<script lang="ts">
	import { currentUser } from '$lib/stores/auth';
</script>

<main>
	<div class="mb-10">
		<h2 class="text-2xl font-semibold">
			Welcome <span class="text-primary">{$currentUser?.profile.firstName || 'Admin'}</span>
		</h2>
	</div>
	<div class="grid grid-cols-2 md:grid-cols-2 gap-5 md:gap-10">
		<a
			href="/admin/users"
			class="shadow transition-all duration-300 p-5 flex flex-col justify-center space-y-2 items-center rounded hover:shadow-md border "
		>
			<iconify-icon icon="mdi:users" class="text-primary" width="30" />
			<h3 class="text-lg font-medium">Users</h3>
		</a>
		<a
			href="/admin/courses"
			class="shadow transition-all duration-300 p-5 flex flex-col justify-center space-y-2 items-center rounded hover:shadow-md border "
		>
			<iconify-icon icon="ph:books-duotone" class="text-primary" width="30" />
			<h3 class="text-lg font-medium">Courses</h3>
		</a>
		<a
			href="/admin/schools"
			class="shadow transition-all duration-300 p-5 flex flex-col justify-center space-y-2 items-center rounded hover:shadow-md border "
		>
			<iconify-icon icon="ep:school" class="text-primary" width="30" />
			<h3 class="text-lg font-medium">Schools</h3>
		</a>
		<a
			href="/admin/tracks"
			class="shadow transition-all duration-300 p-5 flex flex-col justify-center space-y-2 items-center rounded hover:shadow-md border "
		>
			<iconify-icon icon="ph:git-branch-duotone" class="text-primary" width="30" />
			<h3 class="text-lg font-medium">Tracks</h3>
		</a>
	</div>
</main>
