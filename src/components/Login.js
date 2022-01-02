import React , {useState} from 'react'
import "./login.css"
import { Link } from 'react-router-dom';
import Signup from './Signup';

function Login() {

  const  [email,setEmail] =  useState();
  const [password,setPassword] =  useState();

  const login = ()=>{

  }

  const isEmailExist =()=>{
    
  }

  
  return (
    <div className='login-container'>
      <div className='login-form'> 
        <h3>Log in</h3>
        <div>
          email <input type="email" onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div>
          Password <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <button>Log In</button>
        <h3>didn't have an acount? <Link to={"/signup"} > Sign up </Link> </h3>
      </div>
    </div>
  )
}

export default Login
