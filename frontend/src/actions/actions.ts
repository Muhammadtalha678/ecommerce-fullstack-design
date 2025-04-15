'use server'

import { ApiRoutes } from "@/constants/constant";
import { ApiResponse } from "@/interfaces/Auth";
import { cookies } from 'next/headers'

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
            signal: controller.signal, // ✅ Needed for timeout to work
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



export const verifyEmailAction = async (state: ApiResponse | undefined, formData: FormData): Promise<ApiResponse> => {

    const verifyEmailData = {
        otp: formData.get('otp'),
        email: formData.get('email')
    }
    const otp = verifyEmailData.otp?.toString() ?? "";

    if (otp.length !== 6) {
        return {
            error: true,
            errors: { otp: "Please enter a valid 6-digit OTP." },
            data: null,
        };
    }
    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        const response = await fetch(ApiRoutes.verfiyEmail, {
            signal: controller.signal, // ✅ Needed for timeout to work
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(verifyEmailData)
        })
        clearTimeout(timeoutId)
        const data = await response.json()
        console.log(data);

        if (!response.ok) {
            return {
                error: true,
                errors: data.errors || {},
                data: null,
            };
        }

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

export const login = async (state: ApiResponse | undefined, formData: FormData): Promise<ApiResponse> => {
    const loginData = {
        email: formData.get('email'),
        password: formData.get('password'),
    }
    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        const response = await fetch(ApiRoutes.login, {
            signal: controller.signal, // ✅ Needed for timeout to work
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(loginData)
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


export const addProduct = async (
    state: ApiResponse | undefined,
    formData: FormData
): Promise<ApiResponse> => {
    const accessToken = (await cookies()).get('token')?.value;


    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        let response = await fetch(ApiRoutes.addProduct, {
            signal: controller.signal,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            method: 'POST',
            body: formData,
        });

        clearTimeout(timeoutId);
        // console.log('addProduct /api/products status:', response.status);

        if (response.status === 401) {
            const refreshRes = await fetch(ApiRoutes.refreshToken, {
                method: 'POST',
                credentials: 'include',
            });
            // console.log('addProduct /api/auth/refresh status:', refreshRes.status);

            if (!refreshRes.ok) {
                const errData = await refreshRes.json();
                console.log('Refresh error data:', errData);
                // Clear token to prevent AuthContext loop
                (await cookies()).delete('token');
                return {
                    error: true,
                    errors: errData.errors || { general: 'Session expired' },
                    data: null,
                };
            }

            const refreshData = await refreshRes.json();
            const newToken = refreshData.data?.accessToken;
            if (!newToken) {
                (await cookies()).delete('token');
                return {
                    error: true,
                    errors: { general: 'No access token in refresh response' },
                    data: null,
                };
            }

            (await cookies()).set('token', newToken, {
                expires: 15 / (24 * 60),
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });

            response = await fetch(ApiRoutes.addProduct, {
                signal: controller.signal,
                headers: {
                    Authorization: `Bearer ${newToken}`, // Use new token
                },
                method: 'POST',
                body: formData,
            });
            // console.log('addProduct retry /api/products status:', response.status);
        }

        const data = await response.json();
        // console.log('addProduct response data:', data);

        if (!response.ok) {
            return {
                error: true,
                errors: data.errors || { general: 'Failed to add product' },
                data: null,
            };
        }

        return {
            error: false,
            errors: {},
            data: data.data,
        };
    } catch (error) {
        const err = error as Error;
        const timeout = err.name === 'AbortError';

        return {
            error: true,
            errors: {
                general: timeout ? 'Request timed out' : err.message || 'An error occurred',
            },
            data: null,
        };
    }
};