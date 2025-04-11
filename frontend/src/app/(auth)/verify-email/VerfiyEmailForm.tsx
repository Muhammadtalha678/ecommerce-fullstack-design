'use client'
import { verifyEmailAction } from '@/actions/actions'
import VerifyEmail from '@/components/Auth/VerifyEmail'
import React, { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
const VerfiyEmailForm = () => {
    const router = useRouter()
    const [state, verifyAction, pending] = useActionState(verifyEmailAction, undefined)
    useEffect(() => {
        if (state) {
            if (state.errors?.general) {
                toast.error(state.errors.general)
            } else {
                if (!state.error) {
                    toast.success(state.data?.message || "Registration Successfull!")
                    const email = state.data?.email;
                    if (email) {
                        setTimeout(() => {
                            // router.push(`/verify-email?email=${encodeURIComponent(email)}`);
                        }, 2000);
                    }

                }

            }

        }
    }, [state, router])
    return (
        <VerifyEmail action={verifyAction} state={state} pending={pending} />
    )
}

export default VerfiyEmailForm
