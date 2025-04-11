'use client'
import { verifyEmailAction } from '@/actions/actions'
import VerifyEmail from '@/components/Auth/VerifyEmail'
import React, { useActionState } from 'react'

const VerfiyEmailForm = () => {
    const [state, verifyAction, pending] = useActionState(verifyEmailAction, undefined)
    return (
        <VerifyEmail action={verifyAction} state={state} pending={pending} />
    )
}

export default VerfiyEmailForm
