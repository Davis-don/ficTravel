import React from 'react'
import './destinationcard.css'
import testImg from '../../assets/homepage-hero.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'

function Destinationcard() {
  return (
    <div className='overall-destination-card card clickable'>
        <div className="destination-card-content-box">
          <h1 className='text-light'>Nairobi</h1>
          <ul>
            <li className='text-light'>14 Hotels</li>
            <li className='text-light'>22 Tours</li>
            <li className='text-light'>22 Rentals</li>
            <li className='text-light'>19 cars</li>
            <li className='text-light'>18 activities</li>
          </ul>
          </div>
        </div>
  )
}

export default Destinationcard