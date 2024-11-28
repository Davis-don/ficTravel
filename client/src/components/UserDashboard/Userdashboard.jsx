import React from 'react';
import './userdash.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery, useQueryClient } from 'react-query';
import useUserStore from '../../store/userStore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useDeleteBooking from '../../hooks/useDeleteBooking';
import usePayStore from '../../store/payStore';

function Userdashboard() {
  const toggleStatePay = usePayStore((state)=>state.toggleStore)
  const user = useUserStore((state) => state.user);
  const userId = user.id;
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery(
    'itinerary',
    async () => {
      const response = await fetch(`http://localhost:4000/get-user-bookings/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch bookings');
      }

      return response.json();
    },
    {
      onSuccess: () => {
        toast.success('Bookings fetched successfully!', { position: 'top-right', autoClose: 3000 });
      },
      onError: (err) => {
        toast.error(err.message, { position: 'top-right', autoClose: 3000 });
      },
    }
  );

  const { mutate: deleteBooking, isLoading: isDeleting } = useDeleteBooking(
    () => {
      toast.success('Booking deleted successfully!', { position: 'top-right', autoClose: 3000 });
      queryClient.invalidateQueries('itinerary');
    },
    (err) => {
      toast.error(err.message, { position: 'top-right', autoClose: 3000 });
    }
  );

  if (isLoading) {
    return <div className='text-warning h3'>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        {/* <ToastContainer /> */}
        <div className='text-light h2'>{error.message}</div>
      </div>
    );
  }

  return (
    <div className="overall-user-dashboard-component container">
      {/* <ToastContainer /> */}
      {data && data.length === 0 ? (
        <div className="text-light">No bookings found.</div>
      ) : (
        <div>
          <table className="user-table">
            <thead className="thead-light">
              <tr className='user-head-tbl'>
                <th className='text-light'>Agent Name</th>
                <th className='text-light'>Attraction Name</th>
                <th className='text-light'>Start Date</th>
                <th className='text-light'>End Date</th>
                <th className='text-light'>Booking Price</th>
                <th className='text-light'>Paid Amount</th>
                <th className='text-light'>Status</th>
                <th className='text-light'>Actions</th>
              </tr>
            </thead>
            <tbody className='user-table-body'>
              {data.map((booking) => {
                const isVisited = new Date(booking.endDate) < new Date();
                const statusClass = isVisited ? 'bg-danger' : 'bg-success';
                const statusText = isVisited ? 'Visited' : 'Active';

                return (
                  <tr key={booking.id}>
                    <td className='text-light'>{booking.agent?.fullName || 'N/A'}</td>
                    <td className='text-light'>{booking.attractionName}</td>
                    <td className='text-light'>{new Date(booking.startDate).toLocaleDateString()}</td>
                    <td className='text-light'>{new Date(booking.endDate).toLocaleDateString()}</td>
                    <td className='text-light'>${booking.bookingPrice.toFixed(2)}</td>
                    <td className='text-light'>${booking.paidAmount.toFixed(2)}</td>
                    <td className='text-light'>
                      <span className={`badge ${statusClass}`}>{statusText}</span>
                    </td>
                    <td>
                      <div className="d-flex flex-column gap-4 p-1">
                        <button onClick={()=>toggleStatePay(booking.bookingPrice)} className="btn btn-primary btn-lg">Pay</button>
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          className="btn btn-danger btn-lg"
                          disabled={isDeleting}
                        >
                          {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
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

export default Userdashboard;





