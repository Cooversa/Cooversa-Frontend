<script lang="ts">
	import type { BreadcrumbType } from '$lib/shared/types/breadcrumbs.types';

	export let breadcrumbs: BreadcrumbType[];
</script>

<section>
	<p class="text-lg text-gray-300 mb-12">
		{#each breadcrumbs as breadcrumb}
			{#if breadcrumb.active}
				<span class="text-primary font-medium">{breadcrumb.name}</span>
			{:else}
				<a href={breadcrumb.href}>{breadcrumb.name} / </a>
			{/if}
		{/each}
	</p>
</section>
