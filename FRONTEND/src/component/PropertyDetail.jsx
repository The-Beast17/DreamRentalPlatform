
import React, { useState } from 'react';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full">
      <img
        src={images[currentIndex]}
        alt={`Property ${currentIndex + 1}`}
        className="w-full h-64 sm:h-96 object-cover rounded-lg transition-opacity duration-300"
      />
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
      >
        &#8249;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
      >
        &#8250;
      </button>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

const PropertyDetail = () => {
  const property = {
    name: 'Luxury 2 BHK Apartment',
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    location: '123 Oak St, Cityville, State, Country',
    price: '₹75,00,000',
    description:
      'Experience modern living in this spacious 2 BHK apartment with premium finishes and stunning city views. Enjoy access to a rooftop pool, gym, and 24/7 concierge service.',
    images: [
      'https://plus.unsplash.com/premium_photo-1674406763863-b64be22c78a9?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1726612067601-c3067bfd8d82?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1740997621838-faaec5fa62d3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    amenities: ['Rooftop Pool', 'Gym', '24/7 Concierge', 'Parking', 'Garden'],
    features: ['Balcony', 'Modern Kitchen', 'City View', 'Walk-in Closet'],
    contact: {
      agent: 'John Doe',
      phone: '+1 123-456-7890',
      email: 'john.doe@example.com',
    },
  };

  return (
    <div className="min-h-screen  bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-8xl mx-auto bg-white rounded-lg shadow-md overflow-hidden ">
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
                  <span className="text-sm font-medium text-gray-700">Type:</span>
                  <span className="text-gray-800">{property.type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Bedrooms:</span>
                  <span className="text-gray-800">{property.bedrooms}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Bathrooms:</span>
                  <span className="text-gray-800">{property.bathrooms}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Price:</span>
                  <span className="text-gray-800">{property.price}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Location:</span>
                  <p className="text-gray-800">{property.location}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Description:</span>
                  <p className="text-gray-800">{property.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Amenities</h3>
            <ul className="list-disc list-inside text-gray-800">
                {property.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                ))}
            </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Features</h3>
            <ul className="list-disc list-inside text-gray-800">
                {property.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
        </div>
    </div>
    </div>
  );
};

export default PropertyDetail;