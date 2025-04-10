'use client'
import { register } from '@/actions/actions'
import AuthForm from '@/components/Auth/AuthForm'
import React, { ChangeEvent, useActionState, useState } from 'react'

const RegisterForm = () => {
    const [state, registerAction, pending] = useActionState(register, undefined)
    const [formValues, setFormValues] = useState({
        name: '', email: '', password: "", confirmPassword: ''
    })
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value })
    }
    return (
        <AuthForm action={registerAction} isRegister={true} pending={pending} state={state} onChange={onChange} FormValues={formValues} />
    )
}

export default RegisterForm
