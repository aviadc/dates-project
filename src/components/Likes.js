import React , {useContext} from 'react'
import Navbar from './Navbar';
import {UserListContext} from './UsersListContext';
import {Image} from 'cloudinary-react';

function Likes() {
  const context = useContext(UserListContext);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const liked = ()=>{
    return context.usersList.filter((user)=>{
      return user.likes.includes(currentUser.key);
    })
  }

  const displayUsers = ()=>{
    return liked().map((user)=>{
      return <div className='card' key={user.key}>
       <div className='card-imgDetails-container'>
          <div>
            <Image cloudName="dten2xlir"  publicId={user.imgUrl} height="80" width="80"/>
          </div>
          <div className='card-main-details'>
            <h4>{`${user.firstName}  ${user.lastName}`}</h4>
            <h4>{user.age}</h4>
            <h4>phone:{user.phoneNumber}</h4>
          </div>
        </div>
        <h4>hobbies: {user.hobbies.join(' ')}</h4>
        {/* <button>more details</button> */}
        <button onClick={()=>true} >like</button>
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
