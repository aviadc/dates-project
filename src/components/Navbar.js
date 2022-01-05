import React, {useState,useContext} from 'react'
import { Link } from 'react-router-dom';
import {UserListContext} from './UsersListContext';
import "./navbar.css"
import "../index.css"

function Navbar(props) {

  const [visibilty,setVisibilty] = useState("hidden");

  const context = useContext(UserListContext);
  console.log(context);
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const handleLogOut = ()=>{
    localStorage.clear();
  }
  const showDeleteWindow = () =>{
    setVisibilty("visible");
    console.log(user);
    console.log(props);
  }

  const handleVisibilty=()=>{
    setVisibilty("hidden");
  }

  return (
    <div className='navbar'>
        <ul className='navbar-list'>
          <li className='navbar-list-li'> <Link to={`/matched`}>Matched</Link> </li>
          <li className='navbar-list-li'> <Link to={`/likes`}>Liked me</Link> </li>
          <li className='navbar-list-li'> <Link to={`/profile`}>profile</Link> </li>
          <li> <button onClick={handleLogOut}><Link className='logout' to={"/"}> log out</Link> </button> </li>
          <li> <button onClick={showDeleteWindow}>Delete user</button> </li>
          <li> <button><Link to={"/"}> back to log in</Link> </button> </li>
        </ul>
        <div className='delete-window' style={{visibility: visibilty}}>
           <h2> ARE YOU SURE </h2>
           <div>
           <button>YES</button> <button onClick={handleVisibilty}>NO</button>
           </div>
        </div>
    </div>
  )
}

export default Navbar
