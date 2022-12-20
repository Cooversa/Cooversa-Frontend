import client from "$lib/utils/client";
import {makeAlert} from "$lib/shared/store/alert";
import {AxiosError} from "axios";

const requestEmailVerification = async (email: string) => {
    try {
        await client.get('/users/verification/send', {
            params: {
                email,
            }
        })

        makeAlert({
            title: 'Email Sent',
            content: 'Please check your email for a verification link.',
            type: 'success'
        })
    } catch  (error) {
        if (error instanceof AxiosError) {
            makeAlert({
                title: 'Error',
                content: error.response?.data.message || 'Something went wrong, Please try again later.',
                type: 'error'
            })
            return
        }
        makeAlert({
            title: 'Error',
            content: 'Something went wrong, Please try again later.',
            type: 'error'
        })
        console.log(error);
    }
}

export default requestEmailVerification;