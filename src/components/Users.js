import React , {useState} from 'react'

function Users(props) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div>
      {console.log(localStorage)}
      <h3>{user.name}</h3>
    </div>
  )
}

export default Users
