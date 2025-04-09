// 'use client'
import { handleRegister } from '@/actions/actions'
import AuthForm from '@/components/Auth/AuthForm'
import React from 'react'

const Register = () => {
    return (
        <AuthForm isRegister={true} action={handleRegister} />
    )
}

export default Register
