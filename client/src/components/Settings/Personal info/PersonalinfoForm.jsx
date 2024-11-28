import React, { useState } from 'react';
import './personalinfo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';  // Import toast here (ToastContainer is already set globally)
import 'react-toastify/dist/ReactToastify.css';

function Personalinfoupdate({ fullName, userName, email, id }) {
  const initialValues = {
    fullName,
    userName,
    email,
  };

  const [personalInfo, setPersonalInfo] = useState(initialValues);

  // Mutation function for updating personal info
  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (updatedInfo) => {
      const response = await fetch(`http://localhost:4000/update-user/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedInfo),
      });

      // If the response is not okay, extract the error message from the response
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update personal information'); // Use the server message or a fallback
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Personal information updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    },
    onError: (error) => {
      // Display the error message returned from the server in the toast
      toast.error(error.message || "Something went wrong.", {
        position: "top-right",
        autoClose: 5000,
      });
    },
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare updated fields (only include fields that have changed)
    const updatedFields = Object.keys(personalInfo).reduce((acc, key) => {
      if (personalInfo[key] !== initialValues[key]) {
        acc[key] = personalInfo[key];
      }
      return acc;
    }, {});

    // Only call the mutation if there are changes
    if (Object.keys(updatedFields).length > 0) {
      mutate(updatedFields);
    } else {
      console.log('No changes detected');
    }
  };

  return (
    <div className="overall-personal-info-update">
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullName">FULL NAME</label>
        <br />
        <input
          name="fullName"
          value={personalInfo.fullName}
          onChange={handleChange}
          type="text"
          className="form-control"
          placeholder="eg. Davis Mugo"
        />
        <label htmlFor="userName">USERNAME</label>
        <br />
        <input
          name="userName"
          value={personalInfo.userName}
          onChange={handleChange}
          type="text"
          className="form-control"
          placeholder="eg. codesamurai"
        />
        <label htmlFor="email">EMAIL</label>
        <br />
        <input
          name="email"
          value={personalInfo.email}
          onChange={handleChange}
          type="email"
          className="form-control"
          placeholder="eg. sample@gmail.com"
        />
        <div className="button-save-personal">
          <button
            className="btn btn-info text-light"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
        {error && (
          <p className="text-danger mt-2">Failed to update: {error.message}</p>
        )}
      </form>
    </div>
  );
}

export default Personalinfoupdate;


