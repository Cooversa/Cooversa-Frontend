import client from "$lib/utils/client";

export const confirmEmail = async (token: string) => {
    try {
        const response = await client.get('/users/verification/confirm', {
            params: {
                token
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}