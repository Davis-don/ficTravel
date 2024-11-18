import React from 'react'
import './signin.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function Signin() {
  return (
    <div className='overall-signin-component'>
        <h1>Sign in to Your account</h1>

         <form>
            <input className='form-control fs-4' type="email" placeholder='Email or Username'/>
            <input className='form-control fs-4' type="password" placeholder='Password'/>
            <button className='btn bg-primary text-light fs-4' type='submit'>Log in</button>
         </form>
            
        </div>
  )
}

export default Signin