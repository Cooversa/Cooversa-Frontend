<script lang="ts">
	import { PUBLIC_TINY_MCE_API_KEY } from '$env/static/public';
	import Editor from '@tinymce/tinymce-svelte';
	import { tinymce_config } from '$lib/utils/tinymce';
	export let html: string;
</script>

<Editor bind:value={html} apiKey={PUBLIC_TINY_MCE_API_KEY} conf={tinymce_config} />
