import React from 'react'
import { Link } from 'react-router-dom';
import "./navbar.css"

function Navbar(props) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const handleLogOut = ()=>{
    localStorage.clear();
  }
  const back = () =>{
   console.log(user);
   console.log(props);
  }

  return (
    <div className='navbar'>
        <ul className='navbar-list'>
          <li> <Link to={`/matched`}>Matched</Link> </li>
          <li> <Link to={`/likes`}>Liked me</Link> </li>
          <li> <Link to={`/profile`}>profile</Link> </li>
          <li> <button onClick={handleLogOut}><Link to={"/"}> log out</Link> </button> </li>
          <li> <button onClick={back}>Delete user</button> </li>
          <li> <button><Link to={"/"}> back to log in</Link> </button> </li>
      
        </ul>
    </div>
  )
}

export default Navbar
