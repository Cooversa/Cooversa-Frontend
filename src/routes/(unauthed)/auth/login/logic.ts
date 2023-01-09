
import type {LoginValue} from "./schema";
import {makeAlert} from "$lib/shared/store/alert";
import {loginUser} from "$lib/client";
import {AxiosError} from "axios";
import {initCurrentUser} from "$lib/stores/auth";

export const login = async (value: LoginValue) => {
    try {
        const user = await loginUser(value);
        await initCurrentUser();
        return user;
    } catch (error) {

        if (error instanceof AxiosError) {
            makeAlert({
                title: "Login failed",
                content: error.response?.data.message || "Something went wrong, please try again later!",
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