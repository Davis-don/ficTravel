import React from 'react'
import './header.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import bLogo from '../../assets/blogo.png'
import { FaRegUser } from "react-icons/fa";
import { CiShoppingBasket } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import useFormStore from '../../store/userFormStore';
import useUserStore from '../../store/userStore';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
function Header() {
    const [authLog,setAuthLog] = useState(false)
    let log
    const logout = useUserStore((state)=>state.logout)
    const toggleFormState = useFormStore((state)=>state.toggleForm);
    const formState = useFormStore((state)=>state.formDisplay)
    const navigate = useNavigate();
    const user = useUserStore((state)=>state.user)

    if(user!==null){
    log=user.fullName
    }
    else{
        log="Login/signup"
    }
   const runMe=()=>{
    if(user!==null){
        setAuthLog(!authLog)
        }
        else{
       toggleFormState()
        }
   }
   const handleLogoutLogic = ()=>{
    // Show success toast
    toast.success('Logout Successful!', {
        position: 'top-right',
        autoClose: 3000,
      });
    logout()
    setAuthLog(false)
    navigate('/')
    
   }
  return (
    <div className='overall-header-container container-fluid'>
        {/* <ToastContainer /> */}
        <div className="right-logo-header-section clickable">
            <div className="logo-graphic">
                <img src={bLogo} alt="logo of letter B" />
            </div>

        {/* code to reuse */}
            <div className="brand-name" onClick={()=>navigate("/")}>
                <h1 className='brand-name-h1'>ookHut</h1>
            </div>
            {/* end */}
        </div>
        <div className="center-header-nav-links-section">
            <ul className='nav-links-ul list-unstyled' >
                <li onClick={()=>navigate("/")} style={window.location.pathname === '/' ? { borderBottom: "2px solid  orangered" } : {}} className='clickable'>Home</li>
                {/* <li className='clickable'>Listing</li>
                <li className='clickable'>Tours</li>
                <li className='clickable'>Rentals</li>
                <li className='clickable'>Pages</li>
                <li className='clickable'>Contact</li> */}
            </ul>
        </div>
        <div className="left-header-buttons-section">
            { authLog && 
        <div className="login-div-options card bg-light">
                <ul className='list-unstyled'>
                    <li style={window.location.pathname === "/manage/bookings"?{color:"orangered"}:{}} onClick={()=>{navigate("/manage/bookings");setAuthLog(!authLog)}} className='clickable'>Manage Bookings</li>
                    <li style={window.location.pathname === "/settings"?{color:"orangered"}:{}}  onClick={()=>{navigate("/settings");setAuthLog(!authLog)}} className='clickable'>Settings</li>
                    <li style={window.location.pathname === "/comment"?{color:"orangered"}:{}}  onClick={()=>{navigate("/comment");setAuthLog(!authLog)}} className='clickable'>Comment</li>
                    <li onClick={()=>handleLogoutLogic()} className='clickable'>Logout</li>
                </ul>
            </div>
            }
            <div className='logo-login'>
                <button onClick={runMe} className='btn btn-outline-light   login-btn-header'>{log}</button>
            </div>
            
        </div>


        </div>
  )
}

export default Header