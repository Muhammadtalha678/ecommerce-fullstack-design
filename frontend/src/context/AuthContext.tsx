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
    loginUser: (token: string) => void,
    loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        const token = Cookie.get('token');
        if (token) {
            setLoading(true)
            fetchUser(token)
                .then((userData) => {
                    if (userData) {
                        setUser(userData);
                    }
                    else {
                        // console.warn('No user data returned');
                        Cookie.remove('token');
                    }
                })
                .catch((err) => {
                    console.error('useEffect fetchUser error:', err.message);
                    toast.error(err?.message || 'Session expired or invalid token');
                    Cookie.remove('token');
                    setUser(null);
                }).finally(() => {
                    setLoading(false)
                }
                );
        }
        else {
            setLoading(false)
        }
    }, []);
    const loginUser = async (token: string) => {
        console.log("token==>>>>>>", token);
        setLoading(true)
        try {
            Cookie.set('token', token, {
                expires: 15 / (24 * 60), // 15 minutes
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });

            const userData = await fetchUser(token);
            console.log("userData==>>>>>>", userData);
            if (!userData) {
                throw new Error('No user data returned');
            }
            setUser(userData);
            toast.success("Login successful");
        } catch (error) {
            const err = error as Error
            toast.error(err?.message || 'Login failed. Please try again.');
            Cookie.remove('token');
            setUser(null);
        } finally { setLoading(false) }
    };
    return <AuthContext.Provider value={{ user, isAuthenticated: !!user, loginUser, loading }}>
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