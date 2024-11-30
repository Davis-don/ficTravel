import React from 'react';
import './agenttask.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import useUserStore from '../../store/userStore';
import { useQuery } from 'react-query';

function Agenttasks() {
  const user = useUserStore((state) => state.user);
  const userId = user.id;

  // Conversion rate: 1 INR = 1.27 KSH (Replace with real-time rate if needed)
  const INR_TO_KSH = 1.27;

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

  if (isLoading) {
    return (
      <div className="loading-container">
        <h3>Loading Tasks...</h3>
        <p>Please wait while we fetch your data.</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-container">
        <h3>Error Loading Tasks</h3>
        <p>{error.message}</p>
      </div>
    );
  }

  // Filter visited and active tasks
  const visitedTasks = data.filter(
    (booking) => new Date(booking.dateOfBooking) >= new Date(booking.endDate)
  );
  const activeTasks = data.filter(
    (booking) => !visitedTasks.includes(booking)
  );

  return (
    <div className='overall-agent-tasks-container container'>
      <h1 className='container'>Tasks</h1>
      <div className="tasks-agent-body">

        {/* Active Tasks Table */}
        <div className="Active-tasks-agent">
          <h2>Active Tasks</h2>
          {activeTasks.length > 0 ? (
            <table className="task-table table table-striped table-bordered">
              <thead className="table-primary">
                <tr>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Place</th>
                  <th>Price (INR)</th>
                  <th>Price (KSH)</th>
                  <th>Paid (INR)</th>
                  <th>Paid (KSH)</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeTasks.map((task) => {
                  const bookingPriceKsh = (task.bookingPrice * INR_TO_KSH).toFixed(2);
                  const paidAmountKsh = (task.paidAmount * INR_TO_KSH).toFixed(2);
                  return (
                    <tr key={task.id}>
                      <td>{task.user.fullName}</td>
                      <td>{task.user.email}</td>
                      <td>{task.attractionName}</td>
                      <td>{task.bookingPrice.toFixed(2)}</td>
                      <td>{bookingPriceKsh}</td>
                      <td>{task.paidAmount.toFixed(2)}</td>
                      <td>{paidAmountKsh}</td>
                      <td className="text-success">Active</td>
                      <td>
                        <div className="d-flex flex-column gap-4 p-1">
                          <button className="btn btn-info btn-lg">Message</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="no-tasks-message fs-2">No active tasks at the moment.</p>
          )}
        </div>

        {/* Visited Tasks Table */}
        <div className="visited-tasks">
          <h2>Visited Tasks</h2>
          {visitedTasks.length > 0 ? (
            <table className="task-table table table-striped table-bordered">
              <thead className="table-primary">
                <tr>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Place</th>
                  <th>Price (INR)</th>
                  <th>Price (KSH)</th>
                  <th>Paid (INR)</th>
                  <th>Paid (KSH)</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visitedTasks.map((task) => {
                  const bookingPriceKsh = (task.bookingPrice * INR_TO_KSH).toFixed(2);
                  const paidAmountKsh = (task.paidAmount * INR_TO_KSH).toFixed(2);
                  return (
                    <tr key={task.id}>
                      <td>{task.user.fullName}</td>
                      <td>{task.user.email}</td>
                      <td>{task.attractionName}</td>
                      <td>{task.bookingPrice.toFixed(2)}</td>
                      <td>{bookingPriceKsh}</td>
                      <td>{task.paidAmount.toFixed(2)}</td>
                      <td>{paidAmountKsh}</td>
                      <td className="text-primary">Visited</td>
                      <td>
                        <div className="d-flex flex-column gap-4 p-1">
                          <button className="btn btn-info btn-lg">Message</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="no-tasks-message">No visited tasks at the moment.</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Agenttasks;


