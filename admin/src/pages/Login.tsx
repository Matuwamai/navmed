import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
            alert('Login successful');
            console.log(response.data);
            navigate('/products'); 
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex flex-col md:grid md:grid-cols-2">
            {/* Left Side - Branding */}
            <div className="hidden md:flex h-full items-center justify-center text-white relative loginpage h-screen relative">
                <div className="absolute inset-0 bg-blue-600 opacity-50"></div>
                <div className="relative z-10 text-center">
                    <h1 className="text-3xl font-bold">Navmed</h1>
                    <h2 className="text-lg">Medical Equipment E-Commerce</h2>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex flex-col items-center justify-center bg-blue-100 px-6 py-12 w-full">
                <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
                    Welcome to Navmed Admin Dashboard
                </h1>
                <div className="w-full max-w-md p-6 shadow-lg rounded-lg bg-white">
                    <form className="space-y-4" onSubmit={handleLogin}>
                        <h2 className="text-xl font-semibold text-blue-600">Login</h2>
                        {error && <p className="text-red-500">{error}</p>}
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-400"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-400"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
