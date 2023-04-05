<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { currentUser } from '$lib/stores/auth';
	import { showAlert } from '$lib/utils/alert';
	import { AxiosError } from 'axios';
	import { onMount } from 'svelte';
	import * as yup from 'yup';
	import { resetPassword } from './logic';
	import { page } from '$app/stores';

	let loading: boolean = false;
	let data: any = {
		password: '',
		passwordConfirm: ''
	};
	let errors: any = {};

	const passwordSchema = yup.object().shape({
		password: yup
			.string()
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
				`Password must be at least 8 characters long, contain at least one uppercase letter,
			one lowercase letter, and one number`
			)
			.required('Password is required'),
		passwordConfirm: yup
			.string()
			.required('Please confirm your password')
			.oneOf([yup.ref('password'), null], 'Passwords must match')
	});

	const token = $page.url.searchParams.get('token');

	const handleSubmit = async () => {
		loading = true;
		try {
			await passwordSchema.validate(data, { abortEarly: false });
			delete data.passwordConfirm;
			data['token'] = token;

			const reset = await resetPassword(data);
			showAlert({
				type: 'success',
				message: 'Password reset successfulL!!'
			});
			await goto('/auth/login');
			// errors = {};
		} catch (error: any) {
			if (error instanceof AxiosError) {
				showAlert({
					type: 'error',
					message: 'Token expired'
				});
			}
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
</script>

<svelte:head>
	<title>Reset password - Cooversa</title>
</svelte:head>
<section id="reset">
	<h1 class="title">Reset Password</h1>
	<form action="" class="form" on:submit|preventDefault={handleSubmit}>
		<div class="form-group">
			<label for="password" class="form-label">Password</label>
			<input
				type="password"
				bind:value={data.password}
				name="password"
				class="form-input"
				id="password"
			/>
			{#if errors.password}
				<p class="form-error">{errors.password}</p>
			{/if}
		</div>
		<div class="form-group">
			<label for="passwordConfirm" class="form-label">Confirm password</label>
			<input
				type="password"
				bind:value={data.passwordConfirm}
				name="passwordConfirm"
				class="form-input"
				id="passwordConfirm"
			/>
			{#if errors.passwordConfirm}
				<p class="form-error">{errors.passwordConfirm}</p>
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
				Submit
			{/if}
		</button>
	</form>
</section>

<style>
	#reset {
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
		#reset {
			padding: 30px 20px;
		}

		.title {
			font-size: 30px;
		}
	}
</style>
