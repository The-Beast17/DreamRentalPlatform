import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaEdit, FaUserPlus, FaTimes } from 'react-icons/fa';
import AdminSignup from './AdminSignup';
import AdminProfileEdit from './AdminProfileEdit';
import { Axios } from '../axios/Axios';

const AdminProfile = () => {
    const navigate = useNavigate();

    const [adminData, setAdminData] = useState({ userName: '', email: '' });
    const [editForm, setEditForm] = useState({ userName: '', email: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingUser, setIsAddingUser] = useState(false);

    // Fetch admin data on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Axios.get('/admin/me');
                setAdminData(res.data);
                setEditForm(res.data);
            } catch (err) {
                console.error("Error fetching admin data:", err);
            }
        };
        fetchData();
    }, []);

    // Handlers
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm({ ...editForm, [name]: value });
    };

    const handleSave = () => {
        setAdminData(editForm);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditForm(adminData);
        setIsEditing(false);
    };

    const handleClose = () => navigate(-1);

    return (
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 min-h-screen flex items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full relative">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
                >
                    <FaTimes />
                </button>

                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Admin Profile</h2>

                {isAddingUser ? (
                    <AdminSignup onCancel={() => setIsAddingUser(false)} />
                ) : isEditing ? (
                    <AdminProfileEdit
                        formData={editForm}
                        onChange={handleEditChange}
                        onSave={handleSave}
                        onCancel={handleCancelEdit}
                    />
                ) : (
                    <>
                        <div className="flex flex-col items-center mb-6">
                            <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 w-20 h-20 flex items-center justify-center">
                                <FaUser className="text-white text-3xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mt-4">{adminData.userName}</h3>
                            <p className="text-gray-600">Administrator</p>
                        </div>

                        <div className="bg-gray-100 p-6 rounded-lg shadow-inner mb-6">
                            <p className="flex items-center text-gray-700">
                                <FaUser className="mr-2 text-indigo-500" />
                                <span className="font-medium">{adminData.userName}</span>
                            </p>
                            <p className="flex items-center text-gray-700 mt-4">
                                <FaEnvelope className="mr-2 text-indigo-500" />
                                <span className="font-medium">{adminData.email}</span>
                            </p>
                        </div>

                        <div className="flex justify-between space-x-4">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
                            >
                                <FaEdit className="mr-2" /> Edit Profile
                            </button>
                            <button
                                onClick={() => setIsAddingUser(true)}
                                className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
                            >
                                <FaUserPlus className="mr-2" /> Add User
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminProfile;
