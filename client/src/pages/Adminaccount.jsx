import React from 'react'
import './agentaccount.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaBookAtlas,FaRegMessage } from "react-icons/fa6";
import { MdDashboard,MdLightMode } from "react-icons/md";
import { VscTasklist } from "react-icons/vsc";
import { IoMdSettings,IoIosLogOut } from "react-icons/io";
import Admindash from '../components/Admindashboard/Admindash';
import Admintasks from '../components/Admindashboard/Admintasks';
import Admincontrols from '../components/Admindashboard/Admincontrol';
import Agentsettings from '../components/Agentdashboard/Agentsettings';
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';
import useUserStore from '../store/userStore';
import {useNavigate} from 'react-router-dom'
import { MdMenu } from "react-icons/md";

function Adminaccount() {
  const logout = useUserStore((state)=>state.logout)
  const navigate = useNavigate()
const [dashDisplay,setDashDisplay] = useState(true)
const [tasks,setTasks] = useState(false)
const [Admincontrol,setAdminControl] = useState(false)
const [settings,setSettings] = useState(false)
const [sidebar,setSidebar]=useState(true)
const activeLink = {
backgroundColor:"white",
width:"13rem",
height:"4rem",
paddingInline:"1rem",
border:"1px solid black",
borderRadius:"5px"
}

let renderedComponent;
if(dashDisplay){
renderedComponent = <Admindash/>
}
else if(tasks){
  renderedComponent = <Admintasks/>
}
else if(Admincontrol){
  renderedComponent = <Admincontrols/>
}
else if (settings){
  renderedComponent = <Agentsettings/>
}


const handleLogout = ()=>{
  logout();
  navigate('/')
}
  return (
    <div className='overall-agent-acount-page'>

      
    {sidebar && 
     <div className="left-side-agent-account small-screen-side-agent bg-light">
        <h1 className='close-btn right-side-header-agent'><IoMdClose className='fs-1' onClick={()=>setSidebar(!sidebar)}/></h1>
         <div  className="left-side-agent-header">
             <div className="icon-logo-accout-agent"><FaBookAtlas className='fs-1'/></div>
             <div className="logo-name-agent-account"><h4 className='h3'>Bookhut</h4></div>
         </div>
         <div className="left-side-agent-body">
          <div className="agent-general-menu">
            <h5 className='text-secondary'>General Menu</h5>
            <ul className='list-unstyled'>
              <li className='clickable ' onClick={()=>{setDashDisplay(true);setTasks(false);setAdminControl(false);setSettings(false);setSidebar(false)}}  style={dashDisplay ? activeLink : {}} ><span><MdDashboard className='fs-3' /></span><span    className={dashDisplay?"text-dark fs-4":"fs-4 text-secondary"}>Dashboard</span></li>
              <li className='clickable' onClick={()=>{setDashDisplay(false);setTasks(true);setAdminControl(false);setSettings(false);setSidebar(false)}}  style={tasks ? activeLink : {}}  ><span><VscTasklist className='fs-3' /></span><span className={tasks?"text-dark fs-4":"fs-4 text-secondary"}>Tasks</span></li>
              <li className='clickable'  onClick={()=>{setDashDisplay(false);setTasks(false);setAdminControl(true);setSettings(false);setSidebar(false)}} style={Admincontrol ? activeLink : {}}><span><FaRegMessage className='fs-3' /></span><span className={Admincontrol?"text-dark fs-4":"fs-4 text-secondary"}>Control</span></li>
            </ul>
          </div>
          <div className="agent-support-menu">
          <div className="agent-general-menu">
            <h5 className='text-secondary'>Support</h5>
            <ul className='list-unstyled'>
              <li className="clickable" onClick={()=>{setDashDisplay(false);setTasks(false);setAdminControl(false);setSettings(true);setSidebar(false)}} style={settings ? activeLink : {}}><span><IoMdSettings className='fs-3' /></span><span className='fs-4 text-secondary'>Settings</span></li>
              <li onClick={handleLogout} className='clickable'><span><IoIosLogOut className='fs-3' /></span><span className='fs-4 text-secondary'>Logout</span></li>
            </ul>
          </div>
          </div>
         </div>
         
         <div className="left-side-footer-agent">
         <h3 className='clickable'><span><MdLightMode className='fs-3' /></span><span className='fs-4 text-secondary'>Light mode</span></h3>
         </div>
      </div>}
      


    {/* Large screen */}
    {
     <div className="left-side-agent-account large-screen-side-agent bg-light">
        <h1 className='close-btn right-side-header-agent'><IoMdClose className='fs-1' onClick={()=>setSidebar(!sidebar)}/></h1>
         <div  className="left-side-agent-header">
             <div className="icon-logo-accout-agent"><FaBookAtlas className='fs-1'/></div>
             <div className="logo-name-agent-account"><h4 className='h3'>Bookhut</h4></div>
         </div>
         <div className="left-side-agent-body">
          <div className="agent-general-menu">
            <h5 className='text-secondary'>General Menu</h5>
            <ul className='list-unstyled'>
              <li className='clickable ' onClick={()=>{setDashDisplay(true);setTasks(false);setAdminControl(false);setSettings(false);setSidebar(false)}}  style={dashDisplay ? activeLink : {}} ><span><MdDashboard className='fs-3' /></span><span    className={dashDisplay?"text-dark fs-4":"fs-4 text-secondary"}>Dashboard</span></li>
              <li className='clickable' onClick={()=>{setDashDisplay(false);setTasks(true);setAdminControl(false);setSettings(false);setSidebar(false)}}  style={tasks ? activeLink : {}}  ><span><VscTasklist className='fs-3' /></span><span className={tasks?"text-dark fs-4":"fs-4 text-secondary"}>Tasks</span></li>
              <li className='clickable'  onClick={()=>{setDashDisplay(false);setTasks(false);setAdminControl(true);setSettings(false);setSidebar(false)}} style={Admincontrol ? activeLink : {}}><span><FaRegMessage className='fs-3' /></span><span className={Admincontrol?"text-dark fs-4":"fs-4 text-secondary"}>Control</span></li>
            </ul>
          </div>
          <div className="agent-support-menu">
          <div className="agent-general-menu">
            <h5 className='text-secondary'>Support</h5>
            <ul className='list-unstyled'>
              <li className="clickable" onClick={()=>{setDashDisplay(false);setTasks(false);setAdminControl(false);setSettings(true);setSidebar(false)}} style={settings ? activeLink : {}}><span><IoMdSettings className='fs-3' /></span><span className='fs-4 text-secondary'>Settings</span></li>
              <li onClick={handleLogout} className='clickable'><span><IoIosLogOut className='fs-3' /></span><span className='fs-4 text-secondary'>Logout</span></li>
            </ul>
          </div>
          </div>
         </div>
         
         <div className="left-side-footer-agent">
         <h3 className='clickable'><span><MdLightMode className='fs-3' /></span><span className='fs-4 text-secondary'>Light mode</span></h3>
         </div>
      </div>}








      <div className="right-side-agent-account">
        <div className="right-side-header-agent">
          <MdMenu onClick={()=>setSidebar(!sidebar)} className='menu-bar-agent'/>
        </div>
       {renderedComponent}
      </div>
      </div>
    
  )
}

export default Adminaccount