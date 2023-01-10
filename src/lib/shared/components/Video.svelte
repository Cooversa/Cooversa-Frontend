<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte/types/runtime/internal/lifecycle';

	export let videoUrl: string;
	export let poster: string;

	onMount(async () => {
		if (browser) {
			const video = document.getElementById('video');
			const videoControls = document.getElementById('video-controls');

			const videoWorks = !!document.createElement('video').canPlayType;

			if (videoWorks) {
				video?.controls = false;
				videoControls?.classList.remove('hidden');
			}
		}
	});
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video id="video" playsinline controls data-poster={poster}>
	<source src={videoUrl} type="video/mp4" />
</video>
