import React , {useState,useContext,useRef} from 'react'
import Navbar from './Navbar';
import {Image} from 'cloudinary-react';
import {UserListContext} from './UsersListContext';
import datesApi from './Api';
import "./profile.css"

function Profile() {
  const context = useContext(UserListContext);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const inputRef = useRef();

  const [password,setPassword] = useState(currentUser.password);
  const [passwordError,setPasswordError] = useState("");

  const findIndex = (user)=> {
    for(let i=0;i<context.usersList.length;i++){
      if(context.usersList[i].id===user.id){
        return i;
      }
    }
  }

  const updateUser = (user,key,value)=>{
    let myUser = {...user};
    console.log(myUser);
    myUser[key] = value;
    let tempList = [...context.usersList];
    tempList[findIndex(user)] = {...myUser};
    context.setUsersList(tempList);
  }

  const updatePassword = async ()=>{
    if(password<6){
      console.log(password);
      setPasswordError("not valid")
    }else{
      await datesApi.put(`dates/${currentUser.id}`,{password: password});
      updateUser(currentUser,"password",password);
      setPasswordError("ok");
      inputRef.current.value = "";
    }
  }
  return (
    <div>
      <Navbar />
      <div className='profile-container'>
          <div>
            <Image cloudName="dten2xlir"  publicId={currentUser.imgUrl} height="150" width="150"/>
          </div>
          <ul className='profile-list'>
            <li><span className='profile-pre'>Email:</span><span className='profile-post'>{currentUser.email}</span></li>
            <li><span className='profile-pre'>password:</span>
                <button onClick={updatePassword}>update</button><span>{passwordError}</span><input ref={inputRef} type="text" onChange={(e)=>setPassword(e.target.value)}/>
                <span className='profile-post'>{password}</span></li>
            <li><span className='profile-pre'>Name:</span><span className='profile-post'>{`${currentUser.firstName}  ${currentUser.lastName}`}</span></li>
            <li><span className='profile-pre'>Age:</span><span className='profile-post'>{currentUser.age}</span></li>
            <li><span className='profile-pre'>Hobbies:</span><span className='profile-post'>{currentUser.hobbies.join("  ")}</span></li>
          </ul>
          {/* <h3>Email:  {currentUser.email}</h3>
          <h3>password:  {currentUser.password}</h3>
          <h3>name:  {`${currentUser.firstName}  ${currentUser.lastName}`}</h3>
          <h3>Age:  {currentUser.age}</h3>
          <h3>hobbies:  {currentUser.hobbies.join("  ")}</h3> */}
      </div>
     
    </div>
  )
}

export default Profile
