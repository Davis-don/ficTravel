import React from 'react'
import './header.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import bLogo from '../../assets/blogo.png'
import { CiShoppingBasket } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
function Header() {
  return (
    <div className='overall-header-container container-fluid'>
        <div className="right-logo-header-section clickable">
            <div className="logo-graphic">
                <img src={bLogo} alt="logo of letter B" />
            </div>
            <div className="brand-name">
                <h1 className='brand-name-h1'>ookHut</h1>
            </div>
        </div>
        <div className="center-header-nav-links-section">
            <ul className='nav-links-ul list-unstyled' >
                <li className='clickable'>Home</li>
                <li className='clickable'>Listing</li>
                <li className='clickable'>Tours</li>
                <li className='clickable'>Rentals</li>
                <li className='clickable'>Pages</li>
                <li className='clickable'>Contact</li>
            </ul>
        </div>
        <div className="left-header-buttons-section">
            <div className="nav-bar-link">
       <h1><FaBars /></h1>

            </div>
            <div className="cart-logo rounded-circle clickable">
            <CiShoppingBasket className='header-icon'/>
            
            </div>
            <div className="login-logo rounded-circle clickable">
            <FaRegUser className='header-icon'/>
            </div>
        </div>
        </div>
  )
}

export default Header