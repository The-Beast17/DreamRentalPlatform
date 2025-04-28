import React, { useState, useEffect } from 'react';
import { Axios } from '../axios/Axios';
import { useNavigate, useParams } from 'react-router-dom';
import statesAndCities from '../StatesAndCities.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProperty = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the property ID from the route params
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');
    const [images, setimages] = useState([]);
    const [amenities, setamenities] = useState('');
    const [features, setfeatures] = useState('');
    const [state, setstate] = useState('');
    const [city, setcity] = useState("");
    const [location, setlocation] = useState('');
    const [price, setprice] = useState('');
    const [bedrooms, setbedrooms] = useState('');
    const [bathrooms, setbathrooms] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [propertyDocImages, setpropertyDocImages] = useState([]);
    const [errorMessage, seterrorMessage] = useState("");
    const [initialImages, setInitialImages] = useState([]); // To store existing image URLs
    const [initialDocImages, setInitialDocImages] = useState([]); // To store existing doc URLs
    const [loading, setloading] = useState(false);

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const res = await Axios.get(`/properties/getProperty/${id}`, {
                    withCredentials: true
                });
                const propertyData = res.data;
                settitle(propertyData.title);
                setdescription(propertyData.description);
                setstate(propertyData.state);
                setcity(propertyData.city);
                setlocation(propertyData.location);
                setPropertyType(propertyData.propertyType);
                setbedrooms(propertyData.bedrooms);
                setbathrooms(propertyData.bathrooms);
                setprice(propertyData.price);
                setamenities(propertyData.amenities);
                setfeatures(propertyData.features);
                setInitialImages(propertyData.propertyImages || []);
                setInitialDocImages(propertyData.propertyDocImages || []);
            } catch (err) {
                console.error("Error fetching property details:", err);
                typeof err.response?.data?.error === 'string' ?
                    seterrorMessage(err.response.data.error) :
                    seterrorMessage("Failed to load property details.");
            }
        };

        fetchPropertyDetails();
    }, [id]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("state", state);
        formData.append("city", city);
        formData.append("location", location);
        formData.append("propertyType", propertyType);
        formData.append("bedrooms", bedrooms);
        formData.append("bathrooms", bathrooms);
        formData.append("price", price);
        formData.append("amenities", amenities);
        formData.append("features", features);

        // Append new image files
        for (let i = 0; i < images.length; i++) {
            formData.append("propertyImages", images[i]);
        }

        // Append new document files
        for (let i = 0; i < propertyDocImages.length; i++) {
            formData.append("propertyDocImages", propertyDocImages[i]);
        }

        try {
            setloading(true);
            const res = await Axios.put(`/properties/updateProperty/${id}`, formData, {
                withCredentials: true
            });

            const data = await res.data;
            console.log("Property updated:", data);
            toast.success("Property updated successfully!");

            if (res.status === 200) {
                navigate(-1); // Go back to the previous page
            }
        } catch (err) {
            console.log("Error updating property:", err);
            typeof err.response?.data?.error === 'string' ?
                seterrorMessage(err.response.data.error) :
                seterrorMessage(JSON.stringify(err.response?.data?.message) || "Failed to update property.");
            console.log(err.response?.data?.message);
        } finally {
            setloading(false);
        }
    };

    const handleImageChange = (e) => {
        setimages([...e.target.files]);
    };

    const handleDocImageChange = (e) => {
        setpropertyDocImages([...e.target.files]);
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 sm:py-24 bg-gray-200">
            <div className="p-6 sm:p-10 bg-gray-100 rounded-lg shadow-md w-full max-w-4xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 text-center">
                    Edit Property Details
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
                                <option value="Apartment">Apartment</option>
                                <option value="House">House</option>
                                <option value="Villa">Villa</option>
                                <option value="Studio">Studio</option>
                                <option value="Penthouse">Penthouse</option>
                                <option value="Bungalow">Bungalow</option>
                                <option value="Farmhouse">Farmhouse</option>
                                <option value="Duplex">Duplex</option>
                                <option value="RowHouse">Row House</option>
                                <option value="Plot">Plot / Land</option>
                                <option value="CommercialOffice">Commercial Office</option>
                                <option value="Shop">Shop / Retail</option>
                                <option value="Warehouse">Warehouse</option>
                                <option value="CoLiving">Co-living Space</option>
                                <option value="Pg">Paying Guest (PG)</option>
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

                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label
                                htmlFor="State"
                                className="block text-sm font-medium text-gray-700"
                            >
                                State:
                            </label>
                            <select
                                value={state}
                                name='State'
                                onChange={
                                    (e) => {
                                        setstate(e.target.value);
                                        setcity("");
                                    }
                                }
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="">State</option>
                                {Object.keys(statesAndCities).map((stateName, idx) => (
                                    <option key={idx} value={stateName}>
                                        {stateName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-1/2">
                            <label
                                htmlFor="City"
                                className="block text-sm font-medium text-gray-700"
                            >
                                City:
                            </label>
                            <select
                                name='City'
                                value={city}
                                onChange={(e) => setcity(e.target.value)}
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="">City</option>
                                {state &&
                                    statesAndCities[state]?.map((cityName, idx) => (
                                        <option key={idx} value={cityName}>
                                            {cityName}
                                        </option>
                                    ))}
                                {!state && <option value="">Select State First</option>}
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
                            Rent/mounth:
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
                        {initialImages.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                                <p className="block text-sm font-medium text-gray-700 col-span-full">Existing Images:</p>
                                {initialImages.map((imgUrl, idx) => (
                                    <img
                                        key={idx}
                                        src={imgUrl.url}
                                        alt={`existing-${idx}`}
                                        className="h-32 w-full object-cover rounded-lg shadow-md"
                                    />
                                ))}
                            </div>
                        )}
                        {images.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                                <p className="block text-sm font-medium text-gray-700 col-span-full">New Images Preview:</p>
                                {images.map((img, idx) => (
                                    <img
                                        key={`new-${idx}`}
                                        src={URL.createObjectURL(img)}
                                        alt="new-preview"
                                        className="h-32 w-full object-cover rounded-lg shadow-md"
                                    />
                                ))}
                            </div>
                        )}
                        <label
                            htmlFor="propertyImages"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Upload New Images:
                        </label>
                        <input
                            type="file"
                            id="propertyImages"
                            name="propertyImages"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            You can upload new images to add or replace existing ones.
                        </p>
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
                    <div>
                        {initialDocImages.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                                <p className="block text-sm font-medium text-gray-700 col-span-full">Existing Documents:</p>
                                {initialDocImages.map((docUrl, idx) => (
                                    <a
                                        key={idx}
                                        href={docUrl.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        Document {idx + 1}
                                    </a>
                                ))}
                            </div>
                        )}
                        <label
                            htmlFor="propertyDocuments"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Upload New Property Documents:
                        </label>
                        <input
                            type="file"
                            id="propertyDocuments"
                            name="propertyDocuments"
                            multiple
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={handleDocImageChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Upload new or updated property-related documents.
                        </p>
                    </div>
                    {errorMessage &&
                        <span className='text-xl text-red-500'>{errorMessage}</span>
                    }
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                            </svg>
                        ) : null}
                        {loading ? 'Updating...' : 'Update Property'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProperty;