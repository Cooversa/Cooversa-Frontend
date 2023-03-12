import type { LoginValue } from './schema';
import { loginUser } from '$lib/client';
import { AxiosError } from 'axios';
import { initCurrentUser } from '$lib/stores/auth';
import { showAlert } from '$lib/utils/alert';

export const login = async (value: LoginValue) => {
	try {
		const user = await loginUser(value);
		await initCurrentUser();
		return user;
	} catch (error) {
		if (error instanceof AxiosError) {
			showAlert({
				message: error.response?.data.message || 'Something went wrong, please try again later!',
				type: 'error'
			});
			return;
		}
		showAlert({
			message: 'Something went wrong, please try again later!',
			type: 'error'
		});
		throw error;
	}
};
