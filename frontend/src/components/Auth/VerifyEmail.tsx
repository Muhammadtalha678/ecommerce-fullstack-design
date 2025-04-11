'use client'

import React from 'react'

const VerifyEmail = () => {
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
                <form className="space-y-4">
                    <p className='text-red-500 text-sm text-center'>
                        {/* {error} */}
                    </p>
                    <p className='text-green-500 text-sm text-center'>
                        {/* {success} */}
                    </p>

                    <div>
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            //   value={email}
                            //   onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            maxLength={6}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest font-mono"
                            //   value={otp}
                            //   onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-500 transition-colors"
                    //   disabled={pending}
                    >
                        Verify
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Didn't receive code? <span className="text-blue-500 cursor-pointer hover:underline">Resend</span>
                </p>


            </div>
        </div>
    )
}

export default VerifyEmail
