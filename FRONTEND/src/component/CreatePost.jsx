import React, { useState } from 'react';
import {Axios} from '../axios/Axios';
const CreatePost = () => {
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');
    const [images, setimages] = useState([]);
    const [amenities, setamenities] = useState('');
    const [features, setfeatures] = useState('');
    const [location, setlocation] = useState('');
    const [price, setprice] = useState('');
    const [bedrooms, setbedrooms] = useState('');
    const [bathrooms, setbathrooms] = useState('');
    const [propertyType, setPropertyType] = useState('');


    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("location", location);
        formData.append("propertyType", propertyType);
        formData.append("bedrooms", bedrooms);
        formData.append("bathrooms", bathrooms);
        formData.append("price", price);
        formData.append("amenities", amenities);
        formData.append("features", features);

        // Append each image file
        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }

        try {
            const res = await Axios.post("/post/createPost", formData, {
               withCredentials: true
            });
    
            const data = await res.data;
            console.log("Post created:", data);
    
            if (res.status === 201) {
                settitle('');
                setdescription('');
                setimages([]);
                setamenities('');
                setfeatures('');
                setlocation('');
                setprice('');
                setbedrooms('');
                setbathrooms('');
                setPropertyType('');
            }
        } catch (err) {
            console.log("Error uploading post:", err);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 sm:py-24 bg-gray-200">
            <div className="p-6 sm:p-10 bg-gray-100 rounded-lg shadow-md w-full max-w-4xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 text-center">
                    Upload Property Details
                </h2>
                <form className="space-y-4" onSubmit={submitHandler}>
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
                            value={title}
                            onChange={(e) => settitle(e.target.value)}
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
                                value={propertyType}
                                onChange={(e) => setPropertyType(e.target.value)}
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
                                value={bedrooms}
                                onChange={(e) => setbedrooms(e.target.value)}
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
                                value={bathrooms}
                                onChange={(e) => setbathrooms(e.target.value)}
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
                            value={location}
                            onChange={(e) => setlocation(e.target.value)}
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
                            value={price}
                            onChange={(e) => setprice(e.target.value)}
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
                            value={description}
                            onChange={(e) => setdescription(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>
                    <div>

                        {images.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                                {images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={URL.createObjectURL(img)}
                                        alt="preview"
                                        className="h-32 w-full object-cover rounded-lg shadow-md"
                                    />
                                ))}
                            </div>
                        )}



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
                            required
                            onChange={(e) => setimages([...e.target.files])}
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
                            value={amenities}
                            onChange={(e) => setamenities(e.target.value)}
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
                            value={features}
                            onChange={(e) => setfeatures(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;