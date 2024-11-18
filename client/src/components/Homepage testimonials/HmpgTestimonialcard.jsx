import React from 'react'
import './hpgtestimonialcard.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaStar } from "react-icons/fa";

function HmpgTestimonialcard() {
  return (
    <div className='overall-homepage-testimonial-card '>
        <div className="hmpg-testimonial-content">
       <p className='text-secondary testimonial-description'>"I stayed overnight at Chelsea appartment on christmas Eve and it was fantastic.Such a lovely spot, just off the kings road and location is fantastic"</p>
        </div>
        <div className="testimony-identity">
      <ul className='list-unstyled'>
<li><FaStar className='star-icon fs-3'/></li>
<li><FaStar className='star-icon fs-3'/></li>
<li><FaStar className='star-icon fs-3'/></li>
<li><FaStar className='star-icon fs-3'/></li>
<li><FaStar className='star-icon fs-3'/></li>
      </ul>
      <div className="commenter-identity">
        <h3>Charlesh</h3>
        <p className='text-secondary'>Customer in Kenya</p>
      </div>
        </div>
        </div>
  )
}

export default HmpgTestimonialcard