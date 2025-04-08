import React, { useState } from 'react'
import Nav from './component/Nav'
import { Route, Routes } from 'react-router-dom'
import Signup from './component/Signup'
import Properties from './component/Properties'
import About from './component/About'
import Home from './component/Home'
import Contact from './component/Contact'
import Footer from './component/Footer'
import ProtectedRoute from './PrivateRoute/ProtectedRoute'
import Login from './component/Login'
import Profile from './component/Profile'
import CreatePost from './component/CreatePost'
import PropertyDetail from './component/PropertyDetail'
import Cart from './component/Cart'

const App = () => {
  const [IsAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true"); 
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
        <Nav wheel={wheel} setIsAuthenticated={setIsAuthenticated} IsAuthenticated={IsAuthenticated}  />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<ProtectedRoute />} >
            <Route path="/Properties" element={<Properties />} />
            <Route path="/About" element={<About />} />
            <Route path="/Cart" element={<Cart/>} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/CreatePost" element={<CreatePost />} />
            <Route path="/PropertyDetail/:id" element={<PropertyDetail />} />
          </Route>

          <Route path="/Login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/Signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
        <Footer />
      </main>
    </>
  )
}

export default App