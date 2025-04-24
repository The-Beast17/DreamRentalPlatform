import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Axios } from '../axios/Axios';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiHeart, FiTrash2 } from 'react-icons/fi';

const Profile = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setposts] = useState([]);
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useAuth();
    const [showBioEditor, setShowBioEditor] = useState(false);
    const [editedBio, setEditedBio] = useState(user?.bio || '');

    const handleSaveBio = async () => {
        try {
            const response = await Axios.put('/user/update-bio', { bio : editedBio });
            if (response.status === 200) {
              // Update the state with the updated bio
              setUser((prevUser) => ({
                ...prevUser,
                bio: response.data.bio,
              }));
            setShowBioEditor(false);
        
              // Optionally, persist the bio in localStorage for persistence across refresh
              localStorage.setItem('userBio', response.data.bio);
            }
          } catch (err) {
            console.error("Failed to update bio", err);
          }
    }


    //get user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await Axios.get(`/user/getUser/${id}`);
                setUser(response.data.user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, [id]);


    //get user post data
    useEffect(() => {
        const fetchProperties = async () => {
            if (user) {
                try {
                    const response = await Axios.get(`/properties/getUserProperties/${user?._id}`);
                    setposts(response.data);
                } catch (error) {
                    console.error("Error fetching posts:", error);
                }
            }
        };
        fetchProperties();
    }, [user]);

    // Wishlist Handler
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                setLoading(true);
                const res = await Axios.get('/user/getWishlist');
                console.log(res.data)
                setWishlist(res.data || []);
                setError(null);
            } catch (error) {
                console.error('Error fetching wishlist', error);
                setError('Failed to load wishlist. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchWishlist();
    }, []);

    // Remove from Wishlist Handler
    const handleRemove = async (id) => {
        try {
            await Axios.post(`/user/toggleWishlist/${id}`);
            setWishlist((prev) => prev.filter((item) => item._id !== id));
            setError(null);
        } catch (error) {
            console.error('Error removing item from wishlist', error);
            setError('Failed to remove item. Please try again.');
        }
    };


    if (!user || !posts) {
        return <div className="text-center py-8">Loading...</div>;
    }

    const handleEditProfile = () => {
        navigate('/EditUserProfile');
    };

    const handleAddProperty = () => {
        navigate('/CreatePost');
    };


    //Handle Availablity 
    const handleToggleAvailability = async (propertyId) => {
        try {
            // Optimistically update UI
            setposts((prevPosts) =>
                prevPosts.map((property) =>
                    property._id === propertyId
                        ? { ...property, availability: !property.availability }
                        : property
                )
            );
            // Send update to backend
            await Axios.patch(`/properties/availablity/${propertyId}`);

        } catch (error) {
            console.error("Failed to toggle availability:", error);
        }
    };

    //delete Property Handler
    const handleDeleteProperty = async (propertyId) => {
        try {
            const confirmDelete = window.confirm("Are you sure you want to delete this property?");
            if (!confirmDelete) return;

            // Delete from backend
            await Axios.delete(`/properties/deleteProperty/${propertyId}`);

            // Optimistically remove from UI
            setposts((prevPosts) => prevPosts.filter((p) => p._id !== propertyId));
            toast.success("Property deleted successfully");
            <toastContainer />
        } catch (error) {
            console.error("Error deleting property:", error);
            alert("Failed to delete property. Please try again.");
        }
    };

    const deleteHandler = async (userId) => {
        try {
            const confirmDelete = window.confirm("Are you sure you want to delete your account?");
            if (!confirmDelete) return;
            await Axios.delete(`/user/deleteUser/${userId}`);
            alert("Account deleted successfully.");
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("Failed to delete account. Please try again.");
        }
    }




    if (user?.status === 'blocked') {
        return (
            <div className="text-center py-8 h-screen flex flex-col items-center justify-center">
                <h2 className="text-xl font-semibold text-red-600">Your account has been blocked.</h2>
                <p className="text-gray-500">Please contact support for more information.</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 py-20">
            <div className="container mx-auto px-4 md:px-0">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden md:flex">
                    {/* Profile Header */}
                    <div className="md:w-1/3 p-8 bg-zinc-900 text-white text-center  flex flex-col items-center relative">
                        {/* Top-right 3 Dot Menu */}
                        {currentUser?._id === user?._id && (
                            <div className="absolute top-4 right-4 group inline-block z-20">
                                <button className="text-white text-2xl font-bold px-2 py-1 hover:bg-zinc-700 rounded">
                                    ⋮
                                </button>
                                <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <button
                                        onClick={() => {
                                            deleteHandler(user._id);
                                            setCurrentUser(null);
                                            navigate('/');
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                                    >
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        )}


                        <img
                            src={"https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png"}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0 border-2 border-indigo-200"
                        />
                        <h2 className="text-xl font-semibold text-zinc-300 mt-4">{user.userName}</h2>
                        <div className="mt-2 text-gray-500">
                            <p className="flex items-center justify-center md:justify-start mb-1">
                                <FaEnvelope className="mr-2" />
                                <a href={`mailto:${user.email}`} className="hover:text-indigo-600">{user.email}</a>
                            </p>

                            <p className="flex items-center justify-center md:justify-start mb-1">
                                <FaPhone className="mr-2" />

                                <a href={`tel:${user.mobileNumber}`} className="hover:text-indigo-600"><span>{`${user.countryCode} `}</span>{user.mobileNumber}</a>
                            </p>
                            <p className="flex items-center justify-center md:justify-start mb-3">
                                <FaMapMarkerAlt className="mr-2" />
                                {user.city}, {user.state}
                            </p>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                            {user.role === 'landlord' && (
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${user.status === "verified"
                                        ? "bg-green-100 text-green-800"
                                        : user.status === "Pending"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {user.status === "pending" && "Pending Verification"}
                                    {user.status === "rejected" && "Verification Failed"}
                                    {user.status === "verified" && "Verified"}
                                </span>
                            )}


                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${user.role === "admin"
                                    ? "bg-blue-100 text-blue-800"
                                    : user.role === "landlord"
                                        ? "bg-purple-100 text-purple-800"
                                        : "bg-gray-200 text-gray-700"
                                    }`}
                            >
                                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </span>
                        </div>
                        {user.status === 'rejected' &&
                            <span className='text-sm text-red-600'>
                                "Your verification has been rejected. Please update your profile and resubmit the required documents for review."
                            </span>
                        }

                        {currentUser?._id === user?._id &&
                            <div className="flex gap-5 mt-6">
                                <button
                                    onClick={handleEditProfile}
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center md:justify-start"
                                >
                                    <FaEdit className="mr-2" /> Edit Profile
                                </button>
                                {user.role === "landlord" && user.status === "verified" && (
                                    <button
                                        onClick={handleAddProperty}
                                        className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center md:justify-start mt-2 md:mt-0"
                                    >
                                        <FaPlus className="mr-2" /> Add Property
                                    </button>
                                )}
                            </div>
                        }
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-gray-300 mb-2">About Me</h3>
                            <p className="text-gray-500 leading-relaxed">{user.bio || "No bio available."}</p>
                            
                            {currentUser?._id === user?._id && 
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-1 px-3 rounded-md mt-2 text-sm"
                                onClick={() => setShowBioEditor(true)}
                            >
                                {user.bio ? "Edit Bio" : "Add Bio"}
                            </button>
                            }
                            {showBioEditor && (
                                <div className="mt-2">
                                    <textarea
                                        className="w-full p-2 rounded-md text-sm text-gray-800"
                                        rows={3}
                                        value={editedBio}
                                        onChange={(e) => setEditedBio(e.target.value)}
                                    />
                                    <div className="flex gap-2 mt-1">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-sm"
                                            onClick={handleSaveBio}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded-md text-sm"
                                            onClick={() => setShowBioEditor(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>

                    { /*property content  */}
                    <div className="md:w-2/3 p-8 bg-gray-100 flex flex-col">
                        {user.role === "landlord" &&
                            <div className="p-8">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Properties Listed</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {posts && posts?.length > 0 ? (
                                        posts.map((property) => (
                                            <div
                                                key={property._id}
                                                className="bg-white rounded-lg shadow-md cursor-pointer overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
                                                onClick={() => navigate(`/PropertyDetail/${property._id}`)}
                                            >

                                                <div className="relative group w-max">
                                                    {/* Availability Status */}
                                                    <div
                                                        onClick={(e) => {
                                                            e.stopPropagation(); // Prevent card click
                                                            currentUser?._id === user?._id && handleToggleAvailability(property._id);
                                                        }}
                                                        className={`absolute top-2 left-2 whitespace-nowrap  px-2 py-1 text-xs font-semibold rounded cursor-pointer z-10 ${property.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                                    >
                                                        {property.availability ? 'Available' : 'Not Available'}
                                                    </div>

                                                    {/* Tooltip */}
                                                    <div className="absolute top-24 left-2 -translate-y-full bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                                        {currentUser?._id === user?._id
                                                            ? property.availability
                                                                ? 'Mark as Not Available'
                                                                : 'Mark as Available'
                                                            : property.availability
                                                                ? 'Currently Available'
                                                                : 'Currently Not Available'}
                                                    </div>
                                                </div>


                                                <img
                                                    src={property.propertyImages[0].url}
                                                    alt={property.title}
                                                    className="w-full h-48 object-cover"
                                                />
                                                <div className="p-4">
                                                    <h4 className="text-xl font-semibold text-gray-800 truncate">{property.title}</h4>
                                                    <p className="text-gray-600 text-sm truncate">{property.location}</p>
                                                    <p className="text-indigo-600 font-medium mt-2">₹{property.price.toLocaleString()}</p>

                                                    {property.status && (
                                                        <p className="text-gray-700 text-sm mt-1">
                                                            Status:
                                                            <span
                                                                className={`ml-1 px-2 py-0.5 rounded 
                                                                     ${property.status === "pending"
                                                                        ? "bg-yellow-100 text-yellow-700"
                                                                        : property.status === "verified"
                                                                            ? "bg-green-100 text-green-800"
                                                                            : "bg-red-100 text-red-800"
                                                                    }`}
                                                            >
                                                                {property.status}
                                                            </span>
                                                        </p>
                                                    )}

                                                </div>
                                                {currentUser?._id === user?._id &&
                                                    <div className="absolute top-2 right-2 flex space-x-2 z-10"> {/* Added z-10 */}
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();// prevent card click
                                                                navigate(`/EditProperty/${property._id}`)
                                                            }}
                                                            className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteProperty(property._id);
                                                            }}
                                                            className="bg-red-500 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                                        >
                                                            <FaTrashAlt />
                                                        </button>
                                                    </div>
                                                }
                                            </div>

                                        ))
                                    ) : (
                                        <div className="col-span-full text-center py-6">
                                            <p className="text-gray-500">No properties listed yet.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        }
                        {currentUser?._id === user?._id && user.role !== "admin" &&
                            <div className="p-8">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">My Liked Property</h3>
                                {loading ? (
                                    <div className="text-center py-4">Loading...</div>
                                ) : error ? (
                                    <div className="text-center py-4 text-red-500">{error}</div>
                                ) : wishlist && wishlist?.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {wishlist.map((item) => (
                                            <div
                                                key={item._id}
                                                className=" bg-white rounded-lg shadow-md cursor-pointer overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
                                                onClick={() => navigate(`/PropertyDetail/${item._id}`)}
                                            >
                                                <img
                                                    src={item.propertyImages[0].url}
                                                    alt={item.title}
                                                    className="w-full h-48 object-cover"
                                                />
                                                <div className="p-4">
                                                    <h4 className="text-xl font-semibold text-gray-800 truncate">{item.title}</h4>
                                                    <p className="text-gray-600 text-sm truncate">{item.location}</p>
                                                    <p className="text-indigo-600 font-medium mt-2">₹{item.price.toLocaleString()}</p>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent card click
                                                        handleRemove(item._id);
                                                    }}
                                                    className="mx-auto mb-4 flex items-center justify-center bg-red-500 hover:bg-red-700 text-white text-xs font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                                                >
                                                    <FiTrash2 className="mr-2" /> Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="col-span-full text-center py-6">
                                        <p className="text-gray-500">No items in wishlist.</p>
                                    </div>
                                )}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
