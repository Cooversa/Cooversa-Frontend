import client from "$lib/utils/client";
import type {LoginValue} from "./schema";
import {makeAlert} from "$lib/shared/store/alert";
import {AxiosError} from "axios";
import {goto} from "$app/navigation";
import pocketbase from "$lib/pocketbase";


export const login = async (value: LoginValue) => {
    try {
        await pocketbase.collection('users').authWithPassword(value.email, value.password)
        await goto('/apply/step2')
    } catch (error) {

        if (error instanceof AxiosError) {
            makeAlert({
                title: "Error",
                content: error.response?.data.message || "Something went wrong, please try again later!",
                type: "error",
            })
            return;
        }
        makeAlert({
            title: "Error",
            content: "Something went wrong, please try again later!",
            type: "error",
        })
        throw error;
    }
}