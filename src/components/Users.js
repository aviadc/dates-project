import React , {useState} from 'react'

function Users(props) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div>
      {console.log(localStorage)}
      <h3>{user.firstName}</h3>
      <button onClick={()=>props.history.goBack()}>go back</button>
    </div>
  )
}

export default Users
