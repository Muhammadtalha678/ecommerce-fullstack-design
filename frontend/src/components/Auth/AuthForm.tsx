'use client'
import Link from 'next/link'
const AuthForm = ({ isRegister = false, action }: { isRegister: boolean, action: (formData: FormData) => void }) => {
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
                        <h1 className="text-2xl font-bold text-gray-800">Logipsum</h1>
                    </div>
                </div>

                {/* Form Title */}
                <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
                    {isRegister ? 'REGISTER' : 'LOGIN'}
                </h2>

                {/* Form */}
                <form action={action} className="space-y-4">
                    {isRegister && (
                        <div>
                            <input
                                type="text"
                                placeholder="Full name"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    )}
                    <div>
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {isRegister && (
                        <div>
                            <input
                                type="password"
                                placeholder="Re-enter Password"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
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
                        className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        {isRegister ? 'SIGN UP' : 'LOGIN'}
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
