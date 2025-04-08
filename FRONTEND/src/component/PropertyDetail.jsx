import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Axios } from '../axios/Axios';
import Carousel from './Layout/Carousel'; // Assuming you have a Carousel component

const PropertyDetail = () => {
  const { id } = useParams();
  const [posts, setposts] = useState(null);
  const [user, setuser] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await Axios.get(`/post/getPost/${id}`);
        setposts(response.data);
        if(response.data) {
          const userRes = await Axios.get(`/user/getUser/${response.data.author._id}`);
          setuser(userRes.data);
        }
        navigate("/Profile")
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPost();
  }, []);

  const property = {
    name: posts?.title,
    type: posts?.propertyType,
    bedrooms: posts?.bedrooms,
    bathrooms: posts?.bathrooms,
    location: posts?.location,
    price: `₹${posts?.price}`,
    description: posts?.description,
    images: posts?.images ? posts.images.map((image) => `http://localhost:5000${image}`) : [],
    amenities: posts?.amenities || ["N/A"], //['Swimming Pool', 'Gym', 'Parking', 'Garden'],
    features: posts?.features || ["N/A"],// ['Balcony', 'Modern Kitchen', 'City View', 'Walk-in Closet'],
    owner: {
      name: user?.userName || 'N/A',
      phone: user?.mobileNumber || 'N/A',
      email: user?.email || 'N/A',
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-8xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            {property.name}
          </h2>
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
                  <span className="text-sm font-bold text-gray-700">Price:</span>
                  <span className="text-gray-800">{property.price}</span>
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
        <h3 className="text-lg font-bold text-gray-800 mb-4">Owner Details</h3>
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