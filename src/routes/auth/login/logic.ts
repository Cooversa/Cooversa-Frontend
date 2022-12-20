import client from "$lib/utils/client";
import type {LoginValue} from "./schema";
import {makeAlert} from "$lib/shared/store/alert";
import {AxiosError} from "axios";


export const login = async (value: LoginValue) => {
    try {
        const response = await client.post("/auth/login", value, {withCredentials: true});
        const {data} = await client.get("/auth/me", {withCredentials: true});
        console.log(data);

        makeAlert({
            title: 'Success',
            content: 'Registration successful',
            type: 'success',
        })
        return response.data;
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