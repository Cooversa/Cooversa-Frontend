<script lang="ts">
	import { makeAlert } from '$lib/shared/store/alert';
	import type { Module } from '$lib/client/schools/types';
	import client from '$lib/client';

	export let data: any;

	const course = data.course;
	const modules = data.modules;

	let activeModuleId = '';
	let activeModule: Module | null = null;
	let activeModuleLessons: Module[] = [];
	let activeModuleLoading = false;

	const changeActiveModule = async (moduleId: string, module: Module) => {
		activeModuleLoading = true;
		if (activeModuleId === moduleId) {
			activeModuleId = '';
			activeModule = null;
			activeModuleLessons = [];
		} else {
			activeModuleId = moduleId;
			activeModule = module;
			const response = await client.get(`/modules/${module.slug}/lessons`);
			activeModuleLessons = response.data;
		}
		activeModuleLoading = false;
	};

	const showAvailabilityAlert = () => {
		if (!getAvailability(activeModule?.availableOn)) {
			makeAlert({
				type: 'info',
				title: 'Info',
				content: `Module will be available at <span class="font-bold">${new Date(
					activeModule?.availableOn || ''
				).toDateString()}</span>`
			});
			return;
		}
	};

	const getAvailability = (dateString: any) => {
		const date = new Date(dateString);
		if (date.toLocaleDateString() === 'Invalid Date') return true;
		const now = new Date();
		return date <= now;
	};
</script>

<svelte:head>
	<title>{course.name}</title>
</svelte:head>

<div>
	<h1 class="md:text-3xl text-2xl font-semibold ">{course.name}</h1>
	<div class="image-wrapper md:my-10 my-5 max-w-full rounded overflow-hidden mx-auto">
		<img class="image" src={course.featuredImage} alt={course.name} />
	</div>
	<article class="md:prose prose-sm max-w-none" style="max-width: none;">
		{@html course.description}
	</article>
	<!-- Modules -->
	<div class="mt-10">
		<h2 class="text-2xl font-semibold">Lessons</h2>

		<!-- Accordion -->
		<div class="accordion mt-5">
			{#each modules as module}
				<div class="accordion-items" class:active={activeModuleId === module.moduleId}>
					<div
						class="accordion-header cursor-pointer"
						on:click={() => changeActiveModule(module.moduleId, module)}
						on:keydown={() => console.log('Key Down')}
					>
						<h3 class="accordion-title">{module.name}</h3>
						{#if getAvailability(module.available_at)}
							<button class="accordion-button" aria-label="Expand Accordion" aria-expanded="false">
								{#if activeModuleId === module.id}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="feather feather-chevron-up"><polyline points="18 15 12 9 6 15" /></svg
									>
								{:else}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9" /></svg
									>
								{/if}
							</button>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="w-6 h-6"
							>
								<path
									fill-rule="evenodd"
									d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
									clip-rule="evenodd"
								/>
							</svg>
						{/if}
					</div>
					<div class="accordion-body" class:active={activeModuleId === module.moduleId}>
						{#if activeModuleLoading}
							<div class="w-full flex justify-center items-center">
								<svg
									class="animate-spin  h-5 w-5 text-primary"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										class="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										stroke-width="4"
									/>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
								</svg>
							</div>
						{:else if !activeModuleLessons.length}
							<p class="text-center">There are currently no lessons for this module</p>
						{:else}
							<ul class="accordion-item space-y-5">
								{#each activeModuleLessons as lesson}
									{#if !getAvailability(activeModule?.availableOn)}
										<li>
											<button on:click|preventDefault={showAvailabilityAlert} class="cursor-pointer"
												>{lesson.name}</button
											>
										</li>
									{:else}
										<li><a href="/lessons/{lesson.slug}">{lesson.name}</a></li>
									{/if}
								{/each}
							</ul>
						{/if}
					</div>
				</div>
			{:else}
				<div class="flex justify-center">
					<h3 class="font-medium">No modules for this course yet</h3>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.image-wrapper {
		position: relative;
		padding-bottom: 56.25%;
		height: 0;
	}

	.image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.accordion {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.accordion-items {
		background-color: #fff;
		border-radius: 5px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		padding: 20px;
	}

	.accordion-items.active .accordion-title {
		padding: 20px;
	}

	.accordion-item li {
		border-radius: 5px;
		padding: 10px;
		color: #454545;
		font-size: 16px;
		font-weight: 500;
		line-height: 1.5;
		transition: all 0.3s ease;
		background: #f5f5f5;
	}

	.accordion-item li:hover {
		color: #5c57ff;
	}

	.accordion-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
	}

	.accordion-title {
		font-size: 18px;
		font-weight: 700;
	}

	.accordion-button {
		background-color: transparent;
		border: none;
		cursor: pointer;
		outline: none;
	}

	.accordion-body {
		max-height: 0;
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.accordion-body.active {
		max-height: 1000px;
		padding: 20px;
	}
</style>
