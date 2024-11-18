import React from 'react'
import Destinationcard from './Destinationcard'
import './destinationcards.css'

function Destinationcards() {
    const dataTest = [
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
    <div className='overall-destination-cards'>
        {
            dataTest.map((dataValue)=><Destinationcard/>)
        }
        </div>
  )
}

export default Destinationcards