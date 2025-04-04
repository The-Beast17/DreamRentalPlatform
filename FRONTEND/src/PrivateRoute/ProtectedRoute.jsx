import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Axios } from '../axios/Axios';

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // State for auth status
    const [loading, setLoading] = useState(true); // State for loading

    useEffect(() => {
        const isAuth = async () => {
            try {
                const response = await Axios.get('/user/verify');
                console.log(response.data.authenticated);
                setIsAuthenticated(response.data.authenticated);
            } catch (err) {
                console.error(err);
                setIsAuthenticated(false); // Handle error by setting auth to false
            } finally {
                setLoading(false); // Ensure loading is set to false in all cases
            }
        };
        isAuth();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator while verifying
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/Login" />;
};

export default ProtectedRoute;