import React ,{useState, useEffect,createContext} from 'react'
import axios from 'axios';
import datesApi from './Api';
import { v4 as uuidv4 } from 'uuid';

export const UserListContext = createContext();

function UsersListContextProvider(props) {

 const [usersList,setUsersList] = useState([]);
    useEffect(()=>{
      const createusers = async ()=>{
        const myHobbies = ["reading","hiking","tv",
        "sport","music","computers","writing","space","architecture",
        "caffe","dancing","extreme","cooking","fashion",
        "history","drawing","army","gadgets","scienceFiction","gaming"];
        const randomNumber = (from,to)=>{
          return Math.floor(Math.random()*to)+from
        }
      
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
                phoneNumber: [randomNumber(0,10),randomNumber(0,10),
                  randomNumber(0,10),randomNumber(0,10),randomNumber(0,10),
                  randomNumber(0,10),randomNumber(0,10),randomNumber(0,10),
                  randomNumber(0,10),
                  randomNumber(0,10),].join(''),
                gender: user.gender,
                lookingFor: user.gender==="male"? "female":"male",
                hobbies: [myHobbies[randomNumber(0,4)],myHobbies[randomNumber(4,4)],
                myHobbies[randomNumber(8,4)],myHobbies[randomNumber(12,4)],myHobbies[randomNumber(16,4)]],
                imgUrl: user.picture.medium,
                key: uuidv4(),
                likes: [],
                likedMe: [],
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
    },[setUsersList])
  

  return (
    <UserListContext.Provider value={{usersList: usersList,setUsersList: setUsersList}}>
        {props.children}
    </UserListContext.Provider>
  )
}

export default UsersListContextProvider
