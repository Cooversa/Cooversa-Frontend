import client from '$lib/client';
import { showAlert } from '$lib/utils/alert';
import { AxiosError } from 'axios';

export const getAllCourses = async (search?: string) => {
	try {
		const courses = await client.get('/courses', {
			params: {
				'filter.name': `contains:${search || ''}`,
				'filter.description': `contains:${search || ''}`,
				'filter.excerpt': `contains:${search || ''}`
			}
		});
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
