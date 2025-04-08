import React, { useState, useEffect } from 'react';
import { use } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {Axios} from '../axios/Axios';
// import data from "../../../BACKEND/uploads/images"

const Profile = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [posts, setposts] = useState(null)
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await Axios.get(`/post/getPosts`);
                console.log(response.data)
                setposts(response.data);
            }catch (error) {
                console.error("Error fetching posts:", error);
             }
        }
        fetchPost();
    }, []);

    if (!user) {
        return <div className="text-center py-8">Loading...</div>;
    }

    return (
        <div className="w-full  mx-auto md:px-10 px-3 sm:p-8 md:pt-24 pt-24 bg-[#effcfc] rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-8 bg-zinc-900 md:p-10">
                <div className="flex flex-col sm:flex-row items-center p-5 pt-24 sm:pt-0 md:gap-5 ">
                    <img
                        src={"/src/images/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"}
                        alt="Profile"
                        className="w-28 h-28 rounded-full object-cover mb-4 sm:mb-0 sm:mr-6 border-2 border-indigo-200"
                    />
                    <div className="text-center sm:text-left">
                        <h2 className="text-2xl font-semibold text-gray-200 mb-2">{user.userName}</h2>
                        <div className="flex flex-col gap-1">
                            <a href={`mailto:${user.email}`} className="text-gray-400 hover:text-indigo-600">{user.email}</a>
                            <a href={`tel:${user.phone}`} className="text-gray-400 hover:text-indigo-600"> {user.mobileNumber}</a>
                            <span className="text-gray-400">Location: {user.city} , {user.state}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">About Me</h3>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors mb-4">Add bio</button>
                <p className="text-gray-700 leading-relaxed">{user.bio}</p>
            </div>

            <div className='w-full text-center mb-8'>
                <Link to={'/CreatePost'}
                    className='py-2 px-4 text-bold bg-teal-600 hover:bg-teal-700 duration-200 text-white rounded mx-auto'>ADD PROPERTY</Link>
            </div>

            <div className="mb-8 ">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Properties Listed</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                    {posts && posts.map((property) => (
                        <div key={property._id}
                         className="bg-gray-50 cursor-pointer rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                         onClick={()=>navigate(`/PropertyDetail/${property._id}`)}>
                            <img src={`http://localhost:5000${property.images[0]}`} alt={property.title} className="w-full h-80 object-cover" />
                            <div className="p-4">
                                <h4 className="text-lg font-semibold text-gray-800">{property.title}</h4>
                                <p className="text-gray-600">{property.location}</p>
                                <p className="text-indigo-600 font-medium mt-2">₹{property.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Reviews</h3>
                <div className="space-y-4">
                    {/* {user.reviews.map((review) => (
                        <div key={review.id} className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                            <div className="flex items-center mb-2">
                                <strong className="font-medium text-gray-800 mr-2">{review.reviewer}</strong>
                                <div className="flex text-yellow-500">
                                    {Array(review.rating).fill().map((_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                        </div>
                    ))} */}
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Message</h3>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Send a Message</label>
                        <textarea
                            id="message"
                            rows="4"
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Write your message here..."
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;