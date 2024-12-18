import React, { Component } from 'react'
import './dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from 'react-query';
import { MdMenu } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { useState,useEffect } from 'react';
import App from '../features/Chatapp/App';
import './useraccount.css'
import Userdashboard from '../components/UserDashboard/Userdashboard';
import { useNavigate } from 'react-router-dom';





function  Usermessages(){
  return (
    <div className="overall-usermessage-container">
      <App/>
    </div>
  )
}





function Useraccount() {
  const navigate = useNavigate()
  const [displaySide, setDisplaySide] = useState(true);
  const [userData,setUserData] = useState("")
  const [dasboard,setDashboard] = useState(true)
  const [message,setMessage] = useState(false)
const [bookNow,setBookNow] = useState(false)
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



  //render component
let component;
  if(dasboard === true){
   component = <Userdashboard/>
  }
  else if(message === true){
  component =<Usermessages/>
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
     <li onClick={()=>navigate('/')} className='text-light fs-4 clickable'>Book Now</li>
     {/* <li onClick={()=>{setDashboard(false);setMessage(false);setBookNow(true)}} className='text-light fs-4 clickable'>Book Now</li> */}
      <li onClick={()=>{setDashboard(true);setMessage(false);setBookNow(false)}} className='text-light fs-4 clickable'>Dashboard</li>
      <li onClick={()=>{setDashboard(false);setMessage(true);setBookNow(false)}} className='text-light fs-4 clickable'>Messages</li>
     </ul>




               



            </div>
          </div>
        )}
        {/* Right sidebar */}
        <div className="right-sidebar-body">
          {component}
    
        </div>
      </div>
    </div>
  );
}

export default Useraccount;

