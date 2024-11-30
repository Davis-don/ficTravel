import React from 'react';
import './agentdash.css';
import Dashcard from './Dashcard';
import 'bootstrap/dist/css/bootstrap.min.css';
import useUserStore from '../../store/userStore';
import { useQuery } from 'react-query';

function Agentdashboard() {
  const user = useUserStore((state) => state.user);
  const userId = user?.id;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["agentBookings"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:4000/get-agent-bookings/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch agent bookings");
      }
      return response.json();
    },
  });
  // Handle loading state
  if (isLoading) {
    return (
      <div className="loading-container">
        <h3>Loading Dashboard...</h3>
        <p>Please wait while we fetch your data.</p>
      </div>
    );
  }

 
  // Handle error state
  if (isError) {
    return (
      <div className="error-container">
        <h3>Error Loading Dashboard</h3>
        <p>{error.message}</p>
      </div>
    );
  }

 

  // Define default values if data is undefined or empty
  const totalRequests = data?.length || 0;
  const visitedRequests = data
    ? data.filter((booking) => new Date(booking.endDate) < new Date()).length
    : 0;
  const activeRequests = totalRequests - visitedRequests;

  // Data for Dashcard components
  const dataHeading = [
    {
      title: "Total number of requests",
      Total: totalRequests,
    },
    {
      title: "Visited requests",
      Total: visitedRequests,
    },
    {
      title: "Active requests",
      Total: activeRequests,
    },
  ];

  // Check if data is empty and return a "No Data" message if needed
  if (totalRequests === 0) {
    return (
      <div className="no-data-container">
        <h3>No Data Available</h3>
        <p>You currently have no bookings assigned to you.</p>
      </div>
    );
  }

  return (
    <div className="ovaerall-agent-dash-link">
      <h1 className="container">Dashboard</h1>
      <p className="text-secondary h5">Track your progress and statistics.</p>
      <div className="overall-card-statistics">
        {dataHeading.map((dataH) => (
          <Dashcard TotalNumber={dataH.Total} concern={dataH.title} key={dataH.title} />
        ))}
      </div>
    </div>
  );
}

export default Agentdashboard;




