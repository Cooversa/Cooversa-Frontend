<script lang="ts">
	import { currentUser, initCurrentUser } from '$lib/stores/auth';
	import { onMount } from 'svelte';

	onMount(async () => {
		await initCurrentUser();
	});
</script>

<div
	class="shadow z-[20] bg-white flex items-center md:relative fixed top-0 w-screen md:w-full main justify-between md:justify-end p-5 md:px-10"
>
	<div class="md:hidden">
		<a href="/dashboard">
			<img src="/transparent-icon.svg" width="100px" alt="" />
		</a>
	</div>
	<div class="hidden md:flex">
		{#if $currentUser}
			<h2 class="font-medium md:font-semibold md:text-lg">
				Hello <span class="text-primary">{$currentUser.profile.firstName}</span>!
			</h2>
		{:else}
			<h2 class="font-medium md:font-semibold md:text-lg">
				Hello <span class="text-primary">Student</span>!
			</h2>
		{/if}
	</div>
	<!--        <div class="flex items-center space-x-5">-->
	<!--            <a href="/notifications" class="relative">-->
	<!--                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">-->
	<!--                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />-->
	<!--                </svg>-->
	<!--                <div class="h-3 w-3 bg-red-500 absolute rounded-full -top-1 right-0"></div>-->
	<!--            </a>-->
	<!--            <a class=" rounded-full" href="/profile">-->
	<!--                <div class="profile-img-container">-->
	<!--                    <img src="/about-us.png" class="profile-image" alt="">-->
	<!--                </div>-->
	<!--            </a>-->
	<!--        </div>-->
</div>

<style>
	.profile-img-container {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		overflow: hidden;
	}

	.profile-image {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
</style>
