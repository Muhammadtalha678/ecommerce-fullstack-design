'use client'
import { createContext, useContext, useEffect, useState } from "react";
import Cookie from 'js-cookie'
import { fetchUser } from "@/lib/api/fetchUser";
import toast from "react-hot-toast";

interface User {
    fullname: string,
    email: string,
    role: string,
    accessToken: string
}
interface AuthContextType {
    user: User | null,
    isAuthenticated: boolean,
    loginUser: (token: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    useEffect(() => {
        const token = Cookie.get('token');
        if (token) {
            fetchUser(token)
                .then((userData) => {
                    setUser(userData!);
                })
                .catch((err) => {
                    toast.error(err?.message || "Session expired or invalid token");
                    Cookie.remove('token');
                });
        }
    }, []);
    const loginUser = async (token: string) => {
        try {
            Cookie.set('token', token, {
                expires: 15 / (24 * 60), // 15 minutes
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });

            const userData = await fetchUser(token);
            setUser(userData!);
            // toast.success("Login successful");
        } catch (err: any) {
            toast.error(err?.message || "Login failed. Please try again.");
        }
    };
    return <AuthContext.Provider value={{ user, isAuthenticated: !!user, loginUser }}>
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