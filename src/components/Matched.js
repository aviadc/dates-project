import React , {useState,useContext, useEffect} from 'react'
import {UserListContext} from './UsersListContext';
import {Image} from 'cloudinary-react';
import "./matched.css"
import datesApi from './Api';
import Navbar from './Navbar';

function Matched(props) {
  const context = useContext(UserListContext);
  const [currentUser,setCurrrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
  // useEffect(()=>{

  // })

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
    myUser[key] = [...value];
    let tempList = [...context.usersList];
    tempList[findIndex(user)] = {...myUser};
    context.setUsersList(tempList);
  }

  // localStorage.setItem("currentUser",JSON.stringify(currentUser))

  const handleLike = async (user)=>{
    // console.log(user.firstName);
    try{
      const likedme = [[...user.likedMe],currentUser.firstName];
      const likes = [...currentUser.likes,user.firstName];
      await datesApi.put(`dates/${user.id}`,{likedMe: likedme});
      updateUser(user,"likedMe",likedme);
      await datesApi.put(`dates/${currentUser.id}`,{likes: likes});
      updateUser(currentUser,"likes",likes);
      localStorage.setItem("currentUser",JSON.stringify(context.usersList[findIndex(currentUser)]));
      setCurrrentUser(JSON.parse(localStorage.getItem("currentUser")));
    }catch(e){
      console.log(e)
    }
    // console.log(currentUser);
  }

  const matched = ()=>{
    const listWithoutMe = context.usersList.filter((user)=>{
      return user.key!==currentUser.key;
    })
    return listWithoutMe.filter((user)=>{
      return comapreArr(currentUser.hobbies,user.hobbies);
    })
  }

  const comapreArr = (arr1,arr2)=>{
    let counter = 0;
    for(let i=0;i<arr1.length;i++){
      for(let j=0;j<arr2.length;j++){
        if(arr1[i]===arr2[j]){
          counter++;
        }
      }
    }
    if(counter>1){
      return true;
    }else{
      return false;
    }
  }

  const displayusers = ()=>{
    return matched().map((user)=>{
      return <div className='card' key={user.key}>
        <div className='card-imgDetails-container'>
          <div>
            <Image cloudName="dten2xlir"  publicId={user.imgUrl} height="80" width="80"/>
          </div>
          <div className='card-main-details'>
            <h4>{user.firstName}</h4>
            <h4>{user.age}</h4>
          </div>
        </div>
        <h4>hobbies: {user.hobbies.join(' ')}</h4>
        {/* <button>more details</button> */}
        <button onClick={()=>handleLike(user)} >like</button>
      </div>
    })
  }
  return (
    <>
      <Navbar />
      <h2>Matched</h2>
    <div className='matched-container'>
      {displayusers()}
      {/* {console.log(currentUser.hobbies)} */}
    </div>
    </>
  )
}

export default Matched
