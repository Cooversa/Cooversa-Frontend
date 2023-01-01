import axios, {AxiosError} from "axios";
import {PRIVATE_PAYSTACK_SECRET_KEY} from '$env/static/private';
import type {Transaction} from "./types";

export const verifyPayment = async (reference: string) => {
    try {
        const url = `https://api.paystack.co/transaction/verify/${reference}`;
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${PRIVATE_PAYSTACK_SECRET_KEY}`
            }
        })

        const data: Transaction = res.data;
        if (!data.status) {
            throw new Error('Payment was not successful')
        }
    } catch (e) {
        if (e instanceof AxiosError) {
            console.log(e);
            throw new Error('Payment Error')
        }
        throw e;
    }

}