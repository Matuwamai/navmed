import React from 'react';
// import Bgimage from "../assets/download (3).jpeg"

const Login = () => {
    return (
        <div className="h-screen grid grid-cols-2">
            {/* Left Side (Background Image) */}

            <div className="loginpage h-screen relative flex items-center justify-center text-white">
                {/* Overlay */}
                <div className="absolute inset-0 bg-blue-600 opacity-50"></div>

                {/* Centered Content */}
                <div className="relative z-10 text-center">
                    <span className="flex items-center justify-center flex-col text-white text-center">
                        <h1 className="text-2xl font-bold">Navmed</h1>
                        <h2 className="text-lg">Medical equipment e-commerce</h2>
                    </span>
                </div>
            </div>


            {/* Right Side (Login Form) */}
            <div className="flex flex-col items-center justify-center bg-blue-100">
                <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
                    Welcome to Navmed Admin Dashboard
                </h1>
                <div className="w-full max-w-md p-6 shadow-lg rounded-lg">


                    <form className="space-y-4">
                        <h2 className="text-xl font-semibold text-blue-600">Login</h2>

                        {/* Email Input */}
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
