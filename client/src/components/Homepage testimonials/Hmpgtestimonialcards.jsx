import React from 'react';
import './hmpgtestimonialcards.css';
import HmpgTestimonialcard from './HmpgTestimonialcard';
import { useQuery } from 'react-query';

function Hmpgtestimonialcards() {
  // Fetch testimonials using react-query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/get-all-testimonials");
      if (!response.ok) {
        throw new Error("Failed to fetch testimonials");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return <div>Loading testimonials...</div>;
  }

  if (isError) {
    return <div>Failed to load testimonials. Please try again later.</div>;
  }

  return (
    <div className="overall-homepage-testimonial-cards">
      {data.map((testimonial) => (
        <HmpgTestimonialcard
          key={testimonial.id}
          fullName={testimonial.user.fullName}
          comment={testimonial.comment}
          createdAt={testimonial.createdAt}
        />
      ))}
    </div>
  );
}

export default Hmpgtestimonialcards;
