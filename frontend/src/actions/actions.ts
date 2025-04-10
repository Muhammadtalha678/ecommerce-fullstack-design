'use server'

import { ApiRoutes } from "@/constants/constant";
import { ApiResponse } from "@/interfaces/Auth";


export const register = async (state: ApiResponse | undefined, formData: FormData): Promise<ApiResponse> => {
    const registerData = {
        fullname: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    }
    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        const response = await fetch(ApiRoutes.register, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(registerData)
        })
        clearTimeout(timeoutId)
        const data = await response.json()
        if (!response.ok) {
            return {
                error: true,
                errors: data.errors || {},
                data: null,
            };
        }
        // console.log(data);

        return {
            error: false, errors: {}, data: data.data
        }
    } catch (error) {
        const err = error as Error
        const timeout = err.name === "AbortError";

        return {
            error: true,
            errors: {
                general: timeout ? "Request timed out" : err.message || "An error occurred",
            },
            data: null,
        };
    }

}