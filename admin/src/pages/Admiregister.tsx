import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        role: 'admin',
        contact: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:5000/api/users/register', formData);
            setSuccess(response.data.message || 'User registered successfully!');
            setTimeout(() => navigate('/login'), 2000); // Redirect to login after success
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register user. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">Admin Registration</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}
                <form className="space-y-4" onSubmit={handleRegister}>
                    <div>
                        <label className="block text-gray-700">Full Name</label>
                        <input type="text" name="fullName" className="w-full p-2 border border-gray-300 rounded" value={formData.fullName} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input type="email" name="email" className="w-full p-2 border border-gray-300 rounded" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="block text-gray-700">Password</label>
                        <input type="password" name="password" className="w-full p-2 border border-gray-300 rounded" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="block text-gray-700">Contact</label>
                        <input type="text" name="contact" className="w-full p-2 border border-gray-300 rounded" value={formData.contact} onChange={handleChange} />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
