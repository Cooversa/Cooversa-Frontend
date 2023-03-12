import type { CreateUserType } from './schema';
import { createUser as register, loginUser } from '$lib/client';
import { goto } from '$app/navigation';
import { initCurrentUser } from '$lib/stores/auth';
import { showAlert } from '$lib/utils/alert';

export const createUser = async (data: CreateUserType) => {
	try {
		await register(data);
		await loginUser(data);
		// Reload the current user
		await initCurrentUser();
		await goto('/apply/step2');
	} catch (error: any) {
		showAlert({
			type: 'error',
			message: error.response?.data.message || 'An error occurred'
		});
		return;
	}
};
