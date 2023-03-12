<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_PAYSTACK_PUBLIC_KEY } from '$env/static/public';
	import client from '$lib/client';
	import LoadingSvg from '$lib/shared/components/LoadingSvg.svelte';
	import { currentUser, initCurrentUser } from '$lib/stores/auth';
	import { showAlert } from '$lib/utils/alert';
	import { AxiosError } from 'axios';
	import { onMount } from 'svelte';
	import { generateTransactionRef } from './logic';

	let amount = 8000;
	let loading = false;

	const pay = async () => {
		if (amount === 0) {
			await markPaid();
			return;
		}
		loading = true;

		let paystack = PaystackPop.setup({
			key: PUBLIC_PAYSTACK_PUBLIC_KEY,
			email: $currentUser?.email,
			amount: amount * 100,
			currency: 'NGN',
			ref: generateTransactionRef(),
			embed: false,
			disabled: false,
			callback: (response: any) => {
				markPaid(response);
			},
			onClose: () => {
				showAlert({
					message: 'Payment cancelled',
					type: 'error'
				});
			}
		});
		paystack.openIframe();

		loading = false;
	};

	const markPaid = async (data?: any) => {
		loading = true;
		try {
			const response = await client.get(`/users/profile/markPaid/${data?.reference}`);

			await initCurrentUser();
			showAlert({
				type: 'success',
				message: 'Your payment was successful'
			});

			goto('/dashboard');
		} catch (e) {
			if (e instanceof AxiosError) {
				showAlert({
					type: 'error',
					message:
						e.response?.data?.message || 'Ooops something went wrong, please try again later...'
				});
			}

			showAlert({
				type: 'error',
				message: 'Ooops something went wrong, please try again later...'
			});
		} finally {
			loading = false;
		}
	};

	onMount(async () => {
		if ($currentUser?.status !== 'PAYMENT_PENDING') {
			goto('/dashboard');
		}
	});
</script>

<svelte:head>
	<title>Pay - Cooversa</title>
</svelte:head>

<div class="fixed top-0 left-0 z-[50] w-screen h-screen">
	<div class="bg-black w-screen absolute h-screen opacity-30" />
	<div class="flex h-screen w-screen relative justify-center items-center">
		<div class="bg-white p-5 rounded">
			<button
				on:click={pay}
				disabled={loading}
				class="bg-primary font-semibold flex items-center gap-3 text-white p-5 rounded"
			>
				Pay with PayStack
				{#if loading}
					<LoadingSvg />
				{/if}
			</button>
		</div>
	</div>
</div>
