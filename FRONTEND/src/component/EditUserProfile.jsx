import React, { useState, useEffect } from 'react';
import { Axios } from '../axios/Axios';
import { useNavigate } from 'react-router-dom';
import statesAndCities from '../StatesAndCities.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const EditUserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: '',
    email: '',
    mobileNumber: '',
    gender: '',
    state: '',
    city: '',
    password: '',
    confirmPassword: '',
    role: '',
    idProofType: '',
    idProofNumber: '',
  });



  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [images, setImages] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await Axios.get('/user/me');
        const { user: fetchedUser } = response.data;
        setUser({
          ...fetchedUser,
          password: '',
          confirmPassword: '',
          idProofType: fetchedUser.idProofType || '',
          idProofNumber: fetchedUser.idProofNumber || '',
        });

        // 🔥 Set cities for the fetched state
        if (fetchedUser.state) {
          const stateCities = statesAndCities[fetchedUser.state] || [];
          setCities(stateCities);
        }


        localStorage.setItem('user', JSON.stringify(fetchedUser));
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'state') {
      const stateCities = statesAndCities[value] || [];
      setCities(stateCities);
      setUser((prev) => ({
        ...prev,
        state: value,
        city: '', // Reset city when state changes
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    setApiError('');
  };


  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!user.userName.trim()) newErrors.userName = 'Username is required';
    if (!user.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(user.email)) newErrors.email = 'Invalid email format';
    if (!user.mobileNumber) newErrors.mobileNumber = 'Mobile number is required';
    else if (!/^\d{10}$/.test(user.mobileNumber)) newErrors.mobileNumber = 'Invalid mobile number';
    if (!user.gender) newErrors.gender = 'Gender is required';
    if (!user.state) newErrors.state = 'State is required';
    if (!user.city) newErrors.city = 'City is required';

    if (showPasswordFields && (user.password || user.confirmPassword)) {
      if (user.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      if (user.password !== user.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }

    if (user.role === 'landlord') {
      if (!user.idProofType) newErrors.idProofType = 'Please select ID proof type';
      if (!user.idProofNumber) newErrors.idProofNumber = 'ID proof number is required';
      if (images.length === 0 && (!user.idProofImages || user.idProofImages.length === 0)) {
        newErrors.idProofImages = "Please upload at least one ID proof image.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('userName', user.userName);
      formData.append('email', user.email);
      formData.append('mobileNumber', user.mobileNumber);
      formData.append('gender', user.gender);
      formData.append('state', user.state);
      formData.append('city', user.city);
      if (showPasswordFields && user.password) {
        formData.append('password', user.password);
        formData.append('confirmPassword', user.confirmPassword);
      }
      if (user.role === 'landlord') {
        formData.append('idProofType', user.idProofType);
        formData.append('idProofNumber', user.idProofNumber);

        if (images.length > 0) {
          images.forEach((img) => formData.append('idProofImages', img));
        } else if (user.idProofImages?.length > 0) {
          user.idProofImages.forEach((img) => formData.append('idProofImages', img));
        }
      }

      await Axios.put('/user/updateUser', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setApiError('');
      navigate(-1);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      setApiError(error.response?.data?.message || 'Something went wrong while updating your profile.');
    } finally {
      setLoading(false); // 👈 Loader hatao
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center pt-24 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="p-8 w-full max-w-4xl bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Edit Profile</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {apiError && <p className="text-red-500 text-sm text-center">{apiError}</p>}

          <div className="form-group">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700">Username</label>
            <input type="text" name="userName" value={user.userName} onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
              placeholder="Enter your username" />
            {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
            <input type="email" name="email" value={user.email} onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
              placeholder="Enter your email" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Mobile Number */}
          <div className="form-group">
            <label htmlFor="mobileNumber" className="block text-sm font-semibold text-gray-700">Mobile Number</label>
            <input type="number" name="mobileNumber" value={user.mobileNumber} onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
              placeholder="Enter your mobile number" />
            {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber}</p>}
          </div>

          {/* Gender */}
          <div className="form-group">
            <label className="block text-sm font-semibold text-gray-700">Gender</label>
            <div className="mt-2 flex space-x-4">
              {['male', 'female', 'other'].map((g) => (
                <label key={g} className="flex items-center">
                  <input type="radio" name="gender" value={g} checked={user.gender === g} onChange={handleChange}
                    className="form-radio text-indigo-600" />
                  <span className="ml-2 capitalize">{g}</span>
                </label>
              ))}
            </div>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>

          {/* State and City */}
          <div className="form-group flex flex-col sm:flex-row sm:space-x-4">
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-semibold text-gray-700">State</label>
              <select name="state" value={user.state} onChange={handleChange}
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm">
                <option value="">State</option>
                {Object.keys(statesAndCities)?.sort().map((state, idx) => (
                  <option key={idx} value={state}>{state}</option>
                ))}
              </select>
              {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
            </div>

            <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
              <label className="block text-sm font-semibold text-gray-700">City</label>
              <select name="city" value={user.city} onChange={handleChange}
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm">
                <option value="">City</option>
                {cities.map((city, idx) => (
                  <option key={idx} value={city}>{city}</option>
                ))}
              </select>
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>
          </div>

          {/* Conditionally Render Landlord Section */}
          {user.role === 'landlord' && (
            <div className="landlord-section space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Select ID Proof Type</label>
                <select
                  name="idProofType"
                  value={user.idProofType}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                >
                  <option value="">Select</option>
                  <option value="Aadhar">Aadhar</option>
                  <option value="Voter ID">Voter ID</option>
                  <option value="Passport">Passport</option>
                  <option value="Driving License">Driving License</option>
                </select>
                {errors.idProofType && <p className="text-red-500 text-sm">{errors.idProofType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Enter your Document ID Number ({user.idProofType || 'ID'}):
                </label>
                <input
                  type="text"
                  name="idProofNumber"
                  value={user.idProofNumber}
                  onChange={handleChange}
                  placeholder={`Enter your ${user.idProofType || 'ID'} number`}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                />
                {errors.idProofNumber && <p className="text-red-500 text-sm">{errors.idProofNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mt-4">Upload ID Proof Images</label>
                <input
                  type="file"
                  name="idProofImages"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {errors.idProofImages && <p className="text-red-500 text-sm">{errors.idProofImages}</p>}

                {(user.idProofImages?.length > 0 || images.length > 0) && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                    {user.idProofImages?.map((img, idx) => (
                      <img
                        key={`existing-${idx}`}
                        src={img.url}
                        alt="Uploaded ID Proof"
                        className="h-32 w-full object-cover rounded-md shadow-md"
                      />
                    ))}
                    {images.map((img, idx) => (
                      <img
                        key={`new-${idx}`}
                        src={URL.createObjectURL(img)}
                        alt="Preview"
                        className="h-32 w-full object-cover rounded-md shadow-md"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowPasswordFields(!showPasswordFields)}
            className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg shadow-md hover:bg-gray-300"
          >
            {showPasswordFields ? 'Cancel Password Change' : 'Change Password'}
          </button>

          {showPasswordFields && (
            <>
              <div className="form-group">
                <label className="block text-sm font-semibold text-gray-700">New Password</label>
                <input type="password" name="password" value={user.password} onChange={handleChange}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                  placeholder="Enter new password (optional)" />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <div className="form-group">
                <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
                <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                  placeholder="Confirm new password" />
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>
            </>
          )}

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              ) : null}
              {loading ? 'Updating...' : 'Update Profile'}

            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default EditUserProfile;
