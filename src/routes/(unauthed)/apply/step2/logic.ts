import type { CreateProfileType } from './schema';
import { makeAlert } from '$lib/shared/store/alert';
import pocketbase from '$lib/pocketbase';
import { ClientResponseError } from 'pocketbase';
import { goto } from '$app/navigation';
import axios, { AxiosError } from 'axios';
import {createProfile} from "$lib/client";
import type {CreateProfile} from "$lib/client/users/types";


export const generateTransactionRef = () => {
	let text = '';
	const possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < 10; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}


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

export const verifyCoupon = async (coupon: string) => {
	let error = null;
	let discount = null;
	try {
		const response = await pocketbase
			.collection('coupon')
			.getFirstListItem(`code="${coupon}"`);
		if (!response.is_active) {
			error = 'This coupon is no longer active';
		} else if (response.usage >= response.max_usage) {
			error = 'This coupon has been used up';
		}
		else {
			discount = response.amount;
		}
	} catch (err) {
		error = 'Invalid coupon';
		console.log('err', err);
	}

	return {error, discount};
};

const incrementCouponUsage = async (code: string) => {
	const url = `/api/payment/increase-coupon-usage?coupon=${code}`;
	try {
		await axios.get(url);
	} catch (error) {
		console.log('error', error);
	}
}

export const sendWelcomeEmail = async (email: string, name: string) => {
	const url = `/api/email/welcome?email=${email}&name=${name}`;
	try {
		await axios.get(url);
	} catch (error) {
		console.log('error', error);
	}
}

export const completeRegistration = async (data: CreateProfile, email: string, coupon = '') => {
	try {
		if (coupon.length > 0) {
			await incrementCouponUsage(coupon);
		}
		const profile = await createProfile(data);
		console.log('profile', profile);

		// Send welcome email
		await sendWelcomeEmail(email, data.firstName);

		// Redirect to success page
		// await goto('/apply/success');
	} catch (error) {
		if (error instanceof AxiosError) {
			makeAlert({
				type: 'error',
				title: 'Signup Error',
				content: error.response?.data.message || 'Something went wrong',
			})
			return;
		}
		makeAlert({
			title: 'Signup Error',
			content: 'Something went wrong, please try again later!',
			type: 'error'
		});
	}
};

