import React from 'react'

function Signup() {
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
        <button>Sign up</button>
      </div>
    </div>
  )
}

export default Signup
