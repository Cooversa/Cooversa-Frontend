import client from "$lib/utils/client";
import type { CreateUserType } from "./schema";
import {AxiosError} from "axios";
import {makeAlert} from "$lib/shared/store/alert";

export const createUser = async (user: CreateUserType) => {
    try {
        const response = await client.post("/users", user);
        return response.data;
        makeAlert({
            title: 'Success',
            content: 'Registration successful',
            type: 'success',
        })
    } catch (error) {
        if (error instanceof AxiosError) {
            makeAlert({
                title: "Error",
                content: error.response?.data.message || "Something went wrong, please try again later!",
                type: "error",
            })
        }
        makeAlert({
            title: "Error",
            content: "Something went wrong, please try again later!",
            type: "error",
        })
        throw error;
    }
}