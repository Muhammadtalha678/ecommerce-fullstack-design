'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ApiResponse } from '@/interfaces/Auth'
const VerifyEmail = ({ action, state, pending }: {

    action: (formData: FormData) => void,
    state?: ApiResponse,
    pending?: boolean
}) => {
    console.log("pending", pending);
    const searchParams = useSearchParams()
    const router = useRouter()

    const email = searchParams.get('email') || ""

    const [formValues, setFormValues] = useState({
        email: email, otp: ''
    })
    useEffect(() => {
        if (!email) {
            router.back();
        }
    }, [email, router]);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                {/* Logo / Header */}
                <div className="flex items-center justify-center mb-6">
                    <div className="flex space-x-1 mr-2">
                        <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                        <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                    </div>
                </div>

                <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
                    Verify Your Email
                </h2>

                {/* Form */}
                <form action={action} className="space-y-4">

                    <div>
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formValues.email}
                            onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                            name='email'
                            required
                        />
                        <p className=" text-red-500 text-sm mt-6">
                            {
                                state?.error && state.errors.email && state.errors.email
                            }
                        </p>
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            maxLength={6}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest font-mono"
                            value={formValues.otp}
                            name='otp'
                            onChange={(e) => setFormValues({ ...formValues, otp: e.target.value })}
                            required
                        />
                        <p className=" text-red-500 text-sm mt-6">
                            {
                                state?.error && state.errors.otp && state.errors.otp
                            }
                        </p>
                    </div>

                    <button
                        type="submit"
                        className={`w-full text-white p-3 rounded-lg transition-colors 
        ${pending
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-black hover:bg-gray-700 cursor-pointer"
                            }`}
                        disabled={pending}
                    >
                        {pending ? "Processing..." : "Verify"}
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Didn&rsquo;t receive code? <span className="text-blue-500 cursor-pointer hover:underline">Resend</span>
                </p>


            </div>
        </div>
    )
}

export default VerifyEmail
