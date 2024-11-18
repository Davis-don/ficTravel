import React from 'react'
import Header from '../layouts/header/Header'
import Hero from '../components/Homepage hero/Hero'
import Topdestination from '../components/Top destinations/Topdestination'
import Recommended from '../components/Recommended/Recommended'

function Homepage() {
  return (
    <div className='overall-homepage-container'>
     <Header/>
     <Hero/>
     <Topdestination/>
     <Recommended/>
        </div>
  )
}

export default Homepage