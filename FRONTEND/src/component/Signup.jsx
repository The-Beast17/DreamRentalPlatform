import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Axios } from '../axios/Axios';
import { useAuth } from '../context/AuthContext';
import statesAndCities from '../StatesAndCities.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Signup = () => {
    const { setIsAuthenticated, role: conntextRole, setRole } = useAuth();
    const [step, setStep] = useState(1);
    const [images, setImages] = useState([]);
    const { role } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
    } = useForm();

    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        const subscription = watch((value) => {
            if (value.state !== selectedState) {
                setSelectedState(value.state);
                setSelectedCity(''); // reset city on state change
            }
            if (value.city !== selectedCity) {
                setSelectedCity(value.city);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);


    const [backendError, setBackendError] = useState('');

    const currentIdProofType = watch('idProofType');

    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    const prevStep = () => {
        setStep(prevStep => prevStep - 1);
    };

    const submitHandler = async (data) => {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });
            images.forEach((image) => {
                formData.append('idProofImages', image);
            });

            const response = await Axios.post('/user/signup', formData, {
                withCredentials: true,
            });
            reset();
            setIsAuthenticated(true);
            setRole("user");
            localStorage.setItem("role", "user");
            localStorage.setItem("user", JSON.stringify(response.data.user));
            toast.success('Account created successfully!');
            <ToastContainer />  
            navigate('/Properties');
        } catch (err) {
            console.error('Signup error:', err);  // safer log
            const message = err?.response?.data?.message || 'Something went wrong. Please try again.';
            setBackendError(message);
        }
    };

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const renderStepOne = () => (
        <div className="space-y-4">
            {/* Hidden input for role */}
            <input type="hidden" {...register('role')} value={role} />

            <div>
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <i className="ri-user-3-fill"></i>
                    </div>
                    <input
                        type="text"
                        placeholder="Enter Full Name"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pl-10 sm:text-sm"
                        {...register('userName', {
                            required: { value: true, message: 'Please enter your name' },
                            minLength: { value: 2, message: 'Minimum length is 2' },
                            maxLength: { value: 30, message: 'Maximum length is 30' },
                        })}
                    />
                </div>
                {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>}
            </div>

            <div>
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <i className="ri-mail-line"></i>
                    </div>
                    <input
                        type="email"
                        placeholder="email@example.com"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pl-10 sm:text-sm"
                        {...register('email', {
                            required: { value: true, message: 'Please enter your email' },
                        })}
                    />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                {backendError && <p className="text-red-500 text-sm mt-1">{backendError}</p>}
            </div>

            <div>
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <i className="ri-lock-line"></i>
                    </div>
                    <input
                        type="password"
                        placeholder="Create Strong Password"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pl-10 sm:text-sm"
                        {...register('password', {
                            required: { value: true, message: 'Please enter the password' },
                            minLength: { value: 6, message: 'Minimum length is 6' },
                        })}
                    />
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex gap-4">
                <div className="relative rounded-md shadow-sm w-[90px]">
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-gray-500">
                        <i className="ri-phone-fill"></i>
                    </div>
                    <select
                        {...register('countryCode', {
                            required: { value: true, message: 'Please select your country code' },
                        })}
                        className="appearance-none block w-full px-1 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pl-10 sm:text-sm"
                    >
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+61">+61</option>
                        <option value="+81">+81</option>
                    </select>
                </div>

                <div className="relative rounded-md shadow-sm w-full">
                    <input
                        type="number"
                        placeholder="Mobile number"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        {...register('mobileNumber', {
                            required: { value: true, message: 'Please enter your mobile number' },
                            maxLength: { value: 10, message: 'Maximum length is 10' },
                            minLength: { value: 10, message: 'Minimum length is 10' },
                            pattern: { value: /^[0-9]{10}$/, message: 'Please enter a valid mobile number' },
                        })}
                        pattern={/^[0-9]{10}$/}
                    />
                </div>
            </div>
            {errors.countryCode && <p className="text-red-500 text-sm mt-1">{errors.countryCode.message}</p>}
            {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber.message}</p>}

            <div className="gender flex items-center space-x-4">
                <p className="text-gray-700">I am :</p>
                <label htmlFor="male" className="inline-flex items-center text-gray-700">
                    <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        {...register('gender', { required: 'Please select your gender' })}
                    />
                    <span className="ml-2">Male</span>
                </label>
                <label htmlFor="female" className="inline-flex items-center text-gray-700">
                    <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        {...register('gender', { required: 'Please select your gender' })}
                    />
                    <span className="ml-2">Female</span>
                </label>
                <label htmlFor="Other" className="inline-flex items-center text-gray-700">
                    <input
                        type="radio"
                        id="Other"
                        name="gender"
                        value="Other"
                        className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        {...register('gender', { required: 'Please select your gender' })}
                    />
                    <span className="ml-2">Other</span>
                </label>
            </div>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}

            <div className="flex space-x-4">
                <div className="w-1/2">
                    <select
                        {...register('state', { required: 'Please select your state' })}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={selectedState}
                        onChange={(e) => {
                            setSelectedState(e.target.value);
                            setSelectedCity(''); // clear city
                            setValue('state', e.target.value); // sync with form
                            setValue('city', ''); // reset city in form
                        }}
                    >
                        <option value="">State</option>
                        {Object.keys(statesAndCities).sort().map((state , idx) => (
                            <option key={idx} value={state}>
                                {state}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-1/2">
                    <select
                        {...register('city', { required: 'Please select your city' })}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={selectedCity}
                        onChange={(e) => {
                            setSelectedCity(e.target.value);
                            setValue('city', e.target.value); // sync with form
                        }}
                    >
                        <option value="">City</option>
                        {selectedState &&
                            statesAndCities[selectedState]?.sort().map((city , idx) => (
                                <option 
                                className='capitalize hover:bg-green-400'
                                key={idx} value={city}>
                                    {city}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
            {(errors.city || errors.state) && (
                <p className="text-red-500 text-sm mt-1 text-center">
                    Please select both state and city
                </p>
            )}


            {role === 'landlord' ?
                <button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline w-full"
                >
                    Next
                </button>
                :
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline w-full"
                >
                    Create Account
                </button>
            }
        </div>
    );

    const renderStepTwo = () => (
        <div className="space-y-4">
            <div className="mb-4">
                <label htmlFor="idProofType" className="block text-gray-700 text-sm font-bold mb-2">
                    Select ID Proof Type:
                </label>
                <select
                    {...register('idProofType', {
                        required: { value: true, message: 'Please select an ID proof type' },
                    })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">Select</option>
                    <option value="Aadhar">Aadhar</option>
                    <option value="Voter ID">Voter ID</option>
                    <option value="Passport">Passport</option>
                    <option value="Driving License">Driving License</option>
                </select>
                {errors.idProofType && (
                    <p className="text-red-500 text-xs italic">{errors.idProofType.message}</p>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="idNumber" className="block text-gray-700 text-sm font-bold mb-2">
                    Enter your Document ID Number ({currentIdProofType}):
                </label>
                <input
                    type="text"
                    id="idNumber"
                    placeholder={`Enter your ${currentIdProofType} number`}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...register('idProofNumber', {
                        required: { value: true, message: 'Please enter your ID number' },
                        pattern: { value: /^[a-zA-Z0-9]+$/, message: 'Please enter a valid ID number' },
                    })}
                />
                {errors.idNumber && (
                    <p className="text-red-500 text-xs italic">{errors.idNumber.message}</p>
                )}
            </div>

            <div>
                {images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                        {images.map((img, idx) => (
                            <img
                                key={idx}
                                src={URL.createObjectURL(img)}
                                alt="preview"
                                className="h-32 w-full object-cover rounded-md shadow-md"
                            />
                        ))}
                    </div>
                )}

                <label
                    htmlFor="idProofImages"
                    className="block text-sm font-medium text-gray-700 mt-4"
                >
                    Upload ID Proof Images ({currentIdProofType}):
                </label>
                <input
                    type="file"
                    id="idProofImages"
                    name="idProofImages"
                    multiple
                    accept="image/*"
                    required
                    onChange={handleImageChange}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
            </div>

            {backendError && <p className="text-red-500 text-sm mt-1">{backendError}</p>}

            <div className="flex justify-between mt-6">
                <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                >
                    Previous
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                >
                    Create Account
                </button>
            </div>
        </div>
    );

    return (
        <main className="bg-gray-100 min-h-screen flex items-center justify-center py-10 pt-24">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md relative">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create Account</h1>
                <p className="text-center text-sm text-gray-500 mb-4">Sign up as {role}</p>
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => navigate('/')}
                >
                    <i className="ri-close-line text-2xl"></i>
                </button>
                <hr className="mb-4" />

                <form onSubmit={handleSubmit(submitHandler)}>
                    {step === 1 && renderStepOne()}
                    {role === 'landlord' && step === 2 && renderStepTwo()}
                </form>

                <hr className="my-6" />
                <div className="text-center">
                    <p className="text-sm text-gray-600">Already have an account?</p>
                    <button
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        onClick={() => navigate(`/Login/${role}`)}
                    >
                        Login
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Signup;