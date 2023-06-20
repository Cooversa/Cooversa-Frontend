import client from '$lib/client';

interface resetBody {
	password: string;
	token: string;
}
export const resetPassword = async (data: resetBody) => {
	console.log(data);
	const request = await client.post('/users/password-reset/confirm', {
		password: data.password,
		token: data.token
	});

	return request;
};
