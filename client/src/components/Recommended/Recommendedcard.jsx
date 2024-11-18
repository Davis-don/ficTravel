import React from 'react'
import './recommendedcard.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import imageTest from '../../assets/homepage-hero.jpg'
import { FcLike } from "react-icons/fc";
import { FaStar } from "react-icons/fa";

function Recommendedcard() {
  return (
    <div className='overall-recommended-card-container clickable container-fluid' onClick={()=>alert("all")}>
        <div className="image-container-recommended">
          <img src={imageTest} alt="hotel" />
          {/* <div className="like-icon clickable" onClick={()=>alert("like")}>
            <h2><FcLike className='like-actual-icon'/></h2>

          </div> */}
        </div>
        <div className="recommended-card-body">
          <ul className='list-unstyled'>
            <li><FaStar className='fs-3  star-icon'/></li>
            <li><FaStar className='fs-3 star-icon'/></li>
            <li><FaStar className='fs-3 star-icon'/></li>
          </ul>
          <div className="recommended-title-description">
            <h3>Constello Casole Hotel</h3>
            <p className='describe-card text-secondary'>Nairobi city</p>
          </div>
        </div>

        <div className="recommended-footer-section">
       <h4><span className='text-secondary'>From</span> <span>KES 10,000</span><span className='text-secondary'>/ 1 night(s)</span></h4>
        </div>
    </div>
  )
}

export default Recommendedcard