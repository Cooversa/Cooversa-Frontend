import client from '$lib/client';
import { showAlert } from '$lib/utils/alert';
import { AxiosError } from 'axios';

export const getAllCourses = async () => {
	try {
		const courses = await client.get(
			'/courses?skip=0&take=10&page=1&limit=10&filterMode=insensitive'
		);
		return courses.data.items;
	} catch (error) {
		if (error instanceof AxiosError) {
			showAlert({
				type: 'error',
				message: "Couldn't fetch all courses"
			});
			throw error;
		}
	}
};
