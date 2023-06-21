<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-french-toast';
</script>

<Toaster />
<slot />
