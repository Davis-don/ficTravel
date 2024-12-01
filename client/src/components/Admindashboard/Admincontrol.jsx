import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from '../Createaccount/Signup'

function Admincontrol() {
  return (
    <div className='overall-admin-controls'>
        <h1 className='container'>Add agent</h1>
        <Signup register="AGENT"/>
        </div>
  )
}

export default Admincontrol