import React, { useState, useEffect } from 'react';
import './agentdash.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from 'react-query';
import useUserStore from '../../store/userStore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Agentdashboard() {
  const user = useUserStore((state) => state.user);
  const agentId = user.id;

  // State to track if the toast has been shown
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);

  // Use react-query's useQuery hook to fetch data with refetchInterval set to 3 seconds
  const { data, isLoading, isError, error, isSuccess } = useQuery(
    'itinerary',
    async () => {
      const response = await fetch(`http://localhost:4000/get-agent-bookings/${agentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch bookings');
      }

      return response.json(); // Parse JSON from response
    },
    {
      refetchInterval: 3000, // Refetch every 3 seconds
      onSuccess: () => {
        // Show toast only if this is the first successful fetch
        if (!hasFetchedOnce) {
          toast.success('Bookings fetched successfully!', { position: 'top-right', autoClose: 3000 });
          setHasFetchedOnce(true); // Set the flag to true after the first successful fetch
        }
      },
      onError: (err) => {
        toast.error(err.message, { position: 'top-right', autoClose: 3000 });
      },
    }
  );

  // Handle loading and error states
  if (isLoading) {
    return <div className='text-warning h3'>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        <ToastContainer />
        <div className='text-light h2'> {error.message}</div>
      </div>
    );
  }

  return (
    <div className="overall-user-dashboard-component container">
      <ToastContainer />
      <h1 className="text-light">Dashboard</h1>

      {/* Display No Data message if no bookings are found */}
      {data && data.length === 0 ? (
        <div className="text-light">No bookings found.</div>
      ) : (
        <div>
          {/* Display the bookings table if data exists */}
          <table className="table table-striped table-hover table-bordered table-dark">
            <thead className="thead-light">
              <tr>
                <th>User Full Name</th> {/* New column for User's Full Name */}
                <th>Attraction Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((booking) => {
                const isVisited = new Date(booking.endDate) < new Date();
                const statusClass = isVisited ? 'bg-danger' : 'bg-success';
                const statusText = isVisited ? 'Visited' : 'Active';

                return (
                  <tr key={booking.id}>
                    <td>{booking.user?.fullName}</td> {/* Display user's full name */}
                    <td>{booking.attractionName}</td>
                    <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                    <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge ${statusClass}`}>{statusText}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Agentdashboard;
