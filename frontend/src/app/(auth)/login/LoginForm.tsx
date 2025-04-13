'use client'
import AuthForm from '@/components/Auth/AuthForm'
import React, { ChangeEvent, useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/actions/actions'
import toast from 'react-hot-toast'
const LoginForm = () => {
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
            if (state.errors?.general) {
                toast.error(state.errors.general)
            } else {
                if (!state.error) {
                    toast.success(state.data?.message || "Login Successfull!")
                    const token = state.data?.token;
                    if (token) {
                        setIsRedirecting(true)
                        setTimeout(() => {
                            router.push(`/`);
                        }, 2000);
                    }

                }

            }

        }
    }, [state, router])
    return (
        <AuthForm isRegister={false} FormValues={formValues} onChange={onChange} action={loginAction} state={state} pending={pending || isRedirecting} isRedirecting={isRedirecting} />
    )
}

export default LoginForm
