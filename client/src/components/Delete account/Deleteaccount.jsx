import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify'; // Importing toast
import 'react-toastify/dist/ReactToastify.css'; // Importing the CSS for toast
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/userStore';

function Deleteaccount({ id }) {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);
  const [confirmation, setConfirmation] = useState('');

  const handleChange = (e) => {
    setConfirmation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user typed "DELETE" (case-insensitive)
    if (confirmation.toLowerCase() !== 'delete') {
      toast.error("Please type 'DELETE' to confirm account deletion.");
      return;
    }

    try {
      // Send DELETE request to the server
      const response = await fetch(`http://localhost:4000/delete-account/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ confirmation })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Account deleted successfully!");
        toast.success("Logged out successfully!"); // Added success toast for logout
        
        // Logout and navigate to homepage after 3 seconds
        setTimeout(() => {
          logout();
          navigate('/');
        }, 3000);
      } else {
        toast.error(data.message || "Could not delete the account. Please try again.");
      }
    } catch (error) {
      toast.error("Error occurred while deleting the account.");
    }
  };

  return (
    <div className='overall-selete-account-container overall-personal-info-update'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="confirmation">
          Type <span className='text-danger'>DELETE</span> to delete your account
        </label><br />
        <input
          type="text"
          className='form-control'
          placeholder='eg. DELETE'
          value={confirmation}
          onChange={handleChange}
        />
        <div className="button-save-personal">
          <button type="submit" className='btn btn-danger text-light'>Delete</button>
        </div>
      </form>
    </div>
  );
}

export default Deleteaccount;
