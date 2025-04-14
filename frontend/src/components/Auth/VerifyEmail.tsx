'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ApiResponse } from '@/interfaces/Auth'
import Countdown from 'react-countdown'
import toast from 'react-hot-toast'
import { ApiRoutes } from '@/constants/constant'

const VerifyEmail = ({
    action,
    state,
    pending,
    isRedirecting
}: {
    action: (formData: FormData) => void,
    state?: ApiResponse,
    pending?: boolean,
    isRedirecting: boolean
}) => {
    const router = useRouter()

    const [email, setEmail] = useState<string>('')
    const [resendAvailableAt, setResendAvailableAt] = useState<number>(Date.now() + 5 * 60 * 1000)
    const [timerKey, setTimerKey] = useState<number>(Date.now())
    const [otp, setOtp] = useState<string>('')
    const [isVerified, setIsVerified] = useState<boolean>(false)
    const [resendPending, setResendPending] = useState<boolean>(false)
    useEffect(() => {
        const storedData = localStorage.getItem("verifyEmail")
        if (storedData) {
            try {
                const { email, expiry } = JSON.parse(storedData)
                if (email && expiry) {
                    setEmail(email)
                    const safeExpiry = Math.min(expiry, Date.now() + 5 * 60 * 1000)
                    setResendAvailableAt(safeExpiry)
                    setTimerKey(safeExpiry)
                } else {
                    throw new Error("Invalid stored data")
                }
            } catch {
                router.back()
            }
        } else {
            router.back()
        }
    }, [router])

    useEffect(() => {
        if (state?.error === false) {
            setIsVerified(true)
            localStorage.removeItem("verifyEmail")
        }
    }, [state])

    const handleResend = async () => {
        setResendPending(true);
        try {
            const res = await fetch(ApiRoutes.resendEmail, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
                credentials: 'include', // Remove if endpoint doesn't need auth
            });

            console.log('Response status:', res.status);
            console.log('Response headers:', res.headers.get('content-type'));

            if (!res.ok) {
                const contentType = res.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await res.json();
                    console.log('Error data:', data);
                    toast.error(data.errors?.email || data.errors?.general || `Server error: ${res.status}`);
                } else {
                    toast.error(`Server error: ${res.status}`);
                }
                return;
            }

            const contentType = res.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                console.error('Non-JSON response received');
                toast.error('Invalid response from server');
                return;
            }

            const data = await res.json();
            console.log('Response data:', data);

            toast.success(data.data?.message || "OTP resent successfully");
            const newTime = Date.now() + 5 * 60 * 1000;
            setResendAvailableAt(newTime);
            setTimerKey(newTime);
            localStorage.setItem("verifyEmail", JSON.stringify({ email, expiry: newTime }));
        } catch (error) {
            const err = error as Error
            toast.error(err.message || "Something went wrong.")
        } finally {
            setResendPending(false)
        }
    }

    return isRedirecting ? (
        <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
                <svg className="animate-spin h-10 w-10 text-black" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                </svg>
                <p className="text-black font-semibold">Redirecting to login...</p>
            </div>
        </div>
    ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex items-center justify-center mb-6">
                    <div className="flex space-x-1 mr-2">
                        <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                        <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                    </div>
                </div>

                <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
                    Verify Your Email
                </h2>

                <form action={action} className="space-y-4">
                    <input type="hidden" name="email" value={email} />
                    <div>
                        <p className="w-full p-3 border border-gray-300 rounded-lg">{email}</p>
                        <p className="text-red-500 text-sm mt-6">{state?.error && state.errors.email}</p>
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            maxLength={6}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest font-mono"
                            value={otp}
                            name="otp"
                            onChange={(e) => {
                                const value = e.target.value
                                if (/^[0-9]{0,6}$/.test(value)) {
                                    setOtp(value)
                                }
                            }}
                            required
                        />
                        <p className="text-red-500 text-sm mt-6">{state?.error && state.errors.otp}</p>
                    </div>

                    <button
                        type="submit"
                        className={`w-full text-white p-3 rounded-lg transition-colors ${pending ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-700 cursor-pointer"}`}
                        disabled={pending}
                    >
                        {pending ? "Processing..." : "Verify"}
                    </button>
                </form>

                {/* Resend Section */}
                {!isVerified && (
                    <div className="text-center text-sm mt-6">
                        {Date.now() < resendAvailableAt ? (
                            <Countdown
                                key={timerKey}
                                date={resendAvailableAt}
                                renderer={({ minutes, seconds, completed }) =>
                                    completed ? (
                                        <span className="text-blue-500 cursor-pointer hover:underline" onClick={handleResend}>
                                            Resend
                                        </span>
                                    ) : (
                                        <span className="text-gray-500">
                                            Resend available in {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                                        </span>
                                    )
                                }
                            />
                        ) : (
                            <button
                                onClick={handleResend}
                                disabled={resendPending}
                                className={`text-blue-500 ${resendPending ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer hover:underline'}`}
                            >
                                {resendPending ? 'Sending...' : 'Resend'}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default VerifyEmail
