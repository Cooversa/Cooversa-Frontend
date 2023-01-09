<script lang="ts">
	import '../../styles/app.css';
	import AppNavbar from '$lib/shared/components/AppNavbar.svelte';
	import Sidebar from '$lib/shared/components/Sidebar.svelte';
	import { currentUser, initCurrentUser } from '$lib/stores/auth';
	import { onDestroy, onMount } from 'svelte';

	import alerts, { makeAlert } from '$lib/shared/store/alert';
	import AlertsList from '$lib/shared/components/AlertsList.svelte';
	import Alert from '$lib/shared/components/Alert.svelte';
	import type { Alert as AlertType } from '$lib/shared/store/alert.ts';
	import loading from '$lib/shared/store/loading';
	import {navigating, page} from '$app/stores';
	import Loading from '$lib/shared/components/Loading.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import {requestVerificationEmail} from "$lib/client";
	import {AxiosError} from "axios";
	import LoadingSvg from "$lib/shared/components/LoadingSvg.svelte";

	let isSidebarOpen = true;

	$: loading.set(!!$navigating);

	const setSidebarState = (e) => {
		isSidebarOpen = e.detail.state;
	};

	let alertsList: AlertType[] = [];

	let unsub = alerts.subscribe((data) => {
		alertsList = data;
	});

	onDestroy(() => {
		unsub();
	});

	const checkIfEnrolled = () => {
		if ($currentUser && !$currentUser.schools.length && $currentUser.role === 'STUDENT') {
			goto('/school');
			makeAlert({
				type: 'warning',
				title: 'School not set',
				content: 'Please enroll to a school to continue'
			});
		}
	};

	let verificationLoading = false;

	const sendVerificationMail = async () => {
		verificationLoading = true;
		try {
			if ($currentUser) {
				await requestVerificationEmail($currentUser.email)
				makeAlert({
					type: 'success',
					title: 'Sent successfully',
					content: 'Check your email for the email verification link!'
				})
			}
		} catch (e) {
			if (e instanceof AxiosError) {
				makeAlert({
					type: 'error',
					title: 'Error',
					content: e.response?.message || 'Something went wrong!'
				})
				return
			}
			makeAlert({
				type: 'error',
				title: 'Error',
				content: 'Something went wrong!'
			})
		} finally {
			verificationLoading = false;
		}

	}



	$: if (
		$navigating &&
		$navigating.to?.url.pathname !== '/auth/login' &&
		$navigating.to?.url.pathname !== '/apply' &&
		$navigating.to?.url.pathname !== '/' &&
		$navigating.to?.url.pathname !== '/admin' &&
		$page.url.pathname !== '/users/verification/confirm'
	) {
		checkIfEnrolled();
	}

	onMount(async () => {

		await initCurrentUser();

		if (browser) {
			if ($page.url.pathname !== '/users/verification/confirm')  checkIfEnrolled();


			if (!$currentUser) {
				goto('/auth/login');
			}

			if ($currentUser && $currentUser.role !== 'STUDENT') {
				await goto('/admin');
			} else if ($currentUser && !$currentUser.isEmailVerified && $page.url.pathname !== '/users/verification/confirm') {
				await sendVerificationMail()
			}

		}
	});
</script>

{#if $currentUser && $currentUser.isEmailVerified === false && $page.url.pathname !== '/users/verification/confirm'}
	<div class="h-screen flex flex-col justify-center items-center px-10">
		<div class="bg-white space-y-5 max-w-4xl mx-auto">
			<h1 class="text-2xl font-semibold">One more step</h1>
			<p>In order to use the Cooversa dashboard, you must verify your email address. Please check your inbox for a verification email and follow the instructions to complete this process.</p>
			<p>Thank you for choosing Cooversa for your learning journey. We look forward to supporting you in your studies.</p>
			<button on:click={sendVerificationMail} class="button">
				{#if verificationLoading}
					<LoadingSvg/>
				{:else }
					Get a new verification mail
				{/if }
			</button>
		</div>
	</div>
{:else if $page.url.pathname === '/users/verification/confirm'}
	<slot/>
{:else }
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
				{#if alertsList.length}
					<AlertsList>
						{#each alertsList as alert}
							<Alert
								id={alert.id}
								type={alert.type}
								duration={alert.duration}
								content={alert.content}
								title={alert.title}
							/>
						{/each}
					</AlertsList>
				{/if}

				<slot />
			</div>
		</div>
	</div>
{/if}
