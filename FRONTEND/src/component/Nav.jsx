import React, { useEffect, useState } from 'react';
import '../App.css';
import '../media.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Axios } from '../axios/Axios';



const Nav = ({ wheel, setIsAuthenticated, IsAuthenticated }) => {
  const navigate = useNavigate();
  const [menuShow, setmenuShow] = useState(false);
  const [userData, setuserData] = useState(null)

  useEffect(() => {
    const isAuth = async () => {
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
    };
    isAuth();
  }, []);


  /// Logout function
  const handleLogout = async () => {
    console.log('logout')
    try {
      const response = await Axios.get('/user/logout');
      console.log(response.data)
      // localStorage.removeItem("isAuthenticated");
      setIsAuthenticated(false)
      setmenuShow(false);
      navigate('/');
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <nav className={`${wheel === "up" ? "up" : "down"}`}>
        <div className='logo'>
          <h1>Dream-rental</h1>
        </div>

        <ul>
          <li><NavLink className='nav-item' style={(e) => e.isActive ? { color: "teal", borderBottom: "2px solid teal" } : {}} to="/">Home</NavLink></li>
          <li><NavLink className='nav-item' style={(e) => e.isActive ? { color: "teal", borderBottom: "2px solid teal" } : {}} to="/Properties">Properties</NavLink></li>
          <li><NavLink className='nav-item' style={(e) => e.isActive ? { color: "teal", borderBottom: "2px solid teal" } : {}} to="/About">About</NavLink></li>
          <li><NavLink className='nav-item' style={(e) => e.isActive ? { color: "teal", borderBottom: "2px solid teal" } : {}} to="/Pages">Pages</NavLink></li>
          <li><NavLink className='nav-item' style={(e) => e.isActive ? { color: "teal", borderBottom: "2px solid teal" } : {}} to="/Contact">Contact</NavLink></li>
        </ul>


        {IsAuthenticated && userData ?
          <div className='hidden md:flex gap-3'>
            <div className='profile items-center gap-3 flex' onClick={() => { navigate('/Profile') }}>
              <img src="https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png"
                className='profile-img h-8 w-8 rounded-full border border-zinc-500' />
              <span>{userData.userName}</span>
            </div>
            <button
              className='border text-white px-3 py-1 rounded-[25px] hover:bg-white hover:text-black' onClick={() => handleLogout()}>Logout
            </button>
          </div> :

          <div className='acc'>
            <button className='btn' onClick={() => { navigate('/Login') }} >Login</button>
            <p>|</p>
            <button className='btn' onClick={() => { navigate('/Signup') }}>Signup</button>
          </div>
        }

        <i className="ri-menu-line text-2xl md:hidden" onClick={() => setmenuShow(!menuShow)}></i>
      </nav>

      {
        <div className={`h-screen w-[80%] fixed top-0 ${menuShow ? 'translate-x-0' : '-translate-x-full'} duration-500 bg-gray-800 z-[100] shadow-lg`}>
          <div className="p-5 text-white flex justify-between items-center border-b border-gray-700">
            <h1 className='text-xl font-bold'>Dream Rental</h1>
            <i className="ri-close-line text-2xl cursor-pointer" onClick={() => setmenuShow(!menuShow)}></i>
          </div>


          {IsAuthenticated && userData &&
            <div className='profile items-center gap-3 flex bg-zinc-500 px-5 py-3' onClick={() => { navigate('/Profile') }}>
              <img src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className='profile-img h-8 w-8 rounded-full' />
              <span>{userData.userName}</span>
            </div>}

          <ul className='w-full flex flex-col gap-4 p-5  items-center'>
            <NavLink className='list-item text-white text-lg w-full py-2 px-5 hover:bg-zinc-500' style={(e) => e.isActive ? { color: "teal", backgroundColor: "white", borderBottom: "2px solid teal" } : {}} onClick={() => setmenuShow(!menuShow)} to="/">Home</NavLink>
            <NavLink className='list-item text-white text-lg w-full py-2 px-5 hover:bg-zinc-500' style={(e) => e.isActive ? { color: "teal", backgroundColor: "white", borderBottom: "2px solid teal" } : {}} onClick={() => setmenuShow(!menuShow)} to="/Properties">Properties</NavLink>
            <NavLink className='list-item text-white text-lg w-full py-2 px-5 hover:bg-zinc-500' style={(e) => e.isActive ? { color: "teal", backgroundColor: "white", borderBottom: "2px solid teal" } : {}} onClick={() => setmenuShow(!menuShow)} to="/About">About</NavLink>
            <NavLink className='list-item text-white text-lg w-full py-2 px-5 hover:bg-zinc-500' style={(e) => e.isActive ? { color: "teal", backgroundColor: "white", borderBottom: "2px solid teal" } : {}} onClick={() => setmenuShow(!menuShow)} to="/Pages">Pages</NavLink>
            <NavLink className='list-item text-white text-lg w-full py-2 px-5 hover:bg-zinc-500' style={(e) => e.isActive ? { color: "teal", backgroundColor: "white", borderBottom: "2px solid teal" } : {}} onClick={() => setmenuShow(!menuShow)} to="/Contact">Contact</NavLink>
          </ul>


          {IsAuthenticated ?
            <div className='px-5'>
              <button
                className='w-full border text-white px-5 py-2 rounded-[25px] hover:bg-white hover:text-black' onClick={() => handleLogout()}>Logout
              </button>
            </div> :

            <div className='flex gap-5 justify-center items-center px-3 '>
              <button className='bg-white px-5 py-2 rounded-[25px] hover:bg-zinc-400' onClick={() => { navigate('/Login') }} >Login</button>
              <p className='text-white'>|</p>
              <button className='border text-white px-5 py-2 rounded-[25px] hover:bg-white hover:text-black' onClick={() => { navigate('/Signup') }}>Signup</button>
            </div>
          }
        </div>
      }
    </>
  )
}

export default Nav