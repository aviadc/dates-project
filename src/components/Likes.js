import React , {useState,useContext} from 'react'
import Navbar from './Navbar';
import {UserListContext} from './UsersListContext';

function Likes() {
  const context = useContext(UserListContext);
  return (
    <div>
      <Navbar />
      
    </div>
  )
}

export default Likes
