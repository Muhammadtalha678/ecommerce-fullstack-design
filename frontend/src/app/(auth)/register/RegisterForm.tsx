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
    useEffect(() => {
        if (state) {
            if (state.errors?.general) {
                toast.error(state.errors.general)
            } else {
                toast.success(state.data?.message || "Registration Successfull!")
                const email = state.data?.email;
                if (email) {
                    setTimeout(() => {
                        router.push(`/verify-email?email=${encodeURIComponent(email)}`);
                    }, 2000);
                }

            }

        }
    }, [state, router])
    return (
        <AuthForm action={registerAction} isRegister={true} pending={pending} state={state} onChange={onChange} FormValues={formValues} />
    )
}

export default RegisterForm
