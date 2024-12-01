import React, { useState } from 'react';
import './signup.css';
import { useMutation } from 'react-query';
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFormStore from '../../store/userFormStore';

function Signup({register}) {
  const toggleForm = useFormStore((state)=>state.toggleForm)
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    statusOk: false,
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [firtsForm, setFirstForm] = useState(true);
  const [secondForm, setSecondForm] = useState(false);
  const [thirdForm, setThirdForm] = useState(false);
  const [signupData, setSignupData] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role:register
  });

  let handleChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  // Mutation using react-query
  const { mutate, isLoading } = useMutation({
    mutationFn: async (userData) => {
      const response = await fetch("http://localhost:4000/create-account", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage({
          statusOk: true,
          message: errorData.message,
        });

        toast.error(errorData.message || "Failed to create account", {
          position: "top-right",
          autoClose: 3000,
        });

        setTimeout(() => {
          setErrorMessage({
            statusOk: false,
            message: "",
          });
        }, 3000);
        return;
      }

      setSuccess(true);
      toast.success("Account created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong.", {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signupData.password === signupData.confirmPassword) {
      mutate(signupData);
      setTimeout(() => {
        toggleForm()
      }, 3000);
      
      return;
    } else {
      setPasswordMatch(true);
      toast.warning("Password and Confirm Password do not match.", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        setPasswordMatch(false);
      }, 3000);
    }
  };

  return (
    <div className='ovearall-signup-container'>
      <ToastContainer /> {/* Toast container for notifications */}
      
      {passwordMatch && (
        <div className="alert alert-warning fs-4">
          <strong>Warning!</strong> Password and Confirm Password mismatch
        </div>
      )}

      {success && (
        <div className="alert alert-success fs-4">
          <strong>Success</strong> Account created successfully
        </div>
      )}

      {errorMessage.statusOk && (
        <div className="alert alert-danger fs-4">
          <strong>Error</strong> {errorMessage.message}
        </div>
      )}

      <h1>Create an account</h1>

      <form onSubmit={handleSubmit}>
        {firtsForm && (
          <>
            <input
              required
              onChange={handleChange}
              name="userName"
              className='form-control fs-4'
              type="text"
              placeholder='Username*'
            />
            <input
              required
              onChange={handleChange}
              name='fullName'
              className='form-control fs-4'
              type="text"
              placeholder='Full Name'
            />
            <button
              onClick={() => {
                setFirstForm(false);
                setSecondForm(true);
                setThirdForm(false);
              }}
              className='btn bg-info text-light fs-4'
              type='button'
            >
              Next
            </button>
          </>
        )}

        {secondForm && (
          <>
            <input
              required
              name='email'
              onChange={handleChange}
              className='form-control fs-4'
              type="email"
              placeholder='Email*'
            />
            <input
              required
              onChange={handleChange}
              name='password'
              className='form-control fs-4'
              type="password"
              placeholder='Password'
            />
            <button
              onClick={() => {
                setFirstForm(false);
                setSecondForm(false);
                setThirdForm(true);
              }}
              className='btn bg-info text-light fs-4'
              type='button'
            >
              Next
            </button>
          </>
        )}

        {thirdForm && (
          <>
            <input
              required
              onChange={handleChange}
              name='confirmPassword'
              className='form-control fs-4'
              type="password"
              placeholder='Confirm Password'
            />
            <button
              className='btn bg-primary text-light fs-4'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default Signup;

