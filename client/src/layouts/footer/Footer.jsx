import React from 'react'
import './footer.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import paycards from '../../assets/pay-cards.svg'

function Footer() {
  return (
    <div className='overall-footer-section'>
        <div className="bottom-copyright-section">

            <div className="footer-copyright">
       <p className='text-secondary'>© Copyright codeSamorai 2024</p>
            </div>

            <div className="payment-cards">
         <img src={paycards} alt="payment cards" />
            </div>
        </div>
        </div>
  )
}

export default Footer