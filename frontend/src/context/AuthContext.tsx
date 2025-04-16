'use client'
import { createContext, useContext, useEffect, useState } from "react";
import Cookie from 'js-cookie'
import { fetchUser } from "@/lib/api/fetchUser";
import toast from "react-hot-toast";
import { ApiRoutes } from "@/constants/constant";

interface User {
    fullname: string,
    email: string,
    role: string,
    accessToken?: string
}
interface AuthContextType {
    user: User | null,
    isAuthenticated: boolean,
    loginUser: (user: User) => void,
    loading: boolean
    sessionExpired: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [sessionExpired, setSessionExpired] = useState<boolean>(false);
    useEffect(() => {

        const token = Cookie.get('token');
        console.log("Auth context useEffect run when page refresh by f5", user, token);
        if (token && !user) {
            getUserInfo(token)
        } else {
            setLoading(false)
        }
    }, []);
    const getUserInfo = async (token: string) => {
        try {
            const resp = await fetch(ApiRoutes.user, {
                headers: { Authorization: `Bearer ` + token, 'Content-type': "application/json" },
            })
            const data = await resp.json()
            if (!resp.ok) {
                if (resp.status === 401) {
                    setSessionExpired(true);
                    Cookie.remove('token');
                    throw new Error('Session expired');
                }
                throw new Error(data.errors?.general || 'Failed to fetch user data');
            }
            if (!data.data) {
                throw new Error('No user data returned');
            }
            // Cookie.set('token', data.accessToken);
            setUser(data.data)
        } catch (error) {
            const err = error as Error;
            toast.error(err.message || 'Failed to load user data');
            Cookie.remove('token');
            setUser(null);
        } finally {
            setLoading(false);
        }

    }
    const loginUser = (user: User) => {
        setLoading(true);
        try {
            if (!user.accessToken) {
                throw new Error('No access token provided');
            }

            Cookie.set('token', user.accessToken, {
                expires: 1, // 1 day
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });

            setUser(user);
            setSessionExpired(false);
        } catch (error) {
            const err = error as Error;
            toast.error(err.message || 'Login failed');
            Cookie.remove('token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };
    return <AuthContext.Provider value={{ user, isAuthenticated: !!user, loginUser, loading, sessionExpired }}>
        {children}
    </AuthContext.Provider>
}

const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}

export { AuthProvider, useAuth }