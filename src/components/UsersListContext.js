import React ,{useState, useEffect,createContext} from 'react'
import datesApi from './Api';

export const UserListContext = createContext();

function UsersListContextProvider(props) {

 const [usersList,setUsersList] = useState([]);
    useEffect(()=>{
      const fetch = async ()=>{
        try{
          const {data} = await datesApi.get("dates");
          setUsersList(data)
        }catch(e){
          console.log(e);
        }
      }
      if(usersList.length===0){
        fetch();
      }
    },[])
  
  const hey = "hey";
  return (
    <UserListContext.Provider value={usersList}>
        {props.children}
    </UserListContext.Provider>
  )
}

export default UsersListContextProvider
