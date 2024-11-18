import React from 'react';
import './hero.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CiLocationOn } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { IoPeople } from "react-icons/io5";
function Hero() {
  return (
    <div className='overall-homepage-hero'>
      <div className="homepage-hero-content">
        <div className="hero-homepage-content-box">
          <h1 className='text-light'>Love where you're going</h1>
          <h4 className='text-light'>Book incredible things to do around the world.</h4>
        </div>
      </div>
    </div>
  );
}

export default Hero;
