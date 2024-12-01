import React from 'react';
import Recommendedcard from './Recommendedcard';
import './recommendedcards.css';
import useHotelBook from '../../hooks/Hotel booking/useBook.com';

function Recommendedcards() {
  const { data, isLoading, error, requestCount } = useHotelBook();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      {/* <h2 style={{ textAlign: "center" }}>Request Count: {requestCount}</h2> */}
      <div className='overall-recommended-cards-container'>
        {
          data?.data?.products?.map((attraction) => (
            <Recommendedcard 
              key={attraction.id} 
              attraction={attraction}  
            />
          ))
        }
      </div>
    </>
  );
}

export default Recommendedcards;
