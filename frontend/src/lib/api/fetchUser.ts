import { ApiRoutes } from '@/constants/constant'
import Cookie from 'js-cookie'
export const fetchUser = async (accessToken: string) => {
    // console.log(accessToken);

    try {
        let response = await fetch(ApiRoutes.user, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            credentials: "include",
        })
        console.log(response.status);

        if (response.status === 401) {
            const refreshRes = await fetch(ApiRoutes.refreshToken, {
                method: "POST",
                credentials: "include",
            })
            if (!refreshRes.ok) {
                const errData = await refreshRes.json()
                throw new Error(errData.errors?.general || "Session expired");
            }
            const refreshData = await refreshRes.json();
            const newToken = refreshData.data?.accessToken
            if (!newToken) {
                throw new Error('No access token in refresh response');
            }
            Cookie.set("token", newToken, {
                expires: 15 / (24 * 60),
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
            // Retry user info call
            response = await fetch(ApiRoutes.user, {
                headers: {
                    Authorization: `Bearer ${newToken}`,
                    'Content-Type': 'application/json',
                },
                credentials: "include",
            });
        }
        const data = await response.json();
        console.log("data=>>>>>>>>>", data);

        if (!response.ok) {
            throw new Error(data.errors?.general || "Something went wrong");
        }
        if (!data.data) {
            throw new Error('No user data in response');
        }
        return data.data;
    } catch (error) {
        console.log("error=>>>>>>>>>", error);
        const err = error as Error
        throw new Error(err.message || "Unexpected error");
    }

}