import type { CreateProfileType } from "./schema";
import {makeAlert} from "$lib/shared/store/alert";
import pocketbase from "$lib/pocketbase";
import {ClientResponseError} from "pocketbase";

export const completeRegistration = async (profile: CreateProfileType) => {
    try {
        const response = await pocketbase.collection('profile').create(profile);
        console.log(response)

        // Update the user profile
        await pocketbase.collection('users').update(
            profile.user,
            {is_active: true, profile: response.id}
        );
        makeAlert({
            title: 'Success',
            content: 'Registration successful',
            type: 'success',
        })
    } catch (error) {
        if (error instanceof ClientResponseError) {
            Object.keys(error.data.data).forEach((key) => {
                makeAlert({
                    title: 'Error',
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    content: error.data.data[key].message,
                    type: 'error',
                })
            })
            console.log(error.data.data)
            return
        }
        makeAlert({
            title: "Signup Error",
            content:  "Something went wrong, please try again later!",
            type: "error",
        })
        console.log('err', error)
    }
}