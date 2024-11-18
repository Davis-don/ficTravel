import React from 'react'
import Header from '../layouts/header/Header'
import Hero from '../components/Homepage hero/Hero'
import Topdestination from '../components/Top destinations/Topdestination'
import Recommended from '../components/Recommended/Recommended'
import Homepagetestimonials from '../components/Homepage testimonials/Homepagetestimonials'

function Homepage() {
  return (
    <div className='overall-homepage-container'>
     <Header/>
     <Hero/>
     <Topdestination/>
     <Recommended/>
     <Homepagetestimonials/>
        </div>
  )
}

export default Homepage