<script lang="ts">
	import { completeRegistration } from './logic';
	import Selector from '$lib/shared/components/Selector.svelte';
	import countries from '$lib/utils/countries.js';
	import { currentUser } from '$lib/stores/auth';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import LoadingSvg from '$lib/shared/components/LoadingSvg.svelte';
	import schema from './schema';
	import { filteredObj } from '$lib/utils/removeEmptyString';
	import { z } from 'zod';
	import { AxiosError } from 'axios';
	import { showAlert } from '$lib/utils/alert';

	let values: any = {
		age: 18
	};

	let genders = [
		{
			label: 'Male',
			value: 'male'
		},
		{
			label: 'Female',
			value: 'female'
		},
		{
			label: 'Prefer not to say',
			value: 'prefer_not_to_say'
		},
		{
			label: 'Others',
			value: 'others'
		}
	];

	const selectGender = (e: CustomEvent) => {
		values.gender = e.detail;
	};

	const selectCountry = (e: CustomEvent) => {
		values.country = e.detail;
	};

	let errors: any = {};
	let loading = false;

	const submit = async () => {
		errors = {};
		loading = true;
		try {
			const result = await schema.parse(filteredObj(values));
			await completeRegistration(values);
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				errors = error.flatten().fieldErrors;
			} else if (error instanceof AxiosError) {
				let message = 'There was an issue creating your profile, please try again later';
				if (Array.isArray(error.response?.data.message)) {
					message = '';
					error.response?.data.message.forEach((errorMessage: string) => {
						message = message + errorMessage + '\n';
					});
				} else if (error.response?.data.message) {
					message = error.response?.data.message;
				}

				showAlert({
					type: 'error',
					message
				});
			} else {
				showAlert({
					type: 'error',
					message: 'There was an issue creating your profile, please try again later'
				});
			}
		} finally {
			loading = false;
		}
	};

	onMount(async () => {
		if (browser) {
			if (!$currentUser) {
				await goto('/apply');
			}
		}
	});
</script>

<svelte:head>
	<title>Cooversa - Complete your application</title>
</svelte:head>

<section id="apply">
	<h2 class="title">Continue your application</h2>
	<p class="caption">
		Thank you for your interest in applying to Cooversa. To continue your application process, <br
		/>
		please note that you will be charged <b>&#8358;8,000</b>
	</p>
	<form class="form" on:submit|preventDefault={submit}>
		<div class="form-group">
			<label class="form-label" for="first_name">First Name</label>
			<input
				class="form-input"
				type="text"
				name="first_name"
				id="first_name"
				bind:value={values.firstName}
			/>
			{#if errors.firstName}
				<p class="form-error">{errors.firstName}</p>
			{/if}
		</div>

		<div class="form-group">
			<label class="form-label" for="last_name">Last Name</label>
			<input
				class="form-input"
				type="text"
				name="last_name"
				id="last_name"
				bind:value={values.lastName}
			/>
			{#if errors.lastName}
				<p class="form-error">{errors.lastName}</p>
			{/if}
		</div>

		<div class="form-group">
			<label class="form-label" for="age">Age</label>
			<input class="form-input" type="number" name="age" id="age" bind:value={values.age} />
			{#if errors.age}
				<p class="form-error">{errors.age}</p>
			{/if}
		</div>

		<div class="form-group">
			<label for="phone_number" class="form-label">Phone number</label>
			<input
				class="form-input"
				type="tel"
				name="phone_number"
				id="phone_number"
				placeholder="e.g +234 812 345 6789"
				bind:value={values.phoneNumber}
			/>
			{#if errors.phoneNumber}
				<p class="form-error">{errors.phoneNumber}</p>
			{/if}
		</div>

		<div class="form-group">
			<p class="form-label">Gender</p>
			<Selector
				options={genders}
				name="Gender"
				placeholder="Select Gender"
				on:selected={selectGender}
			/>
			{#if errors.gender}
				<p class="form-error">{errors.gender}</p>
			{/if}
		</div>

		<div class="form-group">
			<label for="state" class="form-label">State</label>
			<input
				class="form-input"
				type="text"
				name="state"
				id="state"
				placeholder="e.g Lagos"
				bind:value={values.state}
			/>
			{#if errors.state}
				<p class="form-error">{errors.state}</p>
			{/if}
		</div>

		<div class="form-group">
			<p class="form-label">Country</p>
			<Selector
				options={countries}
				name="Country"
				placeholder="Select Country"
				on:selected={selectCountry}
			/>
			{#if errors.country}
				<p class="form-error">{errors.country}</p>
			{/if}
		</div>

		<!-- <div class="form-group">
			<label for="coupon" class="form-label">Discount Code</label>
			<div>
				<input
					class="form-input"
					type="text"
					name="coupon"
					id="coupon"
					placeholder="e.g COOVERSA20"
					bind:value={coupon}
				/>
				<button type="button" on:click={applyCoupon} class="form-input-button">
					{#if couponLoading}
						<LoadingSvg />
					{:else}
						Apply Coupon
					{/if}
				</button>
			</div>
			{#if couponMessage}
				<p class="form-helpertext text-green-600">{couponMessage}</p>
			{/if}
			{#if couponError}
				<p class="form-error">{couponError}</p>
			{/if}
		</div> -->

		<button type="submit" class="form-button">
			{#if loading}
				<!-- Loading spinner -->
				<LoadingSvg />
			{:else}
				Complete Registration
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

	.caption {
		font-size: 14px;
		color: #454545;
		line-height: 200%;
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

		.caption br {
			display: none;
		}
	}
</style>
