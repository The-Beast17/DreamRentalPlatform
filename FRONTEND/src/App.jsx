import React, { useState } from 'react'
import Nav from './component/Nav'
import { Route, Routes } from 'react-router-dom'
import Signup from './component/Signup'
import Properties from './component/Properties'
import About from './component/About'
import Home from './component/Home'
import Contact from './component/Contact'
import Footer from './component/Footer'
import Login from './component/Login'
import Profile from './component/Profile'
import CreatePost from './component/CreatePost'
import PropertyDetail from './component/PropertyDetail'
import Authentication from './component/Authentication'
import AdminLogin from './component/AdminLogin'
import AdminProfile from './component/AdminProfile'
import UserProtectedRoute from './PrivateRoute/UserProtectedRoute'
import AdminProtectedRoute from './PrivateRoute/AdminProtectedRoute'
import SharedProtectedRoute from './PrivateRoute/SharedProtectedRoute'
import Unauthorized from './component/Unauthorized'
import EditUserProfile from './component/EditUserProfile'
import EditProperty from './component/EditProperty'
import AdminDashboard from './component/AdminDashboard'
import UserDetail from './component/UserDetail'
import UserPropertyDetails from './component/UserPropertyDetails'
import UserProperties from './component/UserProperties'
import WishList from './component/WishList'

const App = () => {
  const [wheel, setwheel] = useState()
  const handleWheel = (e) => {
    if (e.deltaY > 0) {
      setwheel("up");
    } else {
      setwheel("down");
    }
  }
  return (
    <>
      <main onWheel={handleWheel}>
        <Nav wheel={wheel} />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* user protected route */}
          <Route element={<UserProtectedRoute />} >
            <Route path="/Wishlist" element={<WishList />} />
            <Route path="/Profile/:id" element={<Profile />} />
            <Route path="/CreatePost" element={<CreatePost />} />
            <Route path="/EditUserProfile" element={<EditUserProfile />} />
          </Route>

          {/* open route  */}
          <Route path="/Authentication" element={<Authentication />} />
          <Route path="/Login/:role" element={<Login />} />
          <Route path="/Signup/:role" element={<Signup />} />
          <Route path="/AdminLogin/:role" element={<AdminLogin />} />
          <Route path="/Unauthorized" element={<Unauthorized />} />
          <Route path="/About" element={<About />} />


          {/* admin Protected route*/}
          <Route element={<AdminProtectedRoute />} >
            <Route path="/AdminProfile" element={<AdminProfile />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/UserDetail/:id" element={<UserDetail />}>
              <Route path="UserProperties" element={<UserProperties />} />
            </Route>
            <Route path="/UserPropertyDetails/:id" element={<UserPropertyDetails />} />
          </Route>

          {/* shared routes both for  admin and user */}
          <Route element={<SharedProtectedRoute />} >
            <Route path="/Properties" element={<Properties />} />
            <Route path="/PropertyDetail/:id" element={<PropertyDetail />} />
            <Route path="/EditProperty/:id" element={<EditProperty />} />
            <Route path="/Contact" element={<Contact />} />
          </Route>



        </Routes>
        <Footer />
      </main>
    </>
  )
}

export default App