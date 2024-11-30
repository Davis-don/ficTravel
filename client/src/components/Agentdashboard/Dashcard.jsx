import React from 'react'
import './dashcard.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function Dashcard({concern,TotalNumber}) {
  return (
    <div className='overall-dash-card-container card'>
        <h4>{concern}</h4>
        <h5>{TotalNumber}</h5>
        </div>
  )
}

export default Dashcard