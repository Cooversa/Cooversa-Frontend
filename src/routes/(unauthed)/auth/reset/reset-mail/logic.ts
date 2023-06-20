import client from '$lib/client';

export const sendResetPasswordMail = async (email: string) => {
	const request = await client.get('/users/password-reset/send', {
		params: {
			email
		}
	});
	return request.data;
};
