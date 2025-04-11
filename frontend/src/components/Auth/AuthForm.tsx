'use client'
import { ApiResponse } from '@/interfaces/Auth'
import Link from 'next/link'
import { ChangeEvent } from 'react'
interface FormValues {
    name: string
    email: string
    password: string
    confirmPassword?: string
}
const AuthForm = (
    {
        isRegister = false,
        action,
        state,
        pending,
        FormValues,
        onChange
    }: {
        isRegister: boolean,
        action: (formData: FormData) => void,
        state?: ApiResponse;
        pending?: boolean | undefined;
        FormValues?: FormValues,
        onChange: (e: ChangeEvent<HTMLInputElement>) => void
    }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                {/* Logo */}
                <div className="flex items-center justify-center mb-6">
                    <div className="flex items-center">
                        <div className="flex space-x-1 mr-2">
                            <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                            <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Form Title */}
                <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
                    {isRegister ? 'REGISTER' : 'LOGIN'}
                </h2>

                {/* Form */}
                <form action={action} className="space-y-4">
                    {
                        <p className='text-red-500 text-sm mt-6 text-center'>
                            {state?.error && state.errors.general && state.errors.general}
                        </p>
                    }
                    {
                        <p className='text-green-500 text-sm mt-6 text-center'>
                            {!state?.error && state?.data && state.data.message}
                        </p>
                    }
                    {isRegister && (
                        <div>
                            <input
                                type="text"
                                placeholder="Full name"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name='name'
                                value={FormValues?.name}
                                onChange={onChange}

                            />
                            <p className=" text-red-500 text-sm mt-6">
                                {
                                    state?.error && state.errors.fullname && state.errors.fullname
                                }
                            </p>
                        </div>
                    )}
                    <div>
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name='email'
                            value={FormValues?.email}
                            onChange={onChange}
                        />
                        <p className=" text-red-500 text-sm mt-6">
                            {
                                state?.error && state.errors.email && state.errors.email
                            }
                        </p>
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name='password'
                            value={FormValues?.password}
                            onChange={onChange}

                        />
                        <p className=" text-red-500 text-sm mt-6">
                            {
                                state?.error && state.errors.password && state.errors.password
                            }
                        </p>
                    </div>

                    {isRegister && (
                        <div>
                            <input
                                type="password"
                                placeholder="Re-enter Password"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name='confirmPassword'
                                value={FormValues?.confirmPassword}
                                onChange={onChange}

                            />
                            <p className=" text-red-500 text-sm mt-6">
                                {
                                    state?.error && state.errors.confirmPassword && state.errors.confirmPassword
                                }
                            </p>
                        </div>
                    )}

                    {/* Link to switch between Login/Register */}
                    <div className="text-right">
                        <Link
                            href={isRegister ? '/login' : '/register'}
                            className="text-sm text-blue-500 hover:underline"
                        >
                            {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-500 transition-colors cursor-pointer"
                        disabled={pending}
                    >
                        {isRegister ? pending ? "Processing" : 'SIGN UP' : 'LOGIN'}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-gray-500 text-sm mt-6">
                    © 2017-2025
                </p>
            </div>
        </div>
    )
}

export default AuthForm
