'use server'

import { ApiRoutes } from "@/constants/constant";

interface ApiResponse {
    error: boolean, message: string, data: any
}
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
        if (!response.ok) {
            const error = await response.json()
            console.log("error", error);

            throw new Error(error.message || "Registration Failed");

        }
        const data = await response.json()
        // console.log(data);

        return {
            error: false, message: data.message, data: data.data
        }
    } catch (error) {
        const err = error as Error
        let message = err.message;

        if (err.name === 'AbortError') {
            message = 'Request timed out';
        }

        return {
            error: true,
            message,
            data: null,
        };
    }

}