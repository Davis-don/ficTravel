import React from 'react';
import './admintasks.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from 'react-query';
import { fetchBookings } from '../../utils/fetchBookings'; // Adjust the path as needed

function Admintasks() {
  // Fetch bookings data
  const { data: bookings, isLoading, isError } = useQuery('allBookings', fetchBookings);

  // Check if the query is loading
  if (isLoading) {
    return (
      <div className="loading-container">
        <h3>Loading data...</h3>
        <p>Please wait while we fetch your data.</p>
      </div>
    );
  }

  // Handle errors if the query fails
  if (isError) {
    return (
      <div className="error-container">
        <h3>Error loading data</h3>
        <p>There was an error fetching the bookings.</p>
      </div>
    );
  }

  // Filter active bookings: startDate <= endDate
  const activeBookings = bookings?.filter(
    (booking) => new Date(booking.startDate) <= new Date(booking.endDate)
  ) || [];

  // Filter inactive bookings: startDate > endDate
  const inactiveBookings = bookings?.filter(
    (booking) => new Date(booking.startDate) > new Date(booking.endDate)
  ) || [];

  return (
    <div className='overall-admin-tasks container'>
      {/* Active Task Allocation Table */}
      <div className="tasks-allocation-table-active">
        <h1 className="text-center mb-4">Allocation Task Active</h1>
        {activeBookings.length > 0 ? (
          <table className="table table-striped table-bordered table-hover table-sm">
            <thead className="thead-dark">
              <tr>
                <th className="text-center">Full Name</th>
                <th className="text-center">Start Date</th>
                <th className="text-center">End Date</th>
                <th className="text-center">Attraction</th>
                <th className="text-center">Agent Name</th>
                <th className="text-center">Agent Email</th>
              </tr>
            </thead>
            <tbody>
              {activeBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.user?.fullName}</td>
                  <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                  <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                  <td>{booking.attractionName}</td>
                  <td>{booking.agent?.fullName}</td>
                  <td>{booking.agent?.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No data currently</p>
        )}
      </div>

      {/* Inactive Task Allocation Table */}
      <div className="task-allocation-table-inactive mt-5">
        <h1 className="text-center mb-4">Allocation Task Visited</h1>
        {inactiveBookings.length > 0 ? (
          <table className="table table-striped table-bordered table-hover table-sm">
            <thead className="thead-dark">
              <tr>
                <th className="text-center">Full Name</th>
                <th className="text-center">Start Date</th>
                <th className="text-center">End Date</th>
                <th className="text-center">Attraction</th>
                <th className="text-center">Agent Name</th>
                <th className="text-center">Agent Email</th>
              </tr>
            </thead>
            <tbody>
              {inactiveBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.user?.fullName}</td>
                  <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                  <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                  <td>{booking.attractionName}</td>
                  <td>{booking.agent?.fullName}</td>
                  <td>{booking.agent?.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No data currently</p>
        )}
      </div>
    </div>
  );
}

export default Admintasks;


