import React from 'react';

const CreatePost = () => {
    return (
        <div className="min-h-screen flex items-center justify-center py-12 sm:py-24 bg-gray-200">
            <div className="p-6 sm:p-10 bg-gray-100 rounded-lg shadow-md w-full max-w-4xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 text-center">
                    Upload Property Details
                </h2>
                <form className="space-y-4">
                    <div>
                        <label
                            htmlFor="propertyName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Property Name:
                        </label>
                        <input
                            type="text"
                            id="propertyName"
                            name="propertyName"
                            placeholder="2 BHK Flat, 3 BHK House, 1 BHK Flat, etc"
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label
                                htmlFor="propertyType"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Property Type:
                            </label>
                            <select
                                id="propertyType"
                                name="propertyType"
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select</option>
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="villa">Villa</option>
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="bedrooms"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Number of Bedrooms:
                            </label>
                            <select
                                id="bedrooms"
                                name="bedrooms"
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5+</option>
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="bathrooms"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Number of Bathrooms:
                            </label>
                            <select
                                id="bathrooms"
                                name="bathrooms"
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5+</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="propertyLocation"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Location:
                        </label>
                        <input
                            type="text"
                            id="propertyLocation"
                            name="propertyLocation"
                            placeholder="house no 1, street no 2, Area, city, state, country"
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="propertyPrice"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Price:
                        </label>
                        <input
                            type="number"
                            id="propertyPrice"
                            name="propertyPrice"
                            placeholder="in INR"
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="propertyDescription"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description:
                        </label>
                        <textarea
                            id="propertyDescription"
                            name="propertyDescription"
                            placeholder="Description of the property"
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>
                    <div>
                        <label
                            htmlFor="propertyImages"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Upload Images:
                        </label>
                        <input
                            type="file"
                            id="propertyImages"
                            name="propertyImages"
                            multiple
                            accept="image/*"
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="propertyAmenities"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Amenities:
                        </label>
                        <textarea
                            id="propertyAmenities"
                            name="propertyAmenities"
                            placeholder="List amenities separated by commas (e.g., Pool, Gym, Parking)"
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>
                    <div>
                        <label
                            htmlFor="propertyFeatures"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Features:
                        </label>
                        <textarea
                            id="propertyFeatures"
                            name="propertyFeatures"
                            placeholder="List features separated by commas (e.g., Balcony, Garden, Fireplace)"
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;