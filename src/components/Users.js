import React  from 'react'
// import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function Users(props) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const handleLogOut = ()=>{
    localStorage.clear();
    props.history.go(-2);
  }
  return (
    <div>
      <Navbar />
      {console.log(localStorage)}
      <h3>{user.firstName}</h3>
      {console.log(props.history)}
      <button onClick={handleLogOut}>log out</button>
    </div>
  )
}

export default Users
