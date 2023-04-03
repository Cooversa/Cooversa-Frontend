<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { currentUser } from '$lib/stores/auth';
	import { showAlert } from '$lib/utils/alert';
	import { AxiosError } from 'axios';
	import { onMount } from 'svelte';
	import * as yup from 'yup';
	import { sendResetPasswordMail } from './logic';

	let loading: boolean = false;
	let data = {
		email: ''
	};
	let errors: any = {};

	const emailSchema = yup.object().shape({
		email: yup.string().required('Email is required')
	});
	const handleSubmit = async () => {
		loading = true;

		try {
			await emailSchema.validate(data, { abortEarly: false });
			const sendResetMail = await sendResetPasswordMail(data.email);
			showAlert({
				type: 'success',
				message: sendResetMail.message
			});
			await goto('/auth/reset/reset-mail/success');
			errors = {};
		} catch (error: any) {
			if (error instanceof AxiosError) {
				showAlert({
					type: 'error',
					message: 'Ooops something went wrong'
				});
			}
			errors = error.inner.reduce((acc: any, err: any) => {
				return {
					...acc,
					[err.path]: err.message
				};
			}, {});
			console.log(errors);
		} finally {
			loading = false;
		}
	};

	onMount(() => {
		if (browser) {
			console.log($currentUser);
		}
	});
</script>

<svelte:head>
	<title>Forgot password - Reset Your Password</title>
</svelte:head>
<section id="reset">
	<h1 class="title">Reset Password</h1>
	<form action="" class="form" on:submit|preventDefault={handleSubmit}>
		<div class="form-group">
			<label for="email" class="form-label">Email</label>
			<input type="email" bind:value={data.email} name="email" class="form-input" id="email" />
			{#if errors.email}
				<p class="form-error">{errors.email}</p>
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
