import React from 'react'
import { Link } from 'react-router-dom';
import "./navbar.css"

function Navbar(props) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const handleLogOut = ()=>{
    props.history.go(-2);
    localStorage.clear();
  }
  return (
    <div className='navbar'>
        <ul className='navbar-list'>
          <li> <Link to={`/matched/${user.key}`}>Matched</Link> </li>
          <li> <Link to={`/likes/${user.key}`}>Likes</Link> </li>
          <li> <Link to={`/likes/${user.key}`}>profile</Link> </li>
          <li> <button onClick={handleLogOut}>log out</button> </li>
          <li></li>
        </ul>
    </div>
  )
}

export default Navbar
