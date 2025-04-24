import React, { useEffect, useState } from "react";
import { Axios } from "../axios/Axios";
import { useNavigate, useParams } from "react-router-dom";
import {
    FaMapMarkerAlt,
    FaBed,
    FaEye,
    FaStar,
    FaBath,
    FaMoneyBillAlt,
    FaCheckCircle,
    FaTimesCircle,
    FaClock,
    FaFileAlt,
    FaUser,
    FaExclamationTriangle,
} from "react-icons/fa";

const UserPropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const res = await Axios.get(`/properties/getProperty/${id}`);
                setProperty(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch property details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProperty();
        }
    }, [id]);

   const  uploadedDateTime = property?.createdAt ? new Date(property.createdAt).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) : 'N/A'

    const handleStatusChange = async (newStatus) => {
        try {
            await Axios.put(`/admin/updatePropertyStatus/${id}`, {
                status: newStatus,
            });
            setProperty({ ...property, status: newStatus });
        } catch (err) {
            console.error("Error updating property status:", err);
            setError("Failed to update property status.");
        }
    };

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-gray-100">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-gray-100">
                <p className="text-lg text-red-600">
                    <FaTimesCircle className="inline-block mr-2" />
                    {error}
                </p>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-gray-100">
                <p className="text-lg text-gray-700">
                    <FaExclamationTriangle className="inline-block mr-2" />
                    No property found
                </p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 py-12 px-4 sm:px-6 pt-24">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6 border-b">
                    {/* Listed By */}
                    {property.author && (
                        <div className="mb-4 flex flex-col sm:flex-row items-start sm:justify-between sm:items-center text-gray-700 text-sm sm:text-base gap-2">
                            <div className="flex items-center">
                                <FaUser className="mr-2 text-blue-500" />
                                <span className="font-semibold">Listed By:</span>
                                <span className="ml-1">{property.author._id}</span>
                            </div>
                            <div className="text-gray-500 text-xs sm:text-sm">
                                <FaClock className="inline-block mr-1 text-gray-400" />
                                {uploadedDateTime}
                            </div>
                        </div>
                    )}
                    {/* Title & Status */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{property.title}</h1>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${property.status === "verified"
                                    ? "bg-green-100 text-green-800"
                                    : property.status === "pending"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                }`}
                        >
                            {property.status === "verified" && <FaCheckCircle className="mr-1" />}
                            {property.status === "pending" && <FaClock className="mr-1" />}
                            {property.status !== "verified" && property.status !== "pending" && <FaTimesCircle className="mr-1" />}
                            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                        </span>
                    </div>

                    {/* Location */}
                    <p className="text-gray-700 mb-3 text-sm sm:text-base">
                        <FaMapMarkerAlt className="inline-block mr-2" />
                        {property.location}
                    </p>
                </div>

                {/* Image Carousel */}
                {property.propertyImages && property.propertyImages.length > 0 && (
                    <div className="relative">
                        <div className="overflow-x-auto flex gap-4 p-4 scrollbar-hide">
                            {property.propertyImages.map((img, index) => (
                                <img
                                    key={index}
                                    src={img.url}
                                    alt={`Property ${index}`}
                                    className="h-56 w-[80%] sm:w-96 object-cover rounded-md shadow-md flex-shrink-0 transition-transform duration-300 ease-in-out hover:scale-105"
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div className="p-6">
                    {/* Property Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 text-gray-700 text-sm sm:text-base">
                        <p className="flex items-center"><FaBed className="mr-2" /> {property.bedrooms} Bedrooms</p>
                        <p className="flex items-center"><FaBath className="mr-2" /> {property.bathrooms} Bathrooms</p>
                        <p className="flex items-center"><FaMoneyBillAlt className="mr-2" /> ₹{property.price}</p>
                        <p className="flex items-center">
                            {property.availability ? (
                                <FaCheckCircle className="mr-2 text-green-500" />
                            ) : (
                                <FaTimesCircle className="mr-2 text-red-500" />
                            )}
                            {property.availability ? "Available" : "Not Available"}
                        </p>
                        <p className="flex items-center">
                            <span className="font-semibold">Type:</span> {property.propertyType}
                        </p>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
                        <p className="text-gray-600 leading-relaxed">{property.description}</p>
                    </div>

                    {/* Amenities */}
                    {property.amenities?.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                <FaCheckCircle className="mr-2 text-blue-500" /> Amenities
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {property.amenities.map((item, i) => (
                                    <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Features */}
                    {property.features?.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                <FaStar className="mr-2 text-purple-500" /> Features
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {property.features.map((item, i) => (
                                    <span key={i} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Property Documents */}
                    {property.propertyDocImages?.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                <FaFileAlt className="mr-2 text-gray-700" /> Property Documents
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {property.propertyDocImages.map((image, index) => (
                                    <div key={index} className="relative rounded-md overflow-hidden shadow-md group hover:shadow-lg transition-shadow duration-300">
                                        <img
                                            src={image.url}
                                            alt={`Document ${index + 1}`}
                                            className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <a
                                                href={image.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white text-sm font-semibold bg-blue-600 px-3 py-2 rounded hover:bg-blue-700 flex items-center"
                                            >
                                                <FaEye className="mr-1" /> View
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>


              {/* see owner detail button */}
                <div className="p-4 bg-gray-50 rounded-b-lg flex flex-col sm:flex-row justify-between gap-3">
                    {property.author && (
                        <button
                            onClick={() => navigate(`/UserDetail/${property.author._id}`)}
                            className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none"
                        >
                            See Owner Details
                        </button>
                    )}
                      {/* verification button */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                    <span className="text-lg">verification:</span>
                    {property.status !== 'verified' && (
                        <button
                            onClick={() => handleStatusChange('verified')}
                            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none"
                        >
                            Verify
                        </button>
                    )}
                    {property.status !== 'rejected' && (
                        <button
                            onClick={() => handleStatusChange('rejected')}
                            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none"
                        >
                            Reject
                        </button>
                    )}
                    {property.status !== 'pending' && (
                        <button
                            onClick={() => handleStatusChange('pending')}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none"
                        >
                            Set Pending
                        </button>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPropertyDetails;
