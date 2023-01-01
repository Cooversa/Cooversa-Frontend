
import type {LoginValue} from "./schema";
import {makeAlert} from "$lib/shared/store/alert";
import {goto} from "$app/navigation";
import pocketbase from "$lib/pocketbase";
import {ClientResponseError} from "pocketbase";

export const login = async (value: LoginValue) => {
    try {
        await pocketbase.collection('users').authWithPassword(value.email, value.password)
    } catch (error) {

        if (error instanceof ClientResponseError && error.status === 400) {
            makeAlert({
                title: "Login failed",
                content: "Invalid email or password",
                type: "error",
            })
            return;
        }
        makeAlert({
            title: "Login failed",
            content: "Something went wrong, please try again later!",
            type: "error",
        })
        throw error;
    }
}