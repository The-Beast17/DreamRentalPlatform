import React, { useEffect, useState } from 'react';
import '../App.css';
import '../media.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Axios } from '../axios/Axios';
import { useAuth } from '../context/AuthContext'; // adjust the path
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserCircle, FaSignOutAlt,FaArrowRight, FaBars, FaTimes, FaHeart, FaHome, FaBuilding, FaInfoCircle, FaPhone } from 'react-icons/fa'; // Using Font Awesome for icons

const Nav = ({ wheel}) => {
  const navigate = useNavigate();
  const [menuShow, setmenuShow] = useState(false);
  const [userData, setuserData] = useState(null)
  const { isAuthenticated, setIsAuthenticated ,role , setRole} = useAuth();

  

  useEffect(() => {
    const isAuth = async () => {
      if (role === "user"){
        try {
          const response = await Axios.get('/user/verify');
          const { authenticated, user } = response.data;
          setIsAuthenticated(authenticated);
          if (authenticated) {
            localStorage.setItem("user", JSON.stringify(user));
            setuserData(user);
          } else {
            localStorage.removeItem("user");
          }
        } catch (err) {
          console.error(err);
          setIsAuthenticated(false);
        }
      } else if (role === "admin") {
        try {
          const response = await Axios.get('/admin/verify');
          const { authenticated, admin } = response.data;
          setIsAuthenticated(authenticated);
          if (authenticated, admin) {
            localStorage.setItem("user", JSON.stringify(admin));
            setuserData(admin);
          } else {
            localStorage.removeItem("user");
          }
        } catch (err) {
          console.error(err);
          setIsAuthenticated(false);
        }
      }
    };
    isAuth();
  }, [role]);



/* Handle Logout*/
const handleLogout = async () => {
  try {
    toast.success("Logout Successfully");
    if (!userData) {
      console.error('No user data found');
      return; // Exit if userData is null or undefined
    }

    const endpoint = userData.role === "admin" ? "/admin/logout" : "/user/logout";
    const response = await Axios.get(endpoint, {
      withCredentials: true, // Important for sending cookies!
    });   
    
    setIsAuthenticated(false);
    setRole("");
    localStorage.removeItem("role");
    setmenuShow(false);
    navigate('/');
  } catch (err) {
    console.log("Logout error:", err);
  }
};


  /*handle show profile*/
  const handleShowProfile = () => {
    if (userData.role === "admin") {
      navigate('/AdminProfile')
    } else {
      navigate(`/Profile/${userData._id}`)
    }
  }


  return (
    <>
    <ToastContainer />
      <nav className={`${wheel === "up" ? "up" : "down"}`}>
        <div className='logo'>
          <h1>Dream-rental</h1>
        </div>

        <ul>
          <li><NavLink 
          className='nav-item no-underline font-semibold px-[5px] py-[7px] text-[15px] relative flex justify-center items-center gap-2' style={(e) => e.isActive ? { color: "teal", borderBottom: "2px solid teal" } : {}} to="/">
           <FaHome /> Home</NavLink></li>

          <li><NavLink 
          className=' nav-item  no-underline font-semibold px-[5px] py-[7px] text-[15px] relative flex justify-center items-center gap-2' style={(e) => e.isActive ? { color: "orange", borderBottom: "2px solid orange" } : {}} to="/Properties"> 
          <FaBuilding /> Properties</NavLink></li>

          <li><NavLink 
          className=' nav-item no-underline font-semibold px-[5px] py-[7px] text-[15px] relative flex justify-center items-center gap-2' style={(e) => e.isActive ? { color: "blue", borderBottom: "2px solid blue" } : {}} to="/About">
          <FaInfoCircle /> About</NavLink></li>

          <li><NavLink 
          className=' nav-item no-underline font-semibold px-[5px] py-[7px] text-[15px] relative flex justify-center items-center gap-2' style={(e) => e.isActive ? { color: "purple", borderBottom: "2px solid purple" } : {}} to="/Contact">
           <FaPhone /> Contact</NavLink></li>

          {role === 'admin' && userData &&
            <li><NavLink className='nav-item  no-underline font-semibold px-[5px] py-[7px] text-[15px] relative  flex justify-center items-center gap-2' style={(e) => e.isActive ? { color: "red", borderBottom: "2px solid red" } : {}} to="/AdminDashboard"> AdminDashboard</NavLink></li>
          }
          {role !== "admin" && 
          <li><NavLink className='nav-item  no-underline font-semibold px-[5px] py-[7px] text-[15px] relative  flex justify-center items-center gap-2' style={(e) => e.isActive ? { color: "pink", borderBottom: "2px solid pink" } : {}} to="/WishList"><FaHeart /> WishList</NavLink></li>
          }
        </ul>

        {isAuthenticated && userData ? (
             <div className="hidden md:flex items-center space-x-3">
               <div
                 className="flex items-center gap-2 hover:text-gray-900 hover:bg-gray-100 duration-200 px-3 py-2 rounded-full cursor-pointer"
                 onClick={handleShowProfile}
               >
                 <FaUserCircle className="h-5 w-5 text-gray-500" />
                 <span className="text-sm">{userData.userName}</span>
               </div>
               <button
                 className={`bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-full transition duration-200 text-sm`}
                 onClick={handleLogout}
               >
                 <FaSignOutAlt className="inline-block mr-1" /> Logout
               </button>
             </div>
           ) : (
             <div className="hidden md:block">
               <button
                 className={`bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-full transition duration-200 text-sm`}
                 onClick={() => {
                   navigate('/Authentication');
                 }}
               >
                 Register <FaArrowRight className="inline-block ml-1" />
               </button>
             </div>
           )}

        <i className="ri-menu-line text-2xl md:hidden" onClick={() => setmenuShow(!menuShow)}></i>
      </nav>

      {
        <div className={`h-screen w-[80%] fixed top-0 ${menuShow ? 'translate-x-0' : '-translate-x-full'} duration-500 bg-gray-800 z-[100] shadow-lg`}>
          <div className="p-5 text-white flex justify-between items-center border-b border-gray-700">
            <h1 className='text-xl font-bold'>Dream Rental</h1>
            <i className="ri-close-line text-2xl cursor-pointer" onClick={() => setmenuShow(!menuShow)}></i>
          </div>


          {isAuthenticated && userData &&
            <div className='profile items-center gap-3 flex bg-zinc-500 px-5 py-3 hover:bg-zinc-700 cursor-pointer ' onClick={() => { handleShowProfile(), setmenuShow(!menuShow) }}>
              <img src="https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png"
                className='profile-img h-8 w-8 rounded-full' />
              <span className='hover:text-green-400'>{userData.userName}</span>
            </div>}

          <ul className='w-full flex flex-col gap-4 p-5  items-center'>
            <NavLink className='flex items-center gap-4 text-white text-lg w-full py-2 px-5 hover:bg-zinc-500' style={(e) => e.isActive ? { color: "teal", backgroundColor: "white", borderBottom: "2px solid teal" } : {}} onClick={() => setmenuShow(!menuShow)} to="/"><FaHome />Home</NavLink>
            <NavLink className='flex items-center gap-4 text-white text-lg w-full py-2 px-5 hover:bg-zinc-500' style={(e) => e.isActive ? { color: "teal", backgroundColor: "white", borderBottom: "2px solid teal" } : {}} onClick={() => setmenuShow(!menuShow)} to="/Properties"><FaBuilding />Properties</NavLink>
            <NavLink className='flex items-center gap-4 text-white text-lg w-full py-2 px-5 hover:bg-zinc-500' style={(e) => e.isActive ? { color: "teal", backgroundColor: "white", borderBottom: "2px solid teal" } : {}} onClick={() => setmenuShow(!menuShow)} to="/About"> <FaInfoCircle />About</NavLink>
            <NavLink className='flex items-center gap-4 text-white text-lg w-full py-2 px-5 hover:bg-zinc-500' style={(e) => e.isActive ? { color: "teal", backgroundColor: "white", borderBottom: "2px solid teal" } : {}} onClick={() => setmenuShow(!menuShow)} to="/Contact">  <FaPhone />Contact</NavLink>
            {role === 'admin' &&
            <NavLink className='flex items-center gap-4 text-white text-lg w-full py-2 px-5 hover:bg-zinc-500' style={(e) => e.isActive ? { color: "teal", borderBottom: "2px solid teal" } : {}} to="/AdminDashboard">AdminDashboard</NavLink>
           }
            {role !== "admin" &&
              <NavLink className='flex items-center gap-4 text-white text-lg w-full py-2 px-5 hover:bg-zinc-500' style={(e) => e.isActive ? { color: "teal", backgroundColor: "white", borderBottom: "2px solid teal" } : {}} onClick={() => setmenuShow(!menuShow)} to="/WishList"> <FaHeart /> WishList</NavLink>
            }
          </ul>


          {isAuthenticated && userData ?
            <div className='px-5'>
              <button
                className='w-full border bg-red-600 text-white px-5 py-2 rounded-[25px] hover:bg-red-800 hover:text-black' onClick={() => handleLogout()}><FaSignOutAlt className="inline-block mr-1" /> Logout
              </button>
            </div> :

            <div className='flex gap-5 justify-center items-center px-3 '>
              <button className='bg-white px-16 py-3 rounded-[25px] hover:bg-zinc-400  font-bold flex gap-3' onClick={() => { navigate('/Authentication'), setmenuShow(false) }}>Register <i className="ri-arrow-right-line"></i></button>
            </div>
          }
        </div>
      }
    </>
  )
}

export default Nav

