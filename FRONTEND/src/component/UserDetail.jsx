import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { Axios } from "../axios/Axios";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the state
  const toggleProperties = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await Axios.get(`/user/getUser/${id}`);
        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdateStatus = async (newStatus) => {
    try {
      setUpdateError(null);
      setUpdateSuccess(null);
      const res = await Axios.put(`/admin/updateUserStatus/${id}`, { status: newStatus });
      setUser(res.data.user); // Update the local state with the new user data
      setUpdateSuccess(`User status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating user status:", error);
      setUpdateError("Failed to update user status.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-red-200 border border-red-500 text-red-700 px-6 py-4 rounded-md shadow-lg" role="alert">
          <strong className="font-bold">Oops!</strong>
          <span className="block sm:inline">User not found with ID: {id}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8 pt-24">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-5xl">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-20 h-20 rounded-full overflow-hidden shadow-md mr-4">
                <img
                  src={"https://images.unsplash.com/photo-1741762764258-8f9348bdf186?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                  alt={`${user.userName}'s Profile`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{user.userName}</h2>
                <p className="text-sm text-gray-500">User ID: {id}</p>
              </div>
            </div>
            <button onClick={() => window.history.back()} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none flex items-center">
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back
            </button>
          </div>
          <div className="mb-6 text-center">
          <span className="text-xl font-semibold bg-green-600 rounded text-white px-4 py-2 mb-4">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
          </div>
          {updateError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">{updateError}</span>
            </div>
          )}

          {updateSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline">{updateSuccess}</span>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-8">
            <DetailCard title="Email" value={user.email} icon={<svg className="h-5 w-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-7 2v4m-7-4v4m-5 8h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} />
            <DetailCard title="Mobile" value={`${user.countryCode || ''} ${user.mobileNumber || 'N/A'}`} icon={<svg className="h-5 w-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1c-1.03 0-2-.97-2-2v-3.432a1 1 0 01-.586-.814l-4.491-1.497a1 1 0 01-.814-.587v-3.457a1 1 0 01.586-.814l4.491-1.497a1 1 0 01.814-.587V5a2 2 0 012-2z" /></svg>} />
            <DetailCard title="Gender" value={user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'N/A'} icon={<svg className="h-5 w-5 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-2.828 2.828m0 0l-2.828-2.828m2.828 2.828V13.5m-5 3.5c-2.536 0-4.5-1.964-4.5-4.5S6.964 9.5 9.5 9.5c2.536 0 4.5 1.964 4.5 4.5v3.5m-5-3.5c0 2.536 1.964 4.5 4.5 4.5s4.5-1.964 4.5-4.5S15.036 9.5 12.5 9.5v3.5" /></svg>} />
            <DetailCard title="State" value={user.state || 'N/A'} icon={<svg className="h-5 w-5 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14-4l-6-6m0 0l-6 6m6-6v14" /></svg>} />
            <DetailCard title="City" value={user.city || 'N/A'} icon={<svg className="h-5 w-5 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l-2 1m0 0l-2-1m2 1v2m-11-2h14M5 12a2 2 0 01-2-2V8a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 01-2 2M5 12h14l-2 2m-2-2l-2 2" /></svg>} />
            <DetailCard title="Role" value={user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'N/A'} icon={<svg className="h-5 w-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l-9-5m9 5l9-5M3 9l9 5-9 5-3-2m3 2l6-3m-6 3l3-1" /></svg>} />
            <DetailCard title="ID Proof Type" value={user.idProofType || 'N/A'} icon={<svg className="h-5 w-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5l7 7m-7 0l7-7m-4 6h3m-9-4h3m2-2H5m-2 4h14m-2-2h-4" /></svg>} />
            <DetailCard title="ID Proof Number" value={user.idProofNumber || 'N/A'} icon={<svg className="h-5 w-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7v12m10-7l7-7m0 0l-7-7m7 7v12" /></svg>} />
            <DetailCard title="Status" value={user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'N/A'} icon={<svg className={`h-5 w-5 mr-2 text-${user.status === 'verified' ? 'green' : user.status === 'pending' ? 'yellow' : 'red'}-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
          </div>

          {user.idProofImages && user.idProofImages.length > 0 && (
            <div className="mb-8 border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">ID Proof Images</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {user.idProofImages.map((image, index) => (
                  <div key={index} className="relative rounded-md overflow-hidden shadow-md group hover:shadow-lg transition-shadow duration-300">
                    <img
                      src={image.url}
                      alt={`ID Proof ${index + 1}`}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href={image.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-sm font-semibold bg-blue-600 px-3 py-2 rounded hover:bg-blue-700"
                      >
                        View
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 pt-6 flex justify-end gap-2">
            {user.role !== 'tenant' && user.status !== 'verified' && (
              <button
                onClick={() => handleUpdateStatus('verified')}
                className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none"
              >
                Verify
              </button>
            )}
            {user.status !== 'rejected' && (
              <button
                onClick={() => handleUpdateStatus('rejected')}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none"
              >
                Reject
              </button>
            )}
            {user.status !== 'pending' && (
              <button
                onClick={() => handleUpdateStatus('pending')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none"
              >
                Set Pending 
              </button>
            )}

            {user.status !== 'blocked' && (
              <button
                onClick={() => handleUpdateStatus('blocked')}
                className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none"
              >
                Block
              </button>
            )}
          </div>

        </div>
        {user.role === 'landlord' && 
        <div className="py-6 w-full flex justify-center">
          <Link
            to={`UserProperties`}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none"
          >
            See All Properties
          </Link>
        </div>
        }
      </div>
      <Outlet/> 
    </div>
    
  );
};

const DetailCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-lg shadow-sm p-4">
    <div className="flex items-center mb-2">
      {icon}
      <h3 className="text-lg font-medium text-gray-700">{title}</h3>
    </div>
    <p className="text-gray-800">{value || 'N/A'}</p>
  </div>
);

export default UserDetail;