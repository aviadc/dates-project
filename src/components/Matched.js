import React , {useState,useContext, useEffect} from 'react'
import {UserListContext} from './UsersListContext';
import {Image} from 'cloudinary-react';
import "./matched.css"

function Matched() {
  const context = useContext(UserListContext);
  // useEffect(()=>{

  // })
  const displayusers = ()=>{
    return context.usersList.map((user)=>{
      return <div className='card' key={user.key}>
        <Image cloudName="dten2xlir"  publicId={user.imgUrl}/>
        <h4>{user.firstName}</h4>
        <h4>{user.age}</h4>
        <button>more details</button>
        <button>like</button>
      </div>
    })
  }
  return (
    <>
     <h2>Matched</h2>
    <div className='matched-container'>
      {displayusers()}
    </div>
    </>
  )
}

export default Matched
