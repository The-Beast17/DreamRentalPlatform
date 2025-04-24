import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Axios } from '../axios/Axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHome } from 'react-icons/fa';
import { FaBuilding } from 'react-icons/fa';

const Login = () => {
    const { setIsAuthenticated, setRole, setCurrentUser } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();

    const submitHandler = async (data) => {
        try {
            setIsLoading(true);
            const response = await Axios.post(`/user/login/${params.role}`, data);
            setCurrentUser(response.data.user);
            reset();
            setIsAuthenticated(true);
            setRole("user");
            localStorage.setItem("role", "user");
            localStorage.setItem("user", JSON.stringify(response.data.user));
            setIsLoading(false);
            navigate('/Properties');
        } catch (err) {
            setMessage(err.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="relative w-28 h-28">
                    {/* Background spinner */}
                    <div className="absolute top-0 left-0 w-full h-full rounded-full border-[6px] border-t-blue-500 border-r-transparent border-b-blue-300 border-l-transparent animate-spin"></div>

                    {/* Centered Icon */}
                    <div className="absolute inset-0 flex items-center justify-center text-green-500">
                        <FaHome className="w-12 h-12 drop-shadow-md" />
                    </div>

                    {/* Loading Text */}
                    <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 text-gray-800 font-medium text-base tracking-wide animate-pulse whitespace-nowrap">
                        Please wait...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={() => navigate('/')}
                >
                    <i className="ri-close-line text-2xl"></i>
                </button>
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login as {params.role}</h1>
                <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <div className="relative mt-1">
                            <i className="ri-mail-line absolute left-3 top-3 text-gray-400"></i>
                            <input
                                type="email"
                                placeholder="email@example.com"
                                {...register("email", {
                                    required: { value: true, message: "Please enter your email" },
                                })}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative mt-1">
                            <i className="ri-lock-line absolute left-3 top-3 text-gray-400"></i>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: { value: true, message: "Please enter the password" },
                                    minLength: { value: 6, message: "Minimum length is 6" },
                                })}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {message && <p className="text-red-500 text-sm text-center">{message}</p>}

                    <button
                        disabled={isLoading}
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </form>

                <hr className="my-6" />

                <div className="text-center">
                    <p className="text-sm text-gray-600">Don't have an account?</p>
                    <button
                        className="text-blue-500 hover:underline mt-2"
                        onClick={() => navigate(`/Signup/${params.role}`)}
                    >
                        Create Account
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Login;