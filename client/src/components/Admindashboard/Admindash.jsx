import React from 'react';
import './admindash.css';
import Dashcard from '../Agentdashboard/Dashcard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from 'react-query';
import { fetchBookings } from '../../utils/fetchBookings'; // Adjust the path as needed
import { fetchUsers } from '../../utils/fetchAllUsers';

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

  // Check if either query is loading
  if (fetchAllBookings.isLoading || fetchAllUsers.isLoading) {
    return (
      <div className="loading-container">
        <h3>Loading Dashboard...</h3>
        <p>Please wait while we fetch your data.</p>
      </div>
    );
  }

  // Check if either query has an error
  if (fetchAllBookings.isError || fetchAllUsers.isError) {
    return (
      <div className="error-container">
        <h3>Error Loading Dashboard</h3>
        <p>
          {fetchAllBookings.error?.message || fetchAllUsers.error?.message}
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
      title: "All users",
      Total: fetchAllUsers.data?.length || 0,
    },
    {
      title: "All Bookings",
      Total: fetchAllBookings.data?.length || 0,
    },
    {
      title: "Active bookings",
      Total: activeBookingsCount,
    },
    {
      title: "Inactive bookings",
      Total: inactiveBookingsCount,
    },
  ];

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

export default Admindash;






