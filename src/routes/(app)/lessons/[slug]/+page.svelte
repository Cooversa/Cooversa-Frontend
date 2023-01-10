<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import Video from '../../../../lib/shared/components/Video.svelte';

	export let data: any;

	let { lesson, nextLesson, previousLesson } = data;
	let poster = lesson.featuredImage;
	let videoUrl = lesson.videoUrl;

	$: lesson = data.lesson;
	$: nextLesson = data.nextLesson;
	$: previousLesson = data.previousLesson;
	$: poster = lesson.featuredImage;
	$: videoUrl = lesson.videoUrl;

	onMount(() => {
		if (browser) {
			const video = document.querySelector('.video');
			if (video) {
				video.addEventListener('play', () => {
					video.setAttribute('data-poster', '');
				});
			}
		}
		const player = new Plyr('#player');
	});
</script>

<svelte:head>
	<title>{lesson.name}</title>
</svelte:head>

<main>
	<h1 class="md:text-4xl text-2xl font-bold mb-10">{lesson.name}</h1>
	<div class="mb-10 max-w-full rounded overflow-hidden mx-auto">
		{#if videoUrl}
			<video class="player video" id="player" playsinline controls data-poster={poster}>
				<source src={videoUrl} type="video/mp4" />
			</video>
		{:else}
			<img src={poster} alt={lesson.name} class="w-full" />
		{/if}
	</div>
	<article class="md:prose prose-sm max-w-none" style="max-width: none;">
		{@html lesson.content}
	</article>
	<div class="flex justify-between mt-5">
		<div class="md:w-1/4 w-1/2  overflow-hidden">
			{#if previousLesson}
				<a href="/lessons/{previousLesson.slug}">
					<div class="bg-primary px-3 py-2 rounded-full text-white flex items-center space-x-5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							class="w-5 h-5 rotate-180"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
							/>
						</svg>
						<p class="w-full line-clamp-1 ">{previousLesson.name}</p>
					</div>
				</a>
			{/if}
		</div>

		<div class="md:w-1/4 w-1/2 overflow-hidden">
			{#if nextLesson}
				<a href="/lessons/{nextLesson.slug}">
					<div class="space-x-5 bg-primary px-3 py-2 rounded-full text-white flex items-center">
						<p class="w-full line-clamp-1 ">{nextLesson.name}</p>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							class="w-5 h-5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
							/>
						</svg>
					</div>
				</a>
			{/if}
		</div>
	</div>
</main>
