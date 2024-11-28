import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './passwordupdate.css';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify'; // Importing toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importing the CSS for the toast

function Passwordupdate({ id }) {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const { mutate } = useMutation({
    mutationFn: async () => {
      // Check if passwords match
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        toast.error("New password and confirm password do not match!");
        return;
      }

      try {
        const response = await fetch(`http://localhost:4000/update-password/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
            confirmPassword: passwordData.confirmPassword
          })
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("Password updated successfully!");
        } else {
          toast.error(data.message || "Something went wrong. Please try again.");
        }
      } catch (error) {
        toast.error("Error updating password. Please try again.");
      }
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    mutate();
  };

  return (
    <div className="overall-password-update overall-personal-info-update">
      <form onSubmit={handleSubmit}>
        <label htmlFor="currentPassword">CURRENT PASSWORD</label><br />
        <input
          name="currentPassword"
          onChange={handleChange}
          type="password"
          className="form-control"
          placeholder="****"
          value={passwordData.currentPassword}
        />

        <label htmlFor="newPassword">NEW PASSWORD</label><br />
        <input
          name="newPassword"
          onChange={handleChange}
          type="password"
          className="form-control"
          placeholder="****"
          value={passwordData.newPassword}
        />

        <label htmlFor="confirmPassword">CONFIRM PASSWORD</label><br />
        <input
          name="confirmPassword"
          onChange={handleChange}
          type="password"
          className="form-control"
          placeholder="******"
          value={passwordData.confirmPassword}
        />

        <div className="button-save-personal">
          <button type="submit" className="btn btn-warning text-light">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default Passwordupdate;
