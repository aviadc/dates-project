import React , {useState} from 'react'
import "./login.css"

function Login() {

  const  [email,setEmail] =  useState();
  const [password] =  useState();
  return (
    <div className='login-container'>
      <div className='login-form'> 
        <h3>Log in</h3>
        <div>
          email <input type="email"/>
        </div>
        <div>
          Password <input type="password"/>
        </div>
        <button>Log In</button>
        <h3>didn't have an acount? Sign up</h3>
      </div>
    </div>
  )
}

export default Login
