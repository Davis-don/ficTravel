import React from 'react'
import './signin.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useMutation} from 'react-query'
import { useState } from 'react'
import useUserStore from '../../store/userStore'
import { useNavigate } from 'react-router-dom'

function Signin() {
  const navigate = useNavigate();
  const addNewUser = useUserStore((state)=>state.addUser)
  const [success,setSuccess] = useState(false)
  const [errorMessage,setErrorMessage] = useState({
    statusOk:true,
    message:""
  })
   const [loginData,setLoginData] = useState({
    inputName:"",
    password:""
   })
 
   let handleChange = (e)=>{
    setLoginData({
      ...loginData,[e.target.name]:e.target.value
    })
   }

   

  //use mutatation hook
  const {mutate,isError,error} = useMutation({
    mutationFn: async (loginData)=>{
      try{
     const response = await fetch("http://localhost:4000/auth/login",{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(loginData)
     })
     if(!response.ok){
      const errMessage = await response.json();
      setErrorMessage({
        statusOk:false,
        message:errMessage.message
      })
      setTimeout(() => {
        setErrorMessage({
          statusOk:true,
          message:""
        })
      }, 3000);
      return;
     }
     setSuccess(true);
     setTimeout(() => {
      setSuccess(false)
     }, 3000);
     return response.json();
      }
      catch (e){
       throw e;
      }
    },
    onSuccess:(data)=>{
      //put token in a session storage
      sessionStorage.setItem("authToken",data.authToken);
      //push user info into a user store;
      addNewUser(data.user);
      setTimeout(() => {
        navigate("/account/dashboard")
      }, 3000);
    }
  })

  let handleSubmit=(e)=>{
    e.preventDefault();
    mutate(loginData)
  }
  return (
    <div className='overall-signin-component'>
      {!errorMessage.statusOk && <div class="alert alert-danger fs-4">
    <strong >Error</strong> {errorMessage.message}
  </div>}
  {success && <div class="alert alert-success fs-4">
    <strong >Success</strong> login Sucessful
  </div>}
        <h1>Sign in to Your account</h1>

         <form onSubmit={handleSubmit}>
            <input required onChange={handleChange} name='inputName' className='form-control fs-4' type="text" placeholder='Email or Username'/>
            <input required onChange={handleChange} name='password' className='form-control fs-4' type="password" placeholder='Password'/>
            <button className='btn bg-primary text-light fs-4' type='submit'>Log in</button>
         </form>
            
        </div>
  )
}

export default Signin