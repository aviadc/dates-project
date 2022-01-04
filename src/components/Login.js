import React , {useState,useContext} from 'react'
import "./login.css"
import { Link } from 'react-router-dom';
import {UserListContext} from './UsersListContext';

function Login(props) {

  const [email,setEmail] =  useState();
  const [password,setPassword] =  useState();
  const context = useContext(UserListContext);

  const login = ()=>{
    isRightCredentials();
  }

  const isEmailExist =()=>{
    return context.find((user)=>{
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
        props.history.push(`/users/${user.key}`);
      }else{
        console.log("password incorrect")
      }
    }else{
      console.log("email incorrect")
    }
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
        <button onClick={login}>Log In</button>
        <h3>didn't have an acount? <Link to={"/signup"} > Sign up </Link> </h3>
      </div>
    </div>
  )
}

export default Login
