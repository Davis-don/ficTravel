import React, { useState } from 'react';
import './readrecommended.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import { FaStar } from "react-icons/fa";

function Recommendedreadpg() {
  const location = useLocation();
  const attraction = location.state;

  // States for the booking form
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guests, setGuests] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking Confirmed!\nName: ${name}\nFrom: ${startDate} To: ${endDate}\nGuests: ${guests}`);
  }

  return (
    <div className="overall-read-recommended-page">
      <div className="recommended-pg-header">
        <h1>{attraction.name}</h1>
      </div>
      
      <div className="reviews-recommended-section">
        <ul className="list-unstyled">
          <li className="fs-2"><b>3</b></li>
          <li><FaStar className="fs-1 star-icon" /></li>
        </ul>
      </div>
      
      <div className="recommended-hero-section">
        <div className="image-identify">
          <img src={attraction.primaryPhoto.small} alt="hotel" />
        </div>

        <div className="about-hetel">
          <div className="about-short-description">
            <h4 className="text-light">Description</h4>
            <p className="text-light fs-2">{attraction.shortDescription}</p>
          </div>
        </div>
      </div>

      <div className="booking-section">
        <h2>Book Your Stay</h2>
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="guests">Number of Guests</label>
            <input
              type="number"
              id="guests"
              className="form-control"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              required
              min="1"
            />
          </div>
          <button type="submit" className="btn btn-primary">Book Now</button>
        </form>
      </div>
    </div>
  );
}

export default Recommendedreadpg;


// import React from 'react'
// import './readrecommended.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import { useLocation } from 'react-router-dom'; 
// import { FaStar } from "react-icons/fa";

// function Recommendedreadpg() {
//   const location = useLocation();
//   const attraction = location.state; 
//   console.log(attraction.offers)
//   return (
//     <div className='overall-read-recommended-page'>
//       <div className="recommended-pg-header">
//         <h1>{attraction.name}</h1>
//       </div>
//       <div className="reviews-recommended-section">
//         <ul className='list-unstyled'>
//         <li className='fs-2'><b>3</b></li>
//    <li><FaStar className='fs-1  star-icon'/></li>
   
//    {/* <li className='fs-2 text-secondary'>({attraction.reviewsStats.allReviewsCount + " reviews"})</li> */}
//         </ul>
//       </div>
//      <div className="recommended-hero-section">
//       <div className="image-identify">
//         <img src={attraction.primaryPhoto.small} alt="hotel" />
//       </div>
//       <div className="about-hetel">
//         <div className="about-short-description">
//         <h4 className='text-light'>Description</h4>
//         <p className='text-light fs-2'>{attraction.shortDescription}</p>
//         </div>
//         <div className="offers">
//         <ul>
//       {attraction.offers.map((offer, offerIndex) => (
//         <li key={offer.id}>
//           <ul>
//             {offer.items.map((item, itemIndex) => (
//               <li key={item.id}>
//                 Item {itemIndex + 1} ID: {item.id}
//               </li>
//             ))}
//           </ul>
//         </li>
//       ))}
//     </ul>
//         </div>
        
//       </div>
    
//      </div>
//       </div>
//   )
// }

// export default Recommendedreadpg