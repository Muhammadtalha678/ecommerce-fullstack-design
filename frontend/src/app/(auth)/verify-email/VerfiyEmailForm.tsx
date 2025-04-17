'use client'

import { verifyEmailAction } from '@/actions/actions'
import VerifyEmail from '@/components/Auth/VerifyEmail'
import React, { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const VerfiyEmailForm = () => {
    const router = useRouter()
    const [state, verifyAction, pending] = useActionState(verifyEmailAction, undefined)
    const [isRedirecting, setIsRedirecting] = useState(false)
    useEffect(() => {
        if (state) {
            // console.log("Verification Response:", state)

            if (state.errors?.general) {
                toast.error(state.errors.general)
            } else if (!state.error) {
                toast.success(state.data?.message as string || "Verification Successful!")
                setIsRedirecting(true)
                setTimeout(() => {
                    router.push('/login')
                }, 2000)
            }
        }
    }, [state, router])

    return <VerifyEmail action={verifyAction} state={state} pending={pending || isRedirecting} isRedirecting={isRedirecting} />
}

export default VerfiyEmailForm
