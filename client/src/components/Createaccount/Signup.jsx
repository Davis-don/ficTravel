import React from 'react'
import './signup.css'
import { useState } from 'react'

function Signup() {
    const [firtsForm,setFirstForm] = useState(true)
    const [secondForm,setSecondForm] = useState(false)
  return (
    <div className='ovearall-signup-container'>
         <h1>Create an account</h1>

<form>
    { firtsForm && <>
   <input className='form-control fs-4' type="text" placeholder='Username*'/>
   <input className='form-control fs-4' type="text" placeholder='Full Name'/>
   <button onClick={()=>{setFirstForm(false);setSecondForm(true)}} className='btn bg-info text-light fs-4' type='button'>next</button>

   </>}
   { secondForm && <>
   <input className='form-control fs-4' type="email" placeholder='Email*'/>
   <input className='form-control fs-4' type="password" placeholder='Password'/>
   <button className='btn bg-primary text-light fs-4' type='submit'>Register</button>

   </>}
</form>
        </div>
  )
}

export default Signup