import React from 'react';
import './admindash.css';
import Dashcard from '../Agentdashboard/Dashcard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from 'react-query';
import { fetchBookings } from '../../utils/fetchBookings'; // Adjust the path as needed
import { fetchUsers } from '../../utils/fetchAllUsers';
import { fetchAgents } from '../../utils/fetchAllAgents'; // Ensure this is the correct import path

function Admindash() {
  // Fetch all bookings
  const fetchAllBookings = useQuery({
    queryKey: ["agentBookings"],
    queryFn: fetchBookings, // Reusable query function
  });

  // Fetch all users
  const fetchAllUsers = useQuery({
    queryKey: ["allUsers"],
    queryFn: fetchUsers, // Reusable query function
  });

  // Fetch all agents
  const fetchAllAgents = useQuery({
    queryKey: ["allAgents"],
    queryFn: fetchAgents, // Reusable query function
  });

  // Check if any query is loading
  if (fetchAllBookings.isLoading || fetchAllUsers.isLoading || fetchAllAgents.isLoading) {
    return (
      <div className="loading-container">
        <h3>Loading Dashboard...</h3>
        <p>Please wait while we fetch your data.</p>
      </div>
    );
  }

  // Check if any query has an error
  if (fetchAllBookings.isError || fetchAllUsers.isError || fetchAllAgents.isError) {
    return (
      <div className="error-container">
        <h3>Error Loading Dashboard</h3>
        <p>
          {fetchAllBookings.error?.message ||
            fetchAllUsers.error?.message ||
            fetchAllAgents.error?.message}
        </p>
      </div>
    );
  }

  // Calculate Active Bookings
  const activeBookingsCount = fetchAllBookings.data?.filter(
    (booking) => new Date(booking.startDate) < new Date(booking.endDate)
  ).length || 0;

  // Calculate Inactive Bookings
  const inactiveBookingsCount = fetchAllBookings.data?.length - activeBookingsCount;

  // Data for Dashcard components
  const dataHeading = [
    {
      title: "All Agents", 
      Total: fetchAllAgents.data?.length || 0,  // Add total count of agents here
    },
    {
      title: "All Users",
      Total: fetchAllUsers.data?.length || 0,
    },
    {
      title: "All Bookings",
      Total: fetchAllBookings.data?.length || 0,
    },
    {
      title: "Active Bookings",
      Total: activeBookingsCount,
    },
    {
      title: "Inactive Bookings",
      Total: inactiveBookingsCount,
    },
  ];

  return (
    <div className="overall-agent-dash-link">
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

export default Admindash;







