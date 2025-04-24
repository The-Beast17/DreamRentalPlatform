import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
    const [showSignup, setShowSignup] = useState(true);
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4 pb-10">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 pt-24">Welcome to Dream Rental</h1>
            <p className="text-lg text-center mb-4 text-gray-600">Your one-stop solution for all your rental needs.</p>
            <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">{showSignup ? "Sign Up" : "Log In"}</h1>
            <div className="relative w-full max-w-4xl overflow-hidden h-[75vh] md:h-[45vh]">
                <div
                    className="absolute top-0 left-0 flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(${showSignup ? '0%' : '-50%'})`,
                        width: '200%',
                    }}
                >
                    <div className="w-1/2 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 p-4">
                        <button
                            onClick={() => navigate(`/Signup/tenant`)}
                            className="w-60 h-60 md:w-72 md:h-72 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-2xl hover:scale-105 transition duration-300 transform active:scale-95 flex flex-col items-center justify-center"
                        >
                            <span className="font-semibold text-white">Sign Up as</span>
                            <span className="text-4xl font-bold text-white">Tenant</span>
                        </button>
                        <button
                            onClick={() => navigate(`/Signup/landlord`)}
                            className="w-60 h-60 md:w-72 md:h-72 bg-green-600 rounded-lg shadow-lg hover:bg-green-700 hover:shadow-2xl hover:scale-105 transition duration-300 transform active:scale-95 flex flex-col items-center justify-center"
                        >
                            <span className="font-semibold text-white">Sign Up as</span>
                            <span className="text-4xl font-bold text-white">Landlord</span>
                        </button>
                    </div>
                    <div className="w-1/2 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 p-4">
                        <button
                            onClick={() => navigate(`/Login/tenant`)}
                            className="w-60 h-60 md:w-72 md:h-72 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-2xl hover:scale-105 transition duration-300 transform active:scale-95 flex flex-col items-center justify-center"
                        >
                            <span className="font-semibold text-white">Log In as</span>
                            <span className="text-4xl font-bold text-white">Tenant</span>
                        </button>
                        <button
                            onClick={() => navigate(`/Login/landlord`)}
                            className="w-60 h-60 md:w-72 md:h-72 bg-green-600 rounded-lg shadow-lg hover:bg-green-700 hover:shadow-2xl hover:scale-105 transition duration-300 transform active:scale-95 flex flex-col items-center justify-center"
                        >
                            <span className="font-semibold text-white">Log In as</span>
                            <span className="text-4xl font-bold text-white">Landlord</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 mt-8">
                <button
                    onClick={() => setShowSignup(true)}
                    className={`px-6 py-3 md:px-8 md:py-4 ${showSignup ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
                        } font-semibold rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition duration-300 transform active:scale-95`}
                >
                    Sign Up
                </button>
                <button
                    onClick={() => setShowSignup(false)}
                    className={`px-6 py-3 md:px-8 md:py-4 ${!showSignup ? 'bg-green-600 text-white' : 'bg-white text-green-600'
                        } font-semibold rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition duration-300 transform active:scale-95`}
                >
                    Log In
                </button>
            </div>
            <div className="flex items-baseline gap-3 mt-6">
                <span className="text-gray-700">Log in as</span>
                <button
                    onClick={() => navigate(`/AdminLogin/admin`)}
                    className="text-blue-600 font-semibold hover:underline"
                >
                    Admin
                </button>
            </div>
        </div>
    );
};

export default Authentication;
