import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../axios/Axios";

const UserProperties = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await Axios.get(`/properties/getUserProperties/${id}`);
        console.log(res.data);
        setProperties(res.data || []);
      } catch (error) {
        console.error("Error fetching user properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [id]);

  if (loading) return <p className="text-center py-4">Loading properties...</p>;

  return (
    <div className="mt-8 px-4 sm:px-8 md:px-16 lg:px-32">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Uploaded Properties</h2>
      {properties.length === 0 ? (
        <p className="text-gray-600 text-center">No properties found for this user.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              onClick={() => navigate(`/UserPropertyDetails/${property._id}`)}
              className="bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer"
            >
              <img
                src={property.propertyImages[0].url}
                alt={property.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="text-lg font-bold">{property.title}</h3>
              <p className="text-sm text-gray-500">{property.city}, {property.state}</p>
              <p className="text-sm text-gray-700 mt-1">₹ {property.price}/month</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProperties;
