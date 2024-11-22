import React from 'react'
import './recommendedcard.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import imageTest from '../../assets/homepage-hero.jpg'
import { FcLike } from "react-icons/fc";
import { FaStar } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';

function Recommendedcard({attraction}) {
  const navigate = useNavigate ();

  return (
    <div onClick={ ()=>navigate("/recommended", { state: attraction })} className='overall-recommended-card-container clickable container-fluid'>
        <div className="image-container-recommended">
          <img src={attraction.primaryPhoto.small} alt="hotel" />
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
            <h3>{attraction.name}</h3>
            <p className='describe-card text-secondary'></p>
          </div>
        </div>

        <div className="recommended-footer-section">
       <h4><span className='text-secondary'>From</span> <span>{attraction.representativePrice.currency + " " + attraction.representativePrice.chargeAmount}</span></h4>
        </div>
    </div>
  )
}

export default Recommendedcard