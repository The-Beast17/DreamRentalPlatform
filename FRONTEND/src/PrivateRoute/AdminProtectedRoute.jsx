import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Axios } from '../axios/Axios';

const AdminProtectedRoute = () => {
    const [isAdmin, setIsAdmin] = useState(null); // null = unknown, true = admin, false = unauthorized
    const [loading, setLoading] = useState(true);
    const [error, seterror] = useState("")    

    useEffect(() => {
        const checkAdmin = async () => {
                try {
                    const response = await Axios.get('/admin/verify', { withCredentials: true });
                    setIsAdmin(response.data.authenticated); // true or false
                } catch (err) {
                    console.error(err);
                    setIsAdmin(false); // In case of error
                    seterror(err.response?.data?.message || "Verification failed.")
                    console.log(err.response?.data?.message)
                } finally {
                    setLoading(false);
                }
        };

        checkAdmin();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Optional: fancy loader or spinner
    }

    return isAdmin ? <Outlet /> : <Navigate  state={{ message: error }} to="/Unauthorized" />;
};

export default AdminProtectedRoute;
