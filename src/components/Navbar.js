import React, {useState,useContext} from 'react'
import { Link } from 'react-router-dom';
import {UserListContext} from './UsersListContext';
import "./navbar.css"
import "../index.css"
import datesApi from './Api';

function Navbar(props) {

  const [visibilty,setVisibilty] = useState("hidden");

  const context = useContext(UserListContext);
  // console.log(context);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const handleLogOut = ()=>{
    localStorage.clear();
  }
  const showDeleteWindow = () =>{
    setVisibilty("visible");
    console.log(currentUser);
  }

  const handleVisibilty=()=>{
    setVisibilty("hidden");
  }

  // const findIndex = (user)=> {
  //   for(let i=0;i<context.usersList.length;i++){
  //     if(context.usersList[i].id===user.id){
  //       return i;
  //     }
  //   }
  // }

  const deleteuser = async (myUser)=>{
    let tempList = context.usersList.filter((user)=>{
      return user.key!==myUser.key;
    })
    try{
      console.log(myUser.id);
      await datesApi.delete(`dates/${myUser.id}`);
      context.setUsersList(...tempList);
    }catch(e){
      console.log(e);
    }
  }
  
  

  // const deleteAllLikes = async (myUser)=>{
  //   context.usersList.forEach(user => {
  //     if(user.likes.includes(myUser.key)){
  //       const newLikes = user.likes.filter((element)=>{
  //         element!==myUser.key
  //       })
  //       await datesApi.put(`dates/${user.id}`,{likes: newLikes});
  //     }

  //     if(user.likedMe.includes(myUser.key)){
  //       const newLikedMe = user.likedMe.filter((element)=>{
  //         element!==myUser.key
  //       })
  //       await datesApi.put(`dates/${user.id}`,{likes: newLikedMe});
        
  //     }
  //   });
  // }

  const handleDelete= async ()=>{
    deleteuser(currentUser);
    localStorage.clear();
  }

  return (
    <div className='navbar'>
        <ul className='navbar-list'>
          <li className='navbar-list-li'> <Link to={`/matched`}>Matched</Link> </li>
          <li className='navbar-list-li'> <Link to={`/likes`}>Liked me</Link> </li>
          <li className='navbar-list-li'> <Link to={`/profile`}>profile</Link> </li>
          <li> <button onClick={handleLogOut}><a href='/' className='logout'>log out</a></button> </li>
          <li> <button onClick={showDeleteWindow}>Delete user</button> </li>
          <li> <button><Link to={"/"}> back to log in</Link> </button> </li>
        </ul>
        <div className='delete-window' style={{visibility: visibilty}}>
           <h2> ARE YOU SURE </h2>
           <div>
           <a href='/' className='logout'> <button onClick={handleDelete} >YES</button></a> <button onClick={handleVisibilty}>NO</button>
           </div>
        </div>
    </div>
  )
}

export default Navbar
