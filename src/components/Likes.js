import React , {useContext} from 'react'
import Navbar from './Navbar';
import {UserListContext} from './UsersListContext';
import {Image} from 'cloudinary-react';

function Likes() {
  const context = useContext(UserListContext);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const liked = ()=>{
    return context.usersList.filter((user)=>{
      return user.likes.includes(currentUser.firstName);
    })
  }

  const displayUsers = ()=>{
    return liked().map((user)=>{
      return <div className='card' key={user.key}>
        <Image cloudName="dten2xlir"  publicId={user.imgUrl}/>
        <h4>{user.firstName}</h4>
        <h4>{user.age}</h4>
        <h4>{user.hobbies.join(' ')}</h4>
        <button>more details</button>
        <button >like</button>
      </div>
    })
  }
  return (
    <div>
      <Navbar />
      {displayUsers()}
    </div>
  )
}

export default Likes
