import React from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import {Axios} from '../axios/Axios';

const AdminProfileEdit = ({ formData, onChange, onSave, onCancel }) => {

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        try {
            const response = await Axios.put('admin/update-profile', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (onSave) onSave(); // Call the onSave callback if provided
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="userName"
                    value={formData.userName}
                    onChange={onChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
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
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-700"
                >
                    <FaSave className="inline mr-2" /> Save
                </button>
            </div>
        </form>
    );
};

export default AdminProfileEdit;
