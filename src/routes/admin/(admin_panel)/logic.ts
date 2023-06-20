import client from '$lib/client';
import { showAlert } from '$lib/utils/alert';
import { AxiosError } from 'axios';

 const getUsers = async () => {
	try {
		const users = await client.get('/users?skip=0&take=10&page=1&limit=10&filterMode=insensitive');

		return users.data.items;
	} catch (error) {
		if (error instanceof AxiosError) {
			showAlert({
				type: 'error',
				message: "Ooops something went wrong... Couldn't fetch users"
			});
			console.log(error);
			throw error;
		}
	}
};
