import type { CreateUserType } from "./schema";
import {makeAlert} from "$lib/shared/store/alert";
import pocketbase from "$lib/pocketbase";
import {ClientResponseError} from "pocketbase";
import {goto} from "$app/navigation";

export const createUser = async (user: CreateUserType) => {
    try {
        await pocketbase.collection('users').create(user);
        await pocketbase.collection('users').authWithPassword(user.email, user.password);
        await goto('/apply/step2');
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