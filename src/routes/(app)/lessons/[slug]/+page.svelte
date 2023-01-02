<script lang="ts">
	import { onMount } from 'svelte';

	export let data: any;

	let { lesson, nextLesson, previousLesson } = data;
	let poster = lesson.featured_image;
	let video_url = lesson.video_url;

	$: {
		lesson = data.lesson;
		poster = lesson.featured_image;
		video_url = lesson.video_url;
		nextLesson = data.nextLesson;
		previousLesson = data.previousLesson;
	}

	onMount(() => {
		const player = new Plyr('#player');
	});
</script>

<svelte:head>
	<title>{lesson.name}</title>
</svelte:head>

<main>
	<h1 class="md:text-4xl text-2xl font-bold mb-10">{lesson.name}</h1>
	<div class="mb-10 max-w-full rounded overflow-hidden mx-auto">
		{#if lesson.video_url}
			<video class="player" id="player" playsinline controls data-poster={poster}>
				<source src={video_url} type="video/mp4" />
			</video>
		{:else}
			<img src={poster} alt={lesson.name} class="w-full" />
		{/if}
	</div>
	<article class="md:prose prose-sm max-w-none" style="max-width: none;">
		{@html lesson.content}
	</article>
	<div class="flex justify-between mt-5">
		{#if previousLesson}
			<div class="md:w-1/4 w-1/2  overflow-hidden">
				<a href="/lessons/{previousLesson.slug}" target="_self">
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
			</div>
		{/if}

		{#if nextLesson}
			<div class="md:w-1/4 w-1/2 overflow-hidden">
				<a target="_self" href="/lessons/{nextLesson.slug}">
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
			</div>
		{/if}
	</div>
</main>
