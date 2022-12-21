import axios, {AxiosError} from "axios";
import {PRIVATE_PAYSTACK_SECRET_KEY, PRIVATE_POCKETBASE_ADMIN_EMAIL, PRIVATE_POCKETBASE_ADMIN_PASSWORD} from '$env/static/private';
import {PUBLIC_POCKETBASE_URL} from "$env/static/public";
import type {Transaction} from "./types";
import PocketBase from "pocketbase";

export const verifyPayment = async (reference: string) => {
    try {
        const url = `https://api.paystack.co/transaction/verify/${reference}`;
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${PRIVATE_PAYSTACK_SECRET_KEY}`
            }
        })

        const data: Transaction = res.data;

        const pbAdmin = new PocketBase(PUBLIC_POCKETBASE_URL)
        await pbAdmin.admins.authWithPassword(PRIVATE_POCKETBASE_ADMIN_EMAIL, PRIVATE_POCKETBASE_ADMIN_PASSWORD)
        const user = await pbAdmin.collection('users').getFirstListItem(`email="${data.data.customer.email}"`)
        if (!user) {
            throw new Error('Invalid email')
        }
        if (data.status && user) {
            await pbAdmin.collection('profile').update(user.profile, {
                paid: true
            })
        }

    } catch (e) {
        if (e instanceof AxiosError) {
            console.log(e);
        }
        console.log(e)
        throw e;
    }

}