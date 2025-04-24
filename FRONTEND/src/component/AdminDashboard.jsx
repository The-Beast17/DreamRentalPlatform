import React, { useEffect, useState, useMemo } from 'react';
import { Axios } from '../axios/Axios'; // Assuming this path is correct
import {
  FaUserCheck, FaUserTimes, FaCheckCircle, FaTimesCircle, FaBuilding,
  FaUserCog, FaUsers, FaFilter, FaUserClock, FaUserSlash, FaHourglassHalf,
  FaBan, FaUserEdit
} from 'react-icons/fa'; // Example icons
import { MdEmail, MdWork, MdVerified, MdPending, MdCancel, MdAttachMoney, MdSquareFoot } from 'react-icons/md'; // More icons
import { useNavigate } from 'react-router-dom';

// Helper component for Status Badges
const StatusBadge = ({ status }) => {
  let bgColor = 'bg-gray-200';
  let textColor = 'text-gray-800';
  let Icon = FaHourglassHalf;

  switch (status?.toLowerCase()) {
    case 'verified':
    case 'active':
      bgColor = 'bg-green-100';
      textColor = 'text-green-700';
      Icon = MdVerified;
      break;
    case 'pending':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-700';
      Icon = MdPending;
      break;
    case 'rejected':
    case 'inactive':
      bgColor = 'bg-red-100';
      textColor = 'text-red-700';
      Icon = MdCancel; // Or FaBan / FaUserSlash
      break;
    default:
      Icon = FaHourglassHalf; // Default icon
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${bgColor} ${textColor}`}>
      <Icon className="mr-1" />
      {status || 'N/A'}
    </span>
  );
};


const AdminDashboard = () => {
  const navigate =  useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [tab, setTab] = useState('landlords'); // Default tab

  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [propertyStatusFilter, setPropertyStatusFilter] = useState('all');
  const [landlordStatusFilter, setLandlordStatusFilter] = useState('all');
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [error, setError] = useState(null); // Basic error state


  const fetchAllUsers = async () => {
    setLoadingUsers(true);
    setError(null);
    try {
      const res = await Axios.get('/admin/getAllUsers');
      // Ensure res.data.users is an array, default to empty array if not
      setAllUsers(Array.isArray(res.data.users) ? res.data.users : []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users.");
      setAllUsers([]); // Clear users on error
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchAllProperties = async () => {
    setLoadingProperties(true);
    setError(null);
    try {
      const res = await Axios.get('/properties/getAllProperties');
       // Ensure res.data is an array, default to empty array if not
      setAllProperties(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError("Failed to fetch properties.");
      setAllProperties([]); // Clear properties on error
    } finally {
      setLoadingProperties(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
    fetchAllProperties();
  }, []); // Fetch on mount


  // --- Action Handlers with Refetch ---
  const handleVerifyUser = async (id, status) => {
    try {
      // Optimistic UI update can be added here if needed
      await Axios.put(`/admin/verify-landlord/${id}`, { status });
      await fetchAllUsers(); // Refetch users after update
    } catch (err) {
      console.error("Error updating user status:", err);
      setError(`Failed to update user ${id}.`);
      // Optionally revert optimistic update here
    }
  };


  // --- Memoized Filtered Data ---
  const landlords = useMemo(() =>
    allUsers.filter(user => user.role === 'landlord'),
    [allUsers]
  );

  const tenants = useMemo(() =>
    allUsers.filter(user => user.role === 'tenant'),
    [allUsers]
  );

  const filteredUsers = useMemo(() =>
    allUsers.filter(user =>
      userRoleFilter === 'all' || user.role === userRoleFilter
    ),
    [allUsers, userRoleFilter]
  );

  const filteredLandlord = useMemo(() =>
    landlords.filter(user =>
      landlordStatusFilter === 'all' || user.status === landlordStatusFilter
    ),
    [allUsers, landlordStatusFilter]
  );

  const filteredProperties = useMemo(() =>
    allProperties.filter(property =>
      propertyStatusFilter === 'all' || property.status === propertyStatusFilter
    ),
    [allProperties, propertyStatusFilter]
  );

  // --- Render Helper for Loading/Error/Empty States ---
  const renderContent = (isLoading, data, CardComponent, emptyMessage) => {
    if (isLoading) return <div className="text-center py-10 text-gray-500">Loading...</div>;
    if (!data || data.length === 0) return <div className="text-center py-10 text-gray-500">{emptyMessage}</div>;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => <CardComponent key={item._id} item={item} />)}
      </div>
    );
  };


  // --- Card Components ---
  const LandlordCard = ({ item: user }) => (
     <div
      className="bg-white rounded-lg shadow-md overflow-hidden p-5 flex flex-col justify-between h-full border border-gray-200 hover:shadow-lg transition-shadow duration-200">
        <div>
          <h2 className="text-xl font-semibold mb-2 truncate">{user.userName}</h2>
          <p className="text-sm text-gray-600 mb-3 flex items-center gap-1.5">
            <MdEmail /> {user.email}
          </p>
          <div className="mb-3 flex items-center justify-between text-sm">
            <span>Role:</span>
            <span className="font-medium flex items-center gap-1"><FaUserCog /> {user.role}</span>
          </div>
          <div className="mb-4 flex items-center justify-between text-sm">
             <span>Status:</span>
             <StatusBadge status={user.status} />
          </div>
        </div>
        <div className="mt-4 flex gap-3 justify-end border-t pt-4">
          <button
            className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-900 text-sm font-medium flex items-center gap-1.5 transition-colors duration-150 disabled:opacity-50"
            onClick={()=> navigate(`/UserDetail/${user._id}`)}
          >
            <FaUserCheck /> See details
          </button>
        </div>
      </div>
  );

 const TenantCard = ({ item: user }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-5 flex flex-col justify-between h-full border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div>
        <h2 className="text-xl font-semibold mb-2 truncate">{user.name}</h2>
        <p className="text-sm text-gray-600 mb-3 flex items-center gap-1.5">
          <MdEmail /> {user.email}
        </p>
        <div className="mb-3 flex items-center justify-between text-sm">
          <span>Role:</span>
          <span className="font-medium flex items-center gap-1"><FaUsers /> {user.role}</span>
        </div>
        <div className="mb-4 flex items-center justify-between text-sm">
           <span>Status:</span>
           <StatusBadge status={user.status} />
        </div>
      </div>
      <div className="mt-4 flex gap-3 justify-end border-t pt-4">
       <button
            className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-900 text-sm font-medium flex items-center gap-1.5 transition-colors duration-150 disabled:opacity-50"
            onClick={() => navigate(`/UserDetail/${user._id}`)}
          >See details</button>
      </div>
    </div>
  );

  const PropertyCard = ({ item: property }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-5 flex flex-col justify-between h-full border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div>
        <h2 className="text-xl font-semibold mb-2 truncate">{property?.title}</h2>
        <p className="text-sm text-gray-600 mb-2">{property?.location}</p>
        <p className="text-sm text-gray-500 mb-3">Listed by: {property?.author?.userName || 'N/A'}</p>
         <div className="mb-2 flex items-center justify-between text-sm">
            <span>Price:</span>
            <span className="font-medium flex items-center gap-1"><MdAttachMoney />{property.price?.toLocaleString() || 'N/A'}</span>
          </div>
        <div className="mb-4 flex items-center justify-between text-sm">
           <span>Status:</span>
           <StatusBadge status={property.status} />
        </div>
      </div>
      <div className="mt-4 flex gap-3 justify-end border-t pt-4">
      <button
            className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-900 text-sm font-medium flex items-center gap-1.5 transition-colors duration-150 disabled:opacity-50"
            onClick={() => navigate(`/UserPropertyDetails/${property._id}`)}
          >
            <FaUserCheck /> See details
          </button>
      </div>
    </div>
  );

 const AllUserCard = ({ item: user }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-5 flex flex-col justify-between h-full border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div>
        <h2 className="text-xl font-semibold mb-2 truncate">{user.name}</h2>
        <p className="text-sm text-gray-600 mb-3 flex items-center gap-1.5">
           <MdEmail /> {user.email}
        </p>
        <div className="mb-3 flex items-center justify-between text-sm">
          <span>Role:</span>
          <span className="font-medium capitalize flex items-center gap-1">
            {user.role === 'landlord' ? <FaUserCog /> : (user.role === 'tenant' ? <FaUsers /> : <FaUserEdit />)}
            {user.role}
          </span>
        </div>
        <div className="mb-4 flex items-center justify-between text-sm">
           <span>Status:</span>
           <StatusBadge status={user.status} />
        </div>
      </div>
        {/* Add relevant actions for 'All Users' if needed, or keep it informational */}
         <div className="mt-4 flex gap-3 justify-end border-t pt-4 text-xs text-gray-400">
            User ID: {user._id} {/* Example info */}
         </div>
    </div>
  );


  // --- Tab Button Data ---
  const tabs = [
    { id: 'landlords', label: 'Landlords', icon: <FaUserCog /> },
    { id: 'tenant', label: 'Tenants', icon: <FaUsers /> },
    { id: 'properties', label: 'Properties', icon: <FaBuilding /> },
    { id: 'users', label: 'All Users', icon: <FaUsers /> } // Changed icon for variety maybe?
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 md:py-20">
      <div className="p-4 md:p-6 max-w-screen-xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">Admin Dashboard</h1>

         {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md text-center">
              {error}
            </div>
         )}

        {/* Tab Navigation */}
        <div className="mb-8 flex justify-center gap-2 md:gap-4 flex-wrap border-b border-gray-300 pb-4">
          {tabs.map((tabItem) => (
            <button
              key={tabItem.id}
              className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-md text-sm md:text-base font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                tab === tabItem.id
                  ? 'bg-blue-600 text-white shadow-md scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800 border border-gray-300'
              }`}
              onClick={() => setTab(tabItem.id)}
              aria-selected={tab === tabItem.id}
              role="tab"
            >
              {tabItem.icon}
              {tabItem.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="mt-6">
          {/* 🧑‍💼 Landlords */}
          {tab === 'landlords' && (
            <>
            {/* LandLord Status Filter */}
            <div className="flex gap-2 md:gap-4 mb-6 justify-center flex-wrap items-center">
                 <span className="text-sm font-medium text-gray-700 mr-2 hidden md:inline">Filter by Status:</span>
                {['all', 'pending', 'verified', 'rejected'].map((status) => (
                  <button
                    key={status}
                    className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium capitalize shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 ${
                      landlordStatusFilter === status
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                    onClick={() => setLandlordStatusFilter(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            {renderContent(loadingUsers, filteredLandlord, LandlordCard, "No landlords found.")} 
            </>
            )}

          {/* 👨‍💼 Tenants */}
          {tab === 'tenant' && renderContent(loadingUsers, tenants, TenantCard, "No tenants found.")}


          {/* 🏘 Properties */}
          {tab === 'properties' && (
            <>
              {/* Property Status Filter */}
              <div className="flex gap-2 md:gap-4 mb-6 justify-center flex-wrap items-center">
                 <span className="text-sm font-medium text-gray-700 mr-2 hidden md:inline">Filter by Status:</span>
                {['all', 'pending', 'verified', 'rejected'].map((status) => (
                  <button
                    key={status}
                    className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium capitalize shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 ${
                      propertyStatusFilter === status
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                    onClick={() => setPropertyStatusFilter(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
              {renderContent(loadingProperties, filteredProperties, PropertyCard, "No properties match the filter.")}
            </>
          )}

          {/* 👥 All Users */}
          {tab === 'users' && (
            <>
              {/* User Role Filter */}
              <div className="mb-6 flex justify-center items-center gap-3">
                <label htmlFor="userRoleFilter" className="font-medium text-gray-700 text-sm md:text-base flex items-center gap-1.5">
                    <FaFilter /> Filter by Role:
                </label>
                <select
                  id="userRoleFilter"
                  value={userRoleFilter}
                  onChange={(e) => setUserRoleFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Roles</option>
                  <option value="tenant">Tenant</option>
                  <option value="landlord">Landlord</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
               {renderContent(loadingUsers, filteredUsers, AllUserCard, "No users match the filter.")}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;