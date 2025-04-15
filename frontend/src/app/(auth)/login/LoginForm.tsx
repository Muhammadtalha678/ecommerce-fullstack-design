'use client'
import AuthForm from '@/components/Auth/AuthForm'
import React, { ChangeEvent, useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/actions/actions'
import toast from 'react-hot-toast'
// import Cookies from 'js-cookie'
import { useAuth } from '@/context/AuthContext'
const LoginForm = () => {
    const { loginUser, loading } = useAuth()
    const router = useRouter()
    const [state, loginAction, pending] = useActionState(login, undefined)
    const [formValues, setFormValues] = useState({
        email: '', password: ""
    })
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value })
    }
    const [isRedirecting, setIsRedirecting] = useState(false)
    useEffect(() => {
        if (state) {
            if (state.error) {
                if (!state.errors?.isVerified && !state.errors?.email && state.errors?.otpExpiresAt) {
                    const expiryTime = state.errors?.otpExpiresAt
                    if (expiryTime) {
                        localStorage.setItem("verifyEmail", JSON.stringify({
                            email: formValues.email,
                            expiry: new Date(expiryTime).getTime()
                        }));
                        setIsRedirecting(true);
                        setTimeout(() => {
                            router.push(`/verify-email`);
                        }, 2000);
                    }
                }
                if (state.errors?.general) {
                    toast.error(state.errors.general)
                }
            }
            else {
                if (!state.error && state.data?.accessToken) {
                    // Cookies.set('token', state.data?.accessToken)
                    setIsRedirecting(true)
                    loginUser(state.data?.accessToken)
                }

            }

        }
    }, [state, formValues.email])

    useEffect(() => {
        if (!loading && isRedirecting) {
            // toast.success("User Login Successfully")
            router.push(`/`);
        }
    }, [loading, isRedirecting, router])
    return (
        <AuthForm isRegister={false} FormValues={formValues} onChange={onChange} action={loginAction} state={state} pending={pending || isRedirecting} isRedirecting={isRedirecting} />
    )
}

export default LoginForm
