import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Axios } from '../axios/Axios';
import Carousel from './Layout/Carousel'; // Assuming you have a Carousel component
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHeart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setpost] = useState(null);
  const [user, setuser] = useState(null);
  const { currentUser, setCurrentUser } = useAuth()



  //fetch property and user
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await Axios.get(`/properties/getProperty/${id}`);
        setpost(response.data);
        if (response.data) {
          setuser(response.data.author);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPost();
  }, []);



  //Handle Availablity 
  const handleToggleAvailability = async (propertyId) => {
    try {
      setpost((prevPost) => ({
        ...prevPost,
        availability: !prevPost.availability,
      }));

      await Axios.patch(`/properties/availablity/${propertyId}`);
      // toast.success("Availability updated");
    } catch (error) {
      console.error("Failed to toggle availability:", error);
      // toast.error("Failed to update availability");
    }
  };

  //delete Property Handler
  const handleDeleteProperty = async (propertyId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this property?");
    if (!confirmDelete) return;

    try {
      await Axios.delete(`/properties/deleteProperty/${propertyId}`);
      toast.success("Property deleted successfully");
      navigate("/Profile"); // Or wherever you'd like to redirect
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property. Please try again.");
      // toast.error("Failed to delete property");
    }
  };


  // Wishlist functionality
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Fetch user wishlist on mount
    const fetchWishlist = async () => {
      try {
        const res = await Axios.get(`/user/getWishlist`)
        setWishlist(res.data.map(p => p._id)); // Extract IDs
      } catch (error) {
        console.error("Error fetching wishlist", error);
      }
    };
    fetchWishlist();
  }, []);

  const toggleWishlist = async (propertyId) => {
    try {
      const res = await Axios.post(`/user/toggleWishlist/${propertyId}`);
      const updatedWishlist = res.data.wishList;
      setWishlist(updatedWishlist.map(p => typeof p === 'object' ? p._id : p));
    } catch (error) {
      console.error("Error toggling wishlist", error);
      toast.error("Failed to toggle wishlist. Please try again.");
    }
  };

  const property = {
    _id: post?._id,
    name: post?.title,
    type: post?.propertyType,
    bedrooms: post?.bedrooms,
    bathrooms: post?.bathrooms,
    state: post?.state,
    city: post?.city,
    location: post?.location,
    price: `₹${post?.price}`,
    description: post?.description,
    images: post?.propertyImages ? post.propertyImages.map((image) => image.url) : [],
    amenities: post?.amenities || ["N/A"], //['Swimming Pool', 'Gym', 'Parking', 'Garden'],
    features: post?.features || ["N/A"],// ['Balcony', 'Modern Kitchen', 'City View', 'Walk-in Closet'],
    availability: post?.availability,
    owner: {
      name: user?.userName || 'N/A',
      phone: user?.mobileNumber || 'N/A',
      email: user?.email || 'N/A',
    },
    uploadedDateTime: post?.createdAt ? new Date(post.createdAt).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) : 'N/A'

  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-8xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4'>
            <p className="text-center text-sm text-gray-500 mb-4">
              Uploaded on: {property.uploadedDateTime}
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              {property.name}
            </h2>

            {user?._id === currentUser?._id &&
              <div className=''>
                <button
                  onClick={() => navigate(`/EditProperty/${post._id}`)}
                  className="bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteProperty(post._id)}
                  className="bg-red-500 text-sm hover:bg-red-700 text-white font-bold py-1 px-4 rounded mr-2"
                >
                  Delete
                </button>
                <div className="relative group inline-block">
                  <button
                    onClick={() => handleToggleAvailability(post._id)}
                    className={`font-bold text-sm py-1 px-4 rounded transition duration-200 ${property.availability
                      ? 'bg-green-500 hover:bg-green-700 text-white'
                      : 'bg-yellow-500 hover:bg-yellow-700 text-gray-800'
                      }`}
                  >
                    {property.availability ? 'Available' : 'Not Available'}
                  </button>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 z-10 shadow-lg whitespace-nowrap">
                    {property.availability ? 'Mark as Not Available' : 'Mark as Available'}
                  </div>
                </div>
              </div>
            }
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Carousel images={property.images} />
            </div>
            <div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-700">Type:</span>
                  <span className="text-gray-800">{property.type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-700">Bedrooms:</span>
                  <span className="text-gray-800">{property.bedrooms}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-700">Bathrooms:</span>
                  <span className="text-gray-800">{property.bathrooms}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-700">Rent:</span>
                  <span className="text-gray-800">{property.price} <span className='text-[12px]'>/mounth</span></span>
                </div>
                <div>
                  <span className="text-sm font-bold text-gray-700">State:</span>
                  <p className="text-gray-800">{property.state}</p>
                </div>
                <div>
                  <span className="text-sm font-bold text-gray-700">City:</span>
                  <p className="text-gray-800">{property.city}</p>
                </div>
                <div>
                  <span className="text-sm font-bold text-gray-700">Location:</span>
                  <p className="text-gray-800">{property.location}</p>
                </div>
                <div>
                  <span className="text-sm font-bold text-gray-700">Description:</span>
                  <p className="text-gray-800">{property.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {currentUser && currentUser?.role !== 'admin' && 
      <div className="flex justify-center items-center mt-4">
        <button
          className="relative top-3 right-3 z-10 p-2 rounded-full bg-white shadow hover:bg-red-100 transition"
          onClick={() => toggleWishlist(property._id)}
        >
          {wishlist.includes(property._id) ? (
            <div className="flex items-center justify-center gap-3 px-4 py-2">
            <FaHeart className="text-red-500" />
            <span>Remove from WishList</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3 px-4 py-2">
            <FiHeart className="text-gray-400" />
            <span>Add to WishList</span>
            </div>
          )}
        </button>
      </div>
      }

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Amenities</h3>
          <ul className="list-disc list-inside text-gray-800">
            {property.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Features</h3>
          <ul className="list-disc list-inside text-gray-800">
            {property.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <div className='flex justify-between items-baseline'>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Owner Details</h3>
          <button
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium focus:outline-none"
            onClick={() => {
              navigate(`/Profile/${user._id}`)
            }}
          >
            View Profile
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-700">Name:</span>
            <span className="text-gray-800">{property.owner.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-700">Phone:</span>
            <span className="text-gray-800">{property.owner.phone}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-700">Email:</span>
            <span className="text-gray-800">{property.owner.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;