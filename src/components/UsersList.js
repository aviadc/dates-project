import React ,{useState, useEffect} from 'react'
import datesApi from './Api';

function UsersList() {

  [usersList,setUsersList] = useState([]);

  useEffect(()=>{
    const fetch = async ()=>{
      try{
        const {data} = await datesApi.get("dates");
        // setUsersList(data);
        console.log(data);
      }catch(e){
        console.log(e);
      }
    }
    fetch();
  },[])
  return (
    <div>
        
    </div>
  )
}

export default UsersList
