import React from 'react'
import './signup.css'
import { useState } from 'react'
import {useMutation} from 'react-query'
import "bootstrap/dist/css/bootstrap.min.css"


function Signup() {
  const [passwordMatch,setPasswordMatch] = useState(false)
  const [errorMessage,setErrorMessage] = useState({
    statusOk:false,
    message:""
  })
  const [success,setSuccess]=useState(false)
    const [firtsForm,setFirstForm] = useState(true)
    const [secondForm,setSecondForm] = useState(false)
    const [thirdForm,setThirdForm] = useState(false)
    const [signupData,setSignupData] = useState({
      userName:"",
      fullName:"",
      email:"",
      password:"",
      confirmPassword:"",
    })

    let handleChange = (e)=>{
      setSignupData({
        ...signupData,[e.target.name]:e.target.value
      })
      
    }

    //use mutate
    const {mutate,isError,error} = useMutation({
      mutationFn:async (userData)=>{

    try{
      let response = await fetch("http://localhost:4000/create-account",{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(userData)
      })
      if(!response.ok){
        const errordata = await response.json();
        setErrorMessage({
          statusOk:true,
          message:errordata.message
        });

        setTimeout(() => {
          setErrorMessage({
            statusOk:false,
            message:""
          });
        }, 3000);
        return;
      }
      setSuccess(true);
        setTimeout(() => {
          setSuccess(false)
        }, 3000);
    }
    catch(e){
      console.error("Error in mutationFn:", e);
      throw e;
    }
          
      
      },
      onSuccess:()=>{
        //on success
      },
      isError:()=>{
  //console.log("error")
  //error
      }
    })

    const handleSubmit = (e)=>{
      e.preventDefault();
      //check if confirm password matches
      if(signupData.password === signupData.confirmPassword){
         mutate(signupData)
          return
      }
      else{
        setPasswordMatch(true);
        setTimeout(() => {
          setPasswordMatch(false);
        }, 3000);
      }
    }
  return (
    <div className='ovearall-signup-container'>

       { passwordMatch && <div class="alert alert-warning fs-4">
    <strong >Warning!</strong> password and confirm password mismatch
  </div>}

  {success &&  <div class="alert alert-success fs-4">
    <strong >Success</strong> Account created successfully
  </div>}
  {errorMessage.statusOk &&  <div class="alert alert-danger fs-4">
    <strong >Error</strong> {errorMessage.message}
  </div>}
         <h1>Create an account</h1>

<form onSubmit={handleSubmit}>
    { firtsForm && <>
   <input required onChange={handleChange} name="userName" className='form-control fs-4' type="text" placeholder='Username*'/>
   <input required onChange={handleChange} name='fullName' className='form-control fs-4' type="text" placeholder='Full Name'/>
   <button onClick={()=>{setFirstForm(false);setSecondForm(true);setThirdForm(false)}} className='btn bg-info text-light fs-4' type='button'>next</button>

   </>}
   { secondForm && <>
   <input required name='email' onChange={handleChange} className='form-control fs-4' type="email" placeholder='Email*'/>
   <input required onChange={handleChange} name='password' className='form-control fs-4' type="password" placeholder='Password'/>
   <button onClick={()=>{setFirstForm(false);setSecondForm(false);setThirdForm(true)}} className='btn bg-info text-light fs-4' type='button'>next</button>

   </>}
   {thirdForm && <>
    <input required onChange={handleChange} name='confirmPassword' className='form-control fs-4' type="password" placeholder='confirm Password'/>

    <button className='btn bg-primary text-light fs-4' type='submit'>Register</button>
    </>
   }
</form>
        </div>
  )
}

export default Signup