import { ApiRoutes } from '@/constants/constant'
import Cookie from 'js-cookie'
export const fetchUser = async (accessToken: string) => {
    try {
        let response = await fetch(ApiRoutes.user, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
        })
        if (response.status === 401) {
            const refreshRes = await fetch(ApiRoutes.refreshToken, {
                method: "POST",
                credentials: "include",
            })
            if (!refreshRes.ok) {
                const errData = await refreshRes.json()
                throw new Error(errData.errors.message || "Session expired");
            }
            const { accessToken: newToken } = await refreshRes.json();
            Cookie.set("token", newToken, {
                expires: 15 / (24 * 60),
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
            // Retry user info call
            response = await fetch(ApiRoutes.user, {
                headers: {
                    Authorization: `Bearer ${newToken}`,
                },
                credentials: "include",
            });
        }
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong");
        }
        return data.data;
    } catch (error) {
        const err = error as Error
        throw new Error(err.message || "Unexpected error");
    }

}