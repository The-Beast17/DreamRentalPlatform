import React from 'react'
import { NavLink } from 'react-router-dom'

const Menu = ({setloginShow,setsignupShow, onClose,menuShow}) => {
  return (
    <div className={`menu-bar ${menuShow ? "open" : ""}`}>
        <div className='heading'>
            <h1>Menu</h1>
            <i className="ri-close-large-line"
            onClick={onClose}></i>
        </div>
        <hr />
        <ul>
        <li><NavLink className='menu-item' style={(e)=> e.isActive ? {backgroundColor:"teal", color:"white"} : {}} to="/">Home</NavLink></li>
        <li><NavLink className='menu-item' style={(e)=> e.isActive ? {backgroundColor:"teal", color:"white"}: {}} to="/Properties">Properties</NavLink></li>
        <li><NavLink className='menu-item' style={(e)=> e.isActive ? {backgroundColor:"teal", color:"white"}: {}} to="/About">About</NavLink></li>
        <li><NavLink className='menu-item' style={(e)=> e.isActive ? {backgroundColor:"teal", color:"white"}: {}} to="/Pages">Pages</NavLink></li>
        <li><NavLink className='menu-item' style={(e)=> e.isActive ? {backgroundColor:"teal", color:"white"}: {}} to="/Contact">Contact</NavLink></li>
       </ul>
       <div className='acc'>
        <button className='btn' onClick={()=>{setloginShow(true) , setsignupShow(false)}} >Login</button>
        <p>|</p>
        <button className='btn' onClick={()=>{setsignupShow(true), setloginShow(false)}}>Signup</button>
       </div>      
    </div>
  )
}

export default Menu