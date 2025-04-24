import React, { useEffect, useState } from 'react';
import { Axios } from '../axios/Axios';
import { FiHeart, FiTrash2, FiShoppingCart, FiAlertCircle } from 'react-icons/fi';
import { PulseLoader } from 'react-spinners';


const WishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const res = await Axios.get('/user/getWishlist');
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


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24">
        <div className="text-center">
          <PulseLoader color="#3B82F6" size={15} />
          <p className="mt-4 text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24 px-4">
        <div className="max-w-md bg-white p-6 rounded-lg shadow-md text-center">
          <FiAlertCircle className="mx-auto text-red-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            My Wishlist
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {wishlist?.length === 0 ? (
          <div className="text-center py-12">
            <FiHeart className="mx-auto text-gray-400 text-5xl mb-4" />
            <h2 className="text-xl font-medium text-gray-700">Your wishlist is empty</h2>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              Start saving your favorite items by clicking the heart icon on any product.
            </p>
            <button
              onClick={() => window.location.href = '/Properties'} // Adjust as needed
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition"
            >
              Browse Properties
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlist && wishlist?.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
              >
                <div className="p-4 flex-grow">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-md overflow-hidden mb-4">
                    {item.propertyImages ? (
                      <img
                        src={item.propertyImages[0].url}
                        alt={item.title}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <FiHeart className="text-3xl" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{item.location}</p>
                  <p className="text-gray-900 font-bold mt-2">
                    {typeof item.price === 'number'
                      ? `$${item.price.toFixed(2)}`
                      : item.price}
                  </p>
                </div>
                <div className="border-t border-gray-100 p-4 flex space-x-2">
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="flex-1 flex items-center justify-center py-2 px-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-md transition"
                    title="Remove"
                  >
                    <FiTrash2 className="mr-2" />
                    <span className="text-sm font-medium">Remove</span>
                  </button>
                  {/* <button
                    onClick={() => handleMoveToCart(item)}
                    className="flex-1 flex items-center justify-center py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-md transition"
                    title="Add to cart"
                  >
                    <FiShoppingCart className="mr-2" />
                    <span className="text-sm font-medium">Cart</span>
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;