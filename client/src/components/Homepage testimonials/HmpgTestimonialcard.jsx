import React from 'react';
import './hpgtestimonialcard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaStar } from "react-icons/fa";

function HmpgTestimonialcard({ fullName, comment, createdAt }) {
  // Format the createdAt date to a readable format
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="overall-homepage-testimonial-card">
      <div className="hmpg-testimonial-content">
        <p className="text-secondary testimonial-description">{comment}</p>
      </div>
      <div className="testimony-identity">
        <ul className="list-unstyled">
          <li><FaStar className="star-icon fs-3" /></li>
          <li><FaStar className="star-icon fs-3" /></li>
          <li><FaStar className="star-icon fs-3" /></li>
          <li><FaStar className="star-icon fs-3" /></li>
          <li><FaStar className="star-icon fs-3" /></li>
        </ul>
        <div className="commenter-identity">
          <h3>{fullName}</h3>
          <p className="text-secondary">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}

export default HmpgTestimonialcard;
