import React from 'react'
import './hmpgtestimonialcards.css'
import HmpgTestimonialcard from './HmpgTestimonialcard'

function Hmpgtestimonialcards() {
    const testData = [
        {

        },
        {

        },
        {

        },
        {

        },
        {

        },
        {

        }

    ]
  return (
    <div className='overall-homepage-testimonial-cards'>
        {
            testData.map(()=><HmpgTestimonialcard/>)
        }
        </div>
  )
}

export default Hmpgtestimonialcards