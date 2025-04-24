import React, { useState } from 'react';
import { Axios } from '../axios/Axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
    const {setIsAuthenticated ,role, setRole, } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, seterrorMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userdata = { email, password };
            const response = await Axios.post('/admin/login', userdata,{
            withCredentials: true});
            const data = response.data;

            if (response.status === 200) { // Check for successful HTTP status
                setIsAuthenticated(true);
                console.log('Login successful');
                // If admin is authenticated
                setRole("admin");
                localStorage.setItem("role", "admin");
                localStorage.setItem("user", JSON.stringify(data.admin));
                // Redirect to admin dashboard or perform other actions
                navigate('/')
            } else {
                seterrorMessage(data.message);
            }
        } catch (error) {
            seterrorMessage(error.response.data.message);
        }
    };

    return (
        <div className="bg-gray-200 min-h-screen flex items-center justify-center">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your email address"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {errorMessage && (
                        <div className="mb-5 text-red-500 text-sm">
                            {errorMessage}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
