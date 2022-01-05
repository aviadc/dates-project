import React , {useState,useContext} from 'react'
import "./login.css"
import { Link } from 'react-router-dom';
import {UserListContext} from './UsersListContext';
import datesApi from './Api';
import "../index.css"



function Login(props) {

  const [email,setEmail] =  useState();
  const [password,setPassword] =  useState();
  const [emailError,setEmailError] =  useState();
  const [passwordError,setPasswordError] =  useState();
  const context = useContext(UserListContext);

  const login = ()=>{
    isRightCredentials();
  }

  const isEmailExist =()=>{
    return context.usersList.find((user)=>{
     return user.email===email;
    })
  }

  const isRightCredentials = ()=>{
    const user =  isEmailExist(email);
    console.log(user);
    console.log(props);
    if(user){
      if(password===user.password){
        localStorage.setItem("currentUser",JSON.stringify(user))
        props.history.push(`/matched`);
      }else{
        setPasswordError("password incorrect");
      }
    }else{
      setEmailError("email incorrect");
    }
  }

  const randomNumber = (from,to)=>{
    return Math.floor(Math.random()*to)+from
  }

  



  const local = ()=>{
    console.log(localStorage);
  }

  
  return (
    <div className='login-container'>
      <h1 className='title' >welcome to my date</h1>
      <div className='login-form'> 
        <h3 className='login-title'>Log in</h3>
        <div>
         <input className='input-text' type="email" placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className='error'>{emailError}</div>
        <div>
         <input className='input-text' type="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className='error'>{passwordError}</div>
        <button onClick={login}>Log In</button>
        <button onClick={local}>local</button>
        <h3>didn't have an acount? <Link to={"/signup"} > Sign up </Link> </h3>
      </div>
    </div>
  )
}

export default Login
