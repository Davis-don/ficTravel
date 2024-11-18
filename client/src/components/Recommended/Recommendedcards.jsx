import React from 'react'
import Recommendedcard from './Recommendedcard'
import './recommendedcards.css'

function Recommendedcards() {
    const sampleData = [
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
    <div className='overall-recommended-cards-container'>
       
      {
        sampleData.map(()=><Recommendedcard/>)
      }
        </div>
  )
}

export default Recommendedcards