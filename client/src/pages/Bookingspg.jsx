import React from 'react'
import Userdashboard from '../components/UserDashboard/Userdashboard'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import './bookingpg.css'
import usePayStore from '../store/payStore'
import Paymentintergration from '../components/Payment intergration/Paymentintergration'
function Bookingspg() {
  const payState = usePayStore((state)=>state.status)
  const [confirmed,setConfirmed] = useState(true);
  let component;
  if(confirmed === true){
    component = <Userdashboard/>
  }
  return (
    <div className='overall-bookings-page'>
        <div className="booking-content-manage-container container">
        <h1 className="text-light">My bookings</h1>
          {component}
        </div>
        {payState && <div className="payment-intergration-ui card">
        <Paymentintergration/>
          </div>}
        </div>
  )
}

export default Bookingspg