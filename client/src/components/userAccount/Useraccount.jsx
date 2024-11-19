import React from 'react'
import './useraccount.css'
import { IoMdClose } from "react-icons/io";
import 'bootstrap/dist/css/bootstrap.min.css'
import Signin from '../Login/Signin';
import Signup from '../Createaccount/Signup';
import { useState } from 'react';
import useFormStore from '../../store/userFormStore';
function Useraccount() {
  const toggleFormState = useFormStore((state)=>state.toggleForm)
  const [signin,setSignin] = useState(true)
  const [signup,setSignup]=useState(false)


  return (
    <div className='overall-login-component'>
        <div className="user-component-header">
          <div onClick={()=>toggleFormState()} className="close-btn clickable">
          <IoMdClose  className='fs-2'/>
          </div>
          <div className="nav-links-signup-signin">
            <ul className='list-unstyled'>
              <li onClick={()=>{setSignin(true);setSignup(false)}} className={signin ? "fs-3 text-primary clickable":"fs-3 clickable"}>Signin</li>
              <li onClick={()=>{setSignin(false);setSignup(true)}} className={signup ? "fs-3 text-primary clickable":"fs-3 clickable"}>Signup</li>
            </ul>
          </div>
        </div>
        <div className="user-component-body">
      {
        signup && <Signup/>
      }
        {
        signin && <Signin/>
      }
        </div>
        <div className="user-component-footer"></div>
        </div>
  )
}

export default Useraccount