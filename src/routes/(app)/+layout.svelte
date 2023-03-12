<script lang="ts">
	import '../../styles/app.css';
	import AppNavbar from '$lib/shared/components/AppNavbar.svelte';
	import Sidebar from '$lib/shared/components/Sidebar.svelte';
	import { currentUser, initCurrentUser } from '$lib/stores/auth';
	import { onMount } from 'svelte';

	import loading from '$lib/shared/store/loading';
	import { navigating, page } from '$app/stores';
	import Loading from '$lib/shared/components/Loading.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { requestVerificationEmail } from '$lib/client';
	import { AxiosError } from 'axios';
	import LoadingSvg from '$lib/shared/components/LoadingSvg.svelte';
	import { showAlert } from '$lib/utils/alert';

	let isSidebarOpen = true;

	$: loading.set(!!$navigating);

	const setSidebarState = (e: any) => {
		isSidebarOpen = e.detail.state;
	};

	const checkIfEnrolled = () => {
		if ($currentUser && !$currentUser.schools.length && $currentUser.role === 'STUDENT') {
			goto('/school');

			showAlert({
				message: 'Please enroll to a school to continue',
				type: 'warning'
			});
		}
	};

	let verificationLoading = false;

	const sendVerificationMail = async () => {
		verificationLoading = true;
		try {
			if ($currentUser) {
				await requestVerificationEmail($currentUser.email);
				showAlert({
					message:
						'Verification mail sent successfully, check your email for the verification link!',
					type: 'success'
				});
			}
		} catch (e) {
			if (e instanceof AxiosError) {
				showAlert({
					type: 'error',
					message:
						e.response?.data.message || 'Ooops something went wrong, please try again later...'
				});
				return;
			}
			showAlert({
				type: 'error',
				message: 'Ooops something went wrong, please try again later...'
			});
		} finally {
			verificationLoading = false;
		}
	};

	$: if (
		$navigating &&
		$navigating.to?.url.pathname !== '/auth/login' &&
		$navigating.to?.url.pathname !== '/apply' &&
		$navigating.to?.url.pathname !== '/' &&
		$navigating.to?.url.pathname !== '/admin' &&
		$navigating.to?.url.pathname !== '/users/pay' &&
		$navigating.to?.url.pathname !== '/users/verification/confirm' &&
		$page.url.pathname !== '/users/verification/confirm' &&
		$page.url.pathname !== '/users/pay'
	) {
		checkIfEnrolled();
	}

	const checkPaymentStatus = () => {
		if ($currentUser && $currentUser.status === 'PENDING_PAYMENT') {
			showAlert({
				type: 'info',
				message: 'You need to pay your application fee to access the Cooversa LMS'
			});
			goto('/users/pay');
		}
	};

	$: if ($navigating && $navigating.to?.url.pathname !== '/users/pay') {
		checkPaymentStatus();
	}

	onMount(async () => {
		await initCurrentUser();

		// if (browser) {
		// 	if ($page.url.pathname !== '/users/verification/confirm') checkIfEnrolled();

		// 	if (!$currentUser) {
		// 		goto('/auth/login');
		// 	}

		// 	if ($currentUser && $currentUser.role !== 'STUDENT') {
		// 		await goto('/admin');
		// 	} else if (
		// 		$currentUser &&
		// 		!$currentUser.isEmailVerified &&
		// 		$page.url.pathname !== '/users/verification/confirm'
		// 	) {
		// 		await sendVerificationMail();
		// 	} else if ($currentUser && $currentUser.status === 'PENDING_PAYMENT') {
		// 		console.log('Not paid');
		// 		await goto('/users/pay');
		// 	}
		// }

		if (browser) {
			if (!$currentUser) {
				await goto('/auth/login');
			} else if ($currentUser && $currentUser.role !== 'STUDENT') {
				showAlert({
					type: 'info',
					message: "You're not a student"
				});
				goto('/admin');
			} else if ($currentUser && $currentUser.status === 'PENDING_PAYMENT') {
				showAlert({
					type: 'info',
					message: 'You need to pay your application fee to access the Cooversa LMS'
				});
				goto('/users/pay');
			} else if ($currentUser && !$currentUser.schools.length && $currentUser.role === 'STUDENT') {
				goto('/school');

				showAlert({
					message: 'Please enroll to a school to continue',
					type: 'warning'
				});
			}
		}
	});
</script>

{#if $currentUser && $currentUser.isEmailVerified === false && $page.url.pathname !== '/users/verification/confirm'}
	<div class="h-screen flex flex-col justify-center items-center px-10">
		<div class="bg-white space-y-5 max-w-4xl mx-auto">
			<h1 class="text-2xl font-semibold">One more step</h1>
			<p>
				In order to use the Cooversa dashboard, you must verify your email address. Please check
				your inbox for a verification email and follow the instructions to complete this process.
			</p>
			<p>
				Thank you for choosing Cooversa for your learning journey. We look forward to supporting you
				in your studies.
			</p>
			<button on:click={sendVerificationMail} class="button">
				{#if verificationLoading}
					<LoadingSvg />
				{:else}
					Get a new verification mail
				{/if}
			</button>
		</div>
	</div>
{:else if $page.url.pathname === '/users/verification/confirm'}
	<slot />
{:else}
	<div class="relative min-h-screen md:flex">
		<Sidebar on:navState={setSidebarState} />
		<div
			class=" my-16 md:my-0 p w-full {isSidebarOpen ? 'md:ml-72' : 'md:ml-16'} ml-0 transition-all"
		>
			<AppNavbar />
			<div class="p-7">
				{#if $loading}
					<Loading />
				{/if}

				<slot />
			</div>
		</div>
	</div>
{/if}
