import React ,{useState, useEffect,createContext} from 'react'
import axios from 'axios';
import datesApi from './Api';

export const UserListContext = createContext();

function UsersListContextProvider(props) {

 const [usersList,setUsersList] = useState([]);
    useEffect(()=>{
      const createusers = async ()=>{
        try{
          const {list} = await datesApi.get("dates");
          console.log("list",list);
          if(!list){
            const {data} = await axios.get('https://randomuser.me/api/?results=20');
            console.log(data.results);
            data.results.forEach(async (user) => {
              const date = {
                email: user.email,
                password: "123456",
                firstName: user.name.first,
                lastName: user.name.last,
                age: user.dob.age,
                phoneNumber: user.phone,
                gender: user.gender,
                lookingFor: user.gender==="male"? "female":"male",
                hobbies: ["reading","hiking","sport","music","tv"],
                imgUrl: user.picture.medium,
                key:user.login.uuid,
              }
              try{
                const data = await datesApi.post("dates",date);
                console.log(data);
              }catch(e){
                console.log(e);
              }
            });
          }
          }catch(e){
          console.log(e);
        }
      }
      
      
      const fetch = async ()=>{
        try{
          const {data} = await datesApi.get("dates");
          setUsersList(data)
        }catch(e){
          console.log(e);
        }
      }
      if(usersList.length===0){
        // createusers(); 
        fetch();
      }
    },[])
  

  return (
    <UserListContext.Provider value={{usersList: usersList,setUsersList: setUsersList}}>
        {props.children}
    </UserListContext.Provider>
  )
}

export default UsersListContextProvider
