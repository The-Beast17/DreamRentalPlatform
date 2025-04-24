import React, { useState } from 'react';
import { FaTimes, FaUserPlus } from 'react-icons/fa';
import {Axios} from '../axios/Axios'; // Import Axios

const AdminSignup = ({ onCancel }) => {
    const [formData, setFormData] = useState({
        newUsername: '',
        newEmail: '',
        newPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState(''); // For server-side errors

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.newUsername) newErrors.newUsername = 'Username is required.';
        if (!formData.newEmail) newErrors.newEmail = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(formData.newEmail)) newErrors.newEmail = 'Invalid email format.';
        if (!formData.newPassword) newErrors.newPassword = 'Password is required.';
        else if (formData.newPassword.length < 6) newErrors.newPassword = 'Password must be at least 6 characters.';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            try {
                const response = await Axios.post('/admin/signup', {
                    userName: formData.newUsername,
                    email: formData.newEmail,
                    password: formData.newPassword,
                }, {
                    withCredentials: true, // Include cookies if needed
                });

                if (response.status === 201) { // Assuming 201 for successful creation
                    setFormData({
                        newUsername: '',
                        newEmail: '',
                        newPassword: ''
                    });
                    onCancel(); // Close the form after successful signup
                }
            } catch (error) {
                setServerError(error.response?.data?.message || 'An error occurred.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-4 text-center">Add New Admin</h3>
            {serverError && <p className="text-red-500 text-xs italic">{serverError}</p>}
            <div>
                <label htmlFor="newUsername" className="block text-gray-700 text-sm font-semibold mb-2">
                    Username:
                </label>
                <input
                    type="text"
                    id="newUsername"
                    name="newUsername"
                    value={formData.newUsername}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.newUsername && <p className="text-red-500 text-xs italic">{errors.newUsername}</p>}
            </div>
            <div>
                <label htmlFor="newEmail" className="block text-gray-700 text-sm font-semibold mb-2">
                    Email:
                </label>
                <input
                    type="email"
                    id="newEmail"
                    name="newEmail"
                    value={formData.newEmail}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.newEmail && <p className="text-red-500 text-xs italic">{errors.newEmail}</p>}
            </div>
            <div>
                <label htmlFor="newPassword" className="block text-gray-700 text-sm font-semibold mb-2">
                    Password:
                </label>
                <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.newPassword && <p className="text-red-500 text-xs italic">{errors.newPassword}</p>}
                <p className="text-gray-500 text-xs italic">Consider secure password generation in production.</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                <button
                    type="button"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                    onClick={onCancel}
                >
                    <FaTimes className="inline mr-2" /> Cancel
                </button>
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
                >
                    <FaUserPlus className="inline mr-2" /> Create Admin
                </button>
            </div>
        </form>
    );
};

export default AdminSignup;
