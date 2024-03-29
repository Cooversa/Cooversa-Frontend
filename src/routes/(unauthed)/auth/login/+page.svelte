<script lang="ts">
	import schema from './schema';
	import type { LoginValue } from './schema';
	import { login } from './logic';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { currentUser, initCurrentUser } from '$lib/stores/auth';

	let values: LoginValue = {
		email: '',
		password: ''
	};

	let errors: any = {};
	let loading = false;

	const submit = async () => {
		loading = true;
		try {
			await schema.validate(values, { abortEarly: false });
			const user = await login(values);

			if (user?.profile) {
				await goto('/dashboard');
			} else {
				await goto('/apply/step2');
			}
			errors = {};
		} catch (error: any) {
			errors = error.inner.reduce((acc: any, err: any) => {
				return {
					...acc,
					[err.path]: err.message
				};
			}, {});
		} finally {
			loading = false;
		}
	};

	onMount(async () => {
		await initCurrentUser();

		if (browser) {
			const user = $currentUser;
			if (user) {
				if (user.profile) {
					await goto('/dashboard');
				} else {
					await goto('/apply/step2');
				}
			}
		}
	});
</script>

<svelte:head>
	<title>Login - Cooversa</title>
</svelte:head>

<section id="apply">
	<h2 class="title">Login</h2>

	<form class="form" on:submit|preventDefault={submit}>
		<div class="form-group">
			<label for="email" class="form-label">Email</label>
			<input type="email" name="email" bind:value={values.email} id="email" class="form-input" />
			{#if errors.email}
				<p class="form-error">{errors.email}</p>
			{/if}
		</div>

		<div class="form-group">
			<label for="password" class="form-label">Password</label>
			<input
				type="password"
				name="password"
				bind:value={values.password}
				id="password"
				class="form-input"
			/>
			<a
				href="/auth/reset/reset-mail"
				class="text-xs md:w-2/4 w-full text-end mt-2 underline hover:decoration-primary"
				>forgot password?</a
			>
			{#if errors.password}
				<p class="form-error">{errors.password}</p>
			{/if}
		</div>

		<button type="submit" class="form-button">
			{#if loading}
				<!-- Loading spinner -->
				<svg
					class="animate-spin  h-5 w-5 text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						class="opacity-25
						"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					/>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
				</svg>
			{:else}
				Continue
			{/if}
		</button>
	</form>
</section>

<style>
	#apply {
		max-width: 1300px;
		margin: 0 auto;
		padding: 20px 60px;
	}

	.title {
		margin-bottom: 20px;
		font-size: 65px;
		font-family: Gilmer, sans-serif;
		font-weight: 700;
		letter-spacing: 0.04em;
		line-height: 150%;
	}

	@media (max-width: 1200px) {
		.title {
			font-size: 50px;
		}
	}

	@media (max-width: 768px) {
		#apply {
			padding: 30px 20px;
		}

		.title {
			font-size: 30px;
		}
	}
</style>
