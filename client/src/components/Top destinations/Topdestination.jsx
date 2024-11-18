import React from 'react'
import './topdestination.css'
import Destinationcards from './Destinationcards'

function Topdestination() {
  return (
    <div className='overall-top-destination'>
        <h1>Top destination</h1>
        <div className="top-destination-card-holder">
       <Destinationcards/>
        </div>
        </div>
  )
}

export default Topdestination