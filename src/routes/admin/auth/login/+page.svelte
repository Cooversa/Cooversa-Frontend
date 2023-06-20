<script lang="ts">
	import type { CreateUser } from '$lib/client/users/types';
	import * as yup from 'yup';
	import { loginAdmin } from './logic';

	let errors: any = {};
	let data: CreateUser = {
		email: '',
		password: ''
	};
	let loading = false;
	const adminLoginSchema = yup.object().shape({
		email: yup.string().required('Email is required'),
		// Password must be at least 8 characters long, contain at least one uppercase letter,
		// one lowercase letter, one number, and one special character
		password: yup.string().required('Password is required')
	});

	const handleSubmit = async () => {
		loading = true;

		try {
			await adminLoginSchema.validate(data, { abortEarly: false });
			const request = await loginAdmin(data);
		} catch (error: any) {
			errors = error.inner.reduce((acc: any, err: any) => {
				return {
					...acc,
					[err.path]: err.message
				};
			}, {});
			console.log(errors);
		}
	};
</script>

<svelte:head>
	<title>Admin Login - Cooversa</title>
</svelte:head>

<section id="admin-login">
	<form on:submit|preventDefault={handleSubmit}>
		<div class="form-header text-center mb-10">
			<!-- <h1 class=" font-medium">Login</h1> -->
			<p class="text-3xl">Welcome admin <span class="text-primary">:)</span></p>
		</div>

		<div class="form-group">
			<label for="email" class="form-label">Email</label>
			<input type="text" bind:value={data.email} id="email" class="form-input w-full" />
		</div>

		<div class="form-group">
			<label for="password" class="form-label">Password</label>
			<input type="password" bind:value={data.password} id="password" class="form-input w-full" />
		</div>

		<div class="form-group">
			<a
				href="/auth/reset/reset-mail"
				class="text-xs w-full text-right mb-2 underline hover:decoration-primary"
				>forgot password?</a
			>
			<button type="submit" class="form-button">Login</button>
		</div>
	</form>
</section>
