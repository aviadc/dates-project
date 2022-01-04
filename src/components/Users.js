import React , {useState} from 'react'
import { Link } from 'react-router-dom';

function Users(props) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div>
      <div className='navbar'>
        <ul>
          <li> <Link to={`/matched/${user.key}`}>Matched</Link> </li>
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
