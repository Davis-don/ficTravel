import React from 'react'
import './dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from 'react-query';
import { MdMenu } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { useState,useEffect } from 'react';
import './admin.css'


function Adminaccount() {
  const [displaySide, setDisplaySide] = useState(true);
  const [userData,setUserData] = useState("")

  // Use react-query to fetch user data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: async () => {
      const token = sessionStorage.getItem('authToken')
      const response = await fetch('http://localhost:4000/get-single-user',{
        method:"GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`, 
        },
      }); 
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      return response.json(); 
    }
  });

  
  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);
  if (isLoading) {
    return <div>Loading dashboard data...</div>;
  }

  if (isError) {
    return <div>Error loading data: {error.message}</div>;
  }


  console.log(data)
  return (
    <div className='overrall-dashboard-page'>
      {/* Header dashboard */}
      <div className="dash-header ">
        <div
          className="left-dash-header rounded-circle clickable"
          onClick={() => setDisplaySide(!displaySide)}
        >
          <h3 className='menu-icon-dash'><MdMenu /></h3>
        </div>
        <div className="right-dash-header">
          <ul className='list-unstyled'>
            <li className='clickable'>
              <div className="icon-link-dash rounded-circle">
                <FaMessage className='li-icon-dash' />
              </div>
              <div className="name-component-dash">
                Messages
              </div>
            </li>
            <li className='clickable'>
              <div className="icon-link-dash rounded-circle">
                <IoIosNotifications className='li-icon-dash fs-2' />
              </div>
              <div className="name-component-dash">
                Notification
              </div>
            </li>
            <li className='clickable'>
              <div className="icon-link-dash rounded-circle bg-light avatar-header-dash">
              </div>
              <div className="name-component-dash">
                {userData.fullName}
              </div>
            </li>
          </ul>
        </div>
      </div>
      {/* End of header dash */}

      <div className="dash-body">
        {/* Left dash body */}
        {displaySide && (
          <div className="left-sidebar-dashboard">
            <div className="user-account-dash-div">
              <div className="avatar-section-dash rounded-circle">
              </div>
              <div className="avatar-description-container">
                <h4 className='text-light'>{userData.fullName}</h4>
                <h5 className='text-secondary'>{userData.role}</h5>
              </div>
            </div>
            <div className="nav-links-listing-dash">
              {/* Add navigation links here */}
               <ul className='list-unstyled'>
                <li className='text-light fs-4 clickable'>Dashboard</li>
               </ul>
            




               



            </div>
          </div>
        )}
        {/* Right sidebar */}
        <div className="right-sidebar-body">
          
    
        </div>
      </div>
    </div>
  );
}

export default Adminaccount;
