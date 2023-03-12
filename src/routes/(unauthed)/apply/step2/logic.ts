import { goto } from '$app/navigation';
import axios, { AxiosError } from 'axios';
import client from '$lib/client';
import { initCurrentUser } from '$lib/stores/auth';
import { showAlert } from '$lib/utils/alert';
import type { CreateProfileType } from './schema';
import type { Profile } from '$lib/client/users/types';

export const sendWelcomeEmail = async (email: string, name: string) => {
	const url = `/api/email/welcome?email=${email}&name=${name}`;
	try {
		await axios.get(url);
	} catch (error) {
		console.log('error', error);
	}
};

export const completeRegistration = async (data: CreateProfileType) => {
	const { data: profile } = await client.post<Profile>('/users/profile', data);

	// Send welcome email
	await sendWelcomeEmail(profile.user?.email || 'Student', data.firstName);

	await initCurrentUser();

	// Redirect to success page
	await goto('/apply/success');
};
