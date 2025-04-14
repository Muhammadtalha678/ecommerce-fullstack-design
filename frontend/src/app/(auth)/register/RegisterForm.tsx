'use client'
import { register } from '@/actions/actions'
import AuthForm from '@/components/Auth/AuthForm'
import React, { ChangeEvent, useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
const RegisterForm = () => {
    const router = useRouter()
    const [state, registerAction, pending] = useActionState(register, undefined)
    const [formValues, setFormValues] = useState({
        name: '', email: '', password: "", confirmPassword: ''
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
                    toast.success(state.data?.message || "Registration Successfull!")
                    const email = state.data?.email;
                    const otpExpiresAt = state.data?.otpExpiresAt;
                    if (email && otpExpiresAt) {
                        localStorage.setItem("verifyEmail", JSON.stringify({
                            email: email,
                            expiry: new Date(otpExpiresAt).getTime()
                        }));
                        setIsRedirecting(true)
                        setTimeout(() => {
                            router.push(`/verify-email`);
                        }, 2000);
                    }

                }

            }

        }
    }, [state, router])
    return (
        <AuthForm action={registerAction} isRegister={true} pending={pending || isRedirecting} state={state} onChange={onChange} FormValues={formValues} isRedirecting={isRedirecting} />
    )
}

export default RegisterForm
