import React, { useState } from 'react';
import './readrecommended.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUserStore from '../store/userStore';
import useFormStore from '../store/userFormStore';
import { useMutation } from 'react-query';
import usehotelListItinerary from '../store/basketList';

function Recommendedreadpg() {
  const userData = useUserStore((state) => state.user);
  
  const toggleForm = useFormStore((state) => state.toggleForm);
  const setHotelList = usehotelListItinerary((state) => state.addHotelItinerary);
  const allHotelList = usehotelListItinerary((state) => state.hotelList);
  const location = useLocation();
  const attraction = location.state;
console.log(attraction.representativePrice)
  const [booking, setBooking] = useState({
    userId: userData?.id || '',
    attractionName: attraction?.name || '',
    bookingPrice: attraction?.representativePrice.chargeAmount || '',
    paidAmount:0.00,
    startDate: "",
    endDate: "",
    guest: ""
  });

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value
    });
  };

  const { mutate, isError, isLoading, error } = useMutation({
    mutationFn: async (submitRequest) => {
      const response = await fetch('http://localhost:4000/book-request', {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(submitRequest)
      });

      if (!response.ok) {
        throw new Error('Booking failed. Please try again later.');
      }

     // return response.json();
    },
    onSuccess: () => {
      toast.success('Booking successful!', {
        position: "top-right",
        autoClose: 3000,
      });
    },
    onError: (err) => {
      toast.error(err.message || 'Something went wrong.', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData) {
      toggleForm();
      toast.info('Please login to book.', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    mutate(booking);
  };

  return (
    <div className="overall-read-recommended-page">
      <ToastContainer />
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

        <div className="about-hotel">
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
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              className="form-control"
              onChange={handleChange}
              required
              name="startDate"
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              className="form-control"
              onChange={handleChange}
              name="endDate"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="guests">Number of Guests</label>
            <input
              type="number"
              id="guests"
              className="form-control"
              name="guest"
              required
              onChange={handleChange}
              min="1"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Booking...' : 'Book Now'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Recommendedreadpg;


