import React from 'react'
import './layout.css'
import Header from './header/Header'
import Footer from './footer/Footer'
import Useraccount from '../components/userAccount/Useraccount'

function Layout({children}) {
  return (
    <div className='overall-layout-section'>
      <div className="all-content-layout">
      <Header/>
        <main>{children}</main>
       <Footer/>
      </div>
      <div className="userAccount-component-layout">
        <div className="actual-useraccount-container container-fluid card">
        <Useraccount/>
        </div>

      </div>
      
        </div>
  )
}

export default Layout