import { goto } from '$app/navigation';
import { loginUser } from '$lib/client';
import { initCurrentUser } from '$lib/stores/auth';
import { showAlert } from '$lib/utils/alert';
import { AxiosError } from 'axios';

interface loginBody {
	email: string;
	password: string;
}

export const loginAdmin = async (userInfo: loginBody) => {
	try {
		const request = await loginUser(userInfo);
		if (request.role === 'ADMIN') {
			await initCurrentUser();
			showAlert({
				type: 'success',
				message: 'Wow!!, Login successfull lucky you, LOL'
			});
			await goto('/admin');
		} else {
			showAlert({
				type: 'error',
				message: "Wyd blud??!, You shouldn't be here LOL"
			});
			await goto('/dashboard');
		}
	} catch (error: any) {
		if (error instanceof AxiosError) {
			showAlert({
				type: 'error',
				message: error.response?.data.message
			});
			throw error;
		}
	}
};
