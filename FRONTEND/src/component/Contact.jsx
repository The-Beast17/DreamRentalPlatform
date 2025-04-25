import React, { useState } from 'react';
import {Axios} from '../axios/Axios';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const Contact = () => {
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [subject, setSubject] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await Axios.post('/contact/contactMessage', {
        fullName,
        emailAddress,
        subject,
        messageContent
      });
      setFullName('');
      setEmailAddress('');
      setSubject('');
      setMessageContent('');
      setShowModal(true);
    } catch (error) {
      console.log(error);
      alert(`Failed to send message \n ${error.response ? error.response.data.message : 'Unknown error'}`);
    }finally {
      setIsLoading(false);
    }
  };

  // loading spinner
  if (isLoading) {
              return (
                  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
                      <div className="relative w-28 h-28">
                          {/* Background spinner */}
                          <div className="absolute top-0 left-0 w-full h-full rounded-full border-[6px] border-t-blue-500 border-r-transparent border-b-blue-300 border-l-transparent animate-spin"></div>
      
                          {/* Centered Icon */}
                          <div className="absolute inset-0 flex items-center justify-center text-green-500">
                              <FaHome className="w-12 h-12 drop-shadow-md" />
                          </div>
      
                          {/* Loading Text */}
                          <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 text-gray-800 font-medium text-base tracking-wide animate-pulse whitespace-nowrap">
                              Please wait...
                          </div>
                      </div>
                  </div>
              );
          }
  


  return (
    <>
    <div className="bg-gray-200 min-h-screen flex items-center justify-center pt-24 pb-8">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Get in Touch</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="emailAddress"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email address"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter the subject"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="messageContent" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="messageContent"
              rows="5"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Write your message here"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>

    {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full text-center">
      <h2 className="text-2xl font-bold text-green-600 mb-2">Message Sent Successfully!</h2>
      <p className="text-gray-700">
        Thank you for contacting us. Our team will respond to your query via email 
        (from our official Gmail address) as soon as possible.
      </p>
      <button
        onClick={() => {
          setShowModal(false)
          navigate('/'); // Redirect to the home page or any other page
        }}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
       Ok
      </button>
    </div>
  </div>
)}

    </>
  );
};

export default Contact;
