import type { CreateUserType } from "./schema";
import {createUser as register, loginUser} from "$lib/client";
import {AxiosError} from "axios";
import {makeAlert} from "$lib/shared/store/alert";
import {goto} from "$app/navigation";
import {initCurrentUser} from "$lib/stores/auth";

export const createUser = async (data: CreateUserType) => {
    try {
        await register(data);
        await loginUser(data);
        // Reload the current user
        await initCurrentUser();
        await goto("/apply/step2");
    } catch (error) {
        if (error instanceof AxiosError) {
            makeAlert({
                type: "error",
                title: "Sign Up Failed",
                content: error.response?.data.message || "An error occurred",
            });
            return;
        }

        makeAlert({
            type: "error",
            title: "Sign Up Failed",
            content: "An error occurred",
        });
    }
}