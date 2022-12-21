import type { CreateProfileType } from './schema';
import { makeAlert } from '$lib/shared/store/alert';
import pocketbase from '$lib/pocketbase';
import { ClientResponseError } from 'pocketbase';
import { goto } from '$app/navigation';
import axios, { AxiosError } from 'axios';

export const verifyPayment = async (reference: string) => {
	try {
        const url = '/api/payment/verify';
        await axios.get(url, {
            params: {
                reference
            }
        })
	} catch (error) {
		if (error instanceof AxiosError && error.status === 400) {
			makeAlert({
				title: 'Payment Error',
				content:
					"We couldn't verified that your payment was successful. Please try again later or contact our support.",
				type: 'error'
			});
			throw new Error('Payment Error');
		}
		makeAlert({
			title: 'Payment Error',
			content: 'Something went wrong, please try again later!',
			type: 'error'
		});
		throw new Error('Payment Error');
	}
};
export const completeRegistration = async (profile: CreateProfileType) => {
	try {
		const response = await pocketbase.collection('profile').create(profile);
		console.log(response);

		// Update the user profile
		await pocketbase
			.collection('users')
			.update(profile.user, { is_active: true, profile: response.id });
		await goto('/apply/success');
	} catch (error) {
		if (error instanceof ClientResponseError) {
			console.log(error.data);
			Object.keys(error.data.data).forEach((key) => {
				makeAlert({
					title: 'Error',
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					content: error.data.data[key].message,
					type: 'error'
				});
			});
			console.log(error.data.data);
			return;
		}
		makeAlert({
			title: 'Signup Error',
			content: 'Something went wrong, please try again later!',
			type: 'error'
		});
		console.log('err', error);
	}
};
