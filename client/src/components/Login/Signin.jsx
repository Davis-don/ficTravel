import React, { useState } from 'react';
import './signin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMutation } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUserStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
import useFormStore from '../../store/userFormStore';

function Signin() {
  const toggleForm = useFormStore((state)=>state.toggleForm)
  const navigate = useNavigate();
  const addNewUser = useUserStore((state) => state.addUser);

  const [loginData, setLoginData] = useState({
    inputName: '',
    password: '',
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate } = useMutation({
    mutationFn: async (loginData) => {
      try {
        const response = await fetch('http://localhost:4000/auth/login', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });

        if (!response.ok) {
          const errMessage = await response.json();
          throw new Error(errMessage.message);
        }

        return response.json();
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      // Store token in session storage
      sessionStorage.setItem('authToken', data.authToken);

      // Add user info to store
      addNewUser(data.user);

      // Show success toast
      toast.success('Login Successful!', {
        position: 'top-right',
        autoClose: 3000,
      });

      // Navigate based on user role
      const roleRoutes = {
        USER: '/',
        ADMIN: '/admin/account',
        AGENT: '/agent/account',
      };
      setTimeout(() => {
        navigate(roleRoutes[data.user.role] || '/');
      }, 3000);
    },
    onError: (error) => {
      // Show error toast
      toast.error(error.message || 'Login failed. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(loginData);
    setTimeout(() => {
      toggleForm()
    },4000);
    
  };

  return (
    <div className='overall-signin-component'>
      <ToastContainer />
      <h1>Sign in to Your Account</h1>

      <form onSubmit={handleSubmit}>
        <input
          required
          onChange={handleChange}
          name='inputName'
          className='form-control fs-4'
          type='text'
          placeholder='Email or Username'
        />
        <input
          required
          onChange={handleChange}
          name='password'
          className='form-control fs-4'
          type='password'
          placeholder='Password'
        />
        <button  className='btn bg-primary text-light fs-4' type='submit'>
          Log in
        </button>
      </form>
    </div>
  );
}

export default Signin;
