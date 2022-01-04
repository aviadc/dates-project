import React , {useState} from 'react'

function Users(props) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div>
      <div className='navbar'>
        <ul>
          <li>Matched</li>
          <li>Likes you</li>
          <li></li>
        </ul>
     </div>
      {console.log(localStorage)}
      <h3>{user.firstName}</h3>
      {console.log(props.history)}
      <button onClick={()=>props.history.go(-2)}>log out</button>
    </div>
  )
}

export default Users
