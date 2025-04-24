import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiSearch, FiHome, FiMapPin, FiStar, FiFilter, FiDollarSign } from 'react-icons/fi';
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { Axios } from '../axios/Axios';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Properties = () => {
  const [properties, setproperties] = useState([])
  const [loginedUser, setloginedUser] = useState(null)
  const navigate = useNavigate()

  // fetch properties data from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Axios.get('/properties/getAllProperties');
        setproperties(response.data)
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  //get user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await Axios.get(`/user/me`);
        setloginedUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);



  //max price range
  const maxPrice = useMemo(() => {
    if (properties.length === 0) return 10000;
    return Math.max(...properties.map(property => property.price));
  }, [properties]) * 2;

  const location = useLocation();
  const searchFromHome = location.state?.search || '';


  // Filter states
  const [searchTerm, setSearchTerm] = useState(searchFromHome);
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOrder, setsortOrder] = useState('price-asc');




  useEffect(() => {
    // Clear state after initial use
    window.history.replaceState({}, document.title);
  }, []);


  // Unique values for filters
  const propertyTypes = [...new Set(properties.map(property => property.propertyType))];
  const states = [...new Set(properties.map(property => property.state))];
  const cities = [...new Set(properties.map(property => property.city))];

  // Apply filters
  useEffect(() => {
    let results = properties;

    results = results.filter(property =>
      property.status === "verified" && property.author?.status === "verified"
    );

    // Search term filter
    if (searchTerm) {
      results = results.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.state.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price range filter
    results = results.filter(property =>
      property.price >= priceRange[0] && property.price <= priceRange[1]
    );

    // Property type filter
    if (selectedTypes.length > 0) {
      results = results.filter(property =>
        selectedTypes.includes(property.propertyType)
      );
    }

    // State filter
    if (selectedStates.length > 0) {
      results = results.filter(property =>
        selectedStates.includes(property.state)
      );
    }

    // City filter
    if (selectedCities.length > 0) {
      results = results.filter(property =>
        selectedCities.includes(property.city)
      );
    }

    // Bedrooms filter
    if (bedrooms > 0) {
      results = results.filter(property =>
        property.bedrooms >= bedrooms
      );
    }

    // Bathrooms filter
    if (bathrooms > 0) {
      results = results.filter(property =>
        property.bathrooms >= bathrooms
      );
    }

    // Apply sorting
    if (sortOrder === "price-asc") {
      results = results.sort((a, b) => a.price - b.price); // Sort by price ascending
    } else if (sortOrder === "price-desc") {
      results = results.sort((a, b) => b.price - a.price); // Sort by price descending
    }

    setFilteredProperties(results);
  }, [
    searchTerm,
    priceRange,
    selectedTypes,
    selectedStates,
    selectedCities,
    bedrooms,
    bathrooms,
    properties,
    sortOrder
  ]);

  const toggleType = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 5000]);
    setSelectedTypes([]);
    setSelectedStates([]);
    setSelectedCities([]);
    setBedrooms(0);
    setBathrooms(0);
    setsortOrder("price-asc");
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



  if (loginedUser?.status === "blocked") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold text-red-600">Account Blocked</h2>
          <p className="mt-2 text-gray-600">Your account has been blocked. Please contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <header className="bg-white shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Rental</h1>
          <p className="mt-2 text-gray-600">Explore properties that match your lifestyle</p>
        </div>
        {searchFromHome &&
          <div className=" text-center text-gray-600" >Search results for "{searchFromHome}"</div>
        }
      </header>

      {/* Main Content */}
      <main className="w-full mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden px-4 pt-4">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-3 rounded-lg shadow hover:bg-indigo-700 transition-colors"
            >
              <FiFilter className="text-lg" />
              {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
              {mobileFiltersOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
          </div>

          {/* Filters Sidebar */}
          <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} lg:block w-full lg:w-72 bg-white p-6 shadow-md lg:shadow-lg`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FiFilter className="text-indigo-600" />
                Filters
              </h2>
              <button
                onClick={resetFilters}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Reset All
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">Search Properties</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by name, city, or state"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-500">${priceRange[0]}</span>
                <span className="text-sm font-medium text-gray-500">${priceRange[1]}</span>
              </div>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  step="100"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                />
              </div>
              <div className="flex justify-between mt-4 gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    min="0"
                    max={maxPrice}
                    className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  />
                </div>
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    min="0"
                    max={maxPrice}
                    className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  />
                </div>
              </div>
            </div>

            {/* Property Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Property Type</label>
              <div className="grid grid-cols-2 gap-2">
                {propertyTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => toggleType(type)}
                    className={`flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedTypes.includes(type) ? 'bg-indigo-100 text-indigo-800 border border-indigo-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'}`}
                  >
                    <FiHome className="mr-2" />
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Location - Updated with Dropdowns */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Location</label>
              <div className="space-y-3">
                {/* State Dropdown */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">State</label>
                  <div className="relative">
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                      value={selectedStates[0] || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSelectedStates(value ? [value] : []);
                        // Reset cities when state changes
                        setSelectedCities([]);
                      }}
                    >
                      <option value="">All States</option>
                      {states.map((state, idx) => (
                        <option key={idx} value={state}>{state}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <IoIosArrowDown className="text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* City Dropdown */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">City</label>
                  <div className="relative">
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                      value={selectedCities[0] || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSelectedCities(value ? [value] : []);
                      }}
                      disabled={selectedStates.length === 0}
                    >
                      <option value="">All Cities</option>
                      {selectedStates.length > 0 &&
                        [...new Set(properties
                          .filter(p => selectedStates.includes(p.state))
                          .map(p => p.city))]
                          .map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))
                      }
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <IoIosArrowDown className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(parseInt(e.target.value))}
                >
                  <option value="0">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(parseInt(e.target.value))}
                >
                  <option value="0">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Property Listings */}
          <div className="flex-1 p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-xl font-bold text-gray-800">
                {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Available
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortOrder}
                  onChange={(e) => setsortOrder(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                >
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {filteredProperties.length === 0 ? (
              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No properties match your criteria</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters to see more results</p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProperties.map(property => (
                  <div key={property._id} className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <img
                        src={property.propertyImages[0].url}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                      {property.features && (
                        <div className="absolute top-3 left-3 bg-amber-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full flex items-center">
                          <FiStar className="mr-1" />
                          Featured
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 bg-white/90 text-gray-900 font-bold px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                        ₹{property.price.toLocaleString()}/mo
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 truncate" title={property.title}>
                        {property.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 flex items-center">
                        <FiMapPin className="mr-1" />
                        {property.city}, {property.state}
                      </p>
                      <div className="flex justify-between text-sm text-gray-700 border-t border-gray-100 pt-3 mt-3">
                        <span className="flex items-center">
                          <FaBed className="mr-1 text-gray-500" />
                          {property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}
                        </span>
                        <span className="flex items-center">
                          <FaBath className="mr-1 text-gray-500" />
                          {property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}
                        </span>
                        <span className={`flex items-center px-3 py-1 text-[12px] font-semibold rounded ${property.availability ? "bg-green-300 text-green-700 " : "bg-red-300 text-red-700 px-1 "}`}>
                          {property.availability ? "Available" : "not Available"}
                        </span>
                      </div>

                      {loginedUser && 
                        <button
                          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white shadow hover:bg-red-100 transition"
                          onClick={() => toggleWishlist(property._id)}
                        >
                          {wishlist.includes(property._id) ? (
                            <FaHeart className="text-red-500" />
                          ) : (
                            <FiHeart className="text-gray-400" />
                          )}
                        </button>
                      }                      

                      <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        onClick={() => navigate(`/PropertyDetail/${property._id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Properties;