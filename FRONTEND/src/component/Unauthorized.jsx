// src/pages/Unauthorized.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();
  const location = useLocation();
const [error, setError] = React.useState(location.state?.message || "Unauthorized");

return (
    <div className="min-h-screen flex items-center justify-center bg-red-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-gray-700 mb-4">You are not authorized to view this page.</p>
            <p className="text-red-500 italic mb-6">{error}</p>
            <button
                onClick={() => navigate('/')}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded"
            >
                Go Back Home
            </button>
        </div>
    </div>
);
};

export default Unauthorized;
