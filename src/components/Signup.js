import React , {useState,useContext, useRef} from 'react'
import axios from 'axios';
import datesApi from './Api';
import {Image} from 'cloudinary-react';
import {UserListContext} from './UsersListContext';
import { v4 as uuidv4 } from 'uuid';
import "./signup.css"



function Signup(props) {
  const [email,setEmail] =  useState();
  const [password,setPassword] =  useState();
  const [firstName,setFirstName] =  useState();
  const [lastName,setLastName] =  useState();
  const [age,setAge] =  useState();
  const [phoneNumber,setPhoneNumber] =  useState();
  const [gender,setGender] =  useState();
  const [lookingFor,setLookingFor] =  useState();
  const [image,setImage] = useState();
  const [imgUrl,setImgUrl] = useState("");
  const [hobbies,setHobbies] = useState([]);
  const [massagesToTheuser,setMassagesToTheuser] = useState("");
  const context = useContext(UserListContext);
 


  
  const isEmailExist = ()=>{
    return context.find((user)=>{
      return user.email===email;
    })
  }

  const validEmail = (e)=>{
    if(email.includes('@')){
      return true;
    }else{
      setMassagesToTheuser(massagesToTheuser+"\n email is not valid");
      return false;
    }
  }
  const validPassword = (e)=>{
    if(password.length>5){
      return true;
    }else{
      setMassagesToTheuser(massagesToTheuser+"\n password not is valid");
      return false;
    }
  }
  const validPhoneNumber = (e)=>{
    if(parseInt(phoneNumber)&&phoneNumber.length===10){
      return true;
    }else{
      setMassagesToTheuser(massagesToTheuser+"\n phone number is not valid");
      return false;
    }
  }
  
  const validAge = (e)=>{
    if(parseInt(age)){
      return true;
    }else{
      setMassagesToTheuser(massagesToTheuser+"\n age is not valid");
      return false;
    }
  }

  const validSelect = ()=>{
    if(gender==="gender:"||lookingFor==="looking for:"){
      setMassagesToTheuser(massagesToTheuser+"\n gender is not valid");
      return false;
    }else{
      return true;
    }
  }

  const validHobbies=()=>{
    if(hobbies.length!==5){
      setMassagesToTheuser(massagesToTheuser+"\n hobbies are not valid");
    }else{
      return true;
    }
  } 
  
  const validName=()=>{
    if(!firstName||!lastName){
      setMassagesToTheuser(massagesToTheuser+"\n name is not valid");
    }else{
      return true;
    }
  } 

  const validImage=()=>{
    if(!imgUrl){
      setMassagesToTheuser(massagesToTheuser+"\n image is not valid");
    }else{
      return true;
    }
  } 

  const checkValidation = ()=>{
    if(isEmailExist){
      setMassagesToTheuser(massagesToTheuser+"\n mail already exist");
      return false;
    }
    return !validEmail()||!validPassword()||!validHobbies()||!validAge()||!validImage()||
    !validName()||!validSelect()||!validPhoneNumber()
  }

  const handleHobbies = (e)=>{
    console.log(e);
    if(e.target.checked){
      setHobbies([...hobbies,e.target.id]);
   
    }else{
      setHobbies(hobbies.filter((hobby)=>{
        return hobby!==e.target.id
      }))
    }
  }

  const handleSignUp = async ()=>{
    console.log(hobbies);
    const user = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      age: age,
      phoneNumber: phoneNumber,
      gender: gender,
      lookingFor: lookingFor,
      hobbies: hobbies,
      imgUrl: imgUrl,
      key: uuidv4(),
    }
    try{
      const data = await datesApi.post("dates",user);
    }catch(e){
      console.log(e);
    }
  }

  const uploadImage= async (e)=>{
    console.log(image);
    const formData = new FormData();
    formData.append("file",image);
    formData.append("upload_preset","s32txtbc");
    try{
      const {data} = await axios.post("https://api.cloudinary.com/v1_1/dten2xlir/image/upload",formData);
      console.log(data);
      console.log(data.url);
      setImgUrl(data.url);
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className='signup-container'>
      <div className='signup-form'> 
        <h3>Sign up</h3>
        <div>
          email <input type="email" onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div>
          Password <input type="password" placeholder='minimum 6 digits' onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div>
          first name <input type="text" onChange={(e)=>setFirstName(e.target.value)}/>
        </div>
        <div>
          last name <input type="text" onChange={(e)=>setLastName(e.target.value)}/>
        </div>
        <div>
          phone number <input type="text" placeholder='10 digits' onChange={(e)=>setPhoneNumber(e.target.value)}/>
        </div>
        <div>
          age <input type="text" onChange={(e)=>setAge(e.target.value)}/>
        </div>
        <div>
          <select onChange={(e)=>setGender(e.target.value)}>
            <option>gender:</option>
            <option value="male">male</option>
            <option value="female">femael</option>  
          </select>
        </div>
        <div>
          <select onChange={(e)=>setLookingFor(e.target.value)}>
            <option>looking for:</option>
            <option value="male">male</option>
            <option value="female">femael</option>  
          </select>
        </div>
        <div>
          <form>
            <h3>Hobbies (pick 5)</h3>
            <div>
              <input type="checkbox" id="reading" name="reading" onChange={handleHobbies} />
              <label htmlFor="reading">reading</label>
              <input type="checkbox" id="hiking" name="hiking" onChange={handleHobbies}/>
              <label htmlFor="hiking">hiking</label>
              <input type="checkbox" id="tv" name="tv" onChange={handleHobbies}/>
              <label htmlFor="tv">tv</label>
              <input type="checkbox" id="sport" name="sport" onChange={handleHobbies}/>
              <label htmlFor="sport">sport</label>
              <input type="checkbox" id="music" name="music" onChange={handleHobbies}/>
              <label htmlFor="music">music</label>
            </div>
            <div>
              <input type="checkbox" id="computers" name="computers" onChange={handleHobbies} />
              <label htmlFor="computers">computers</label>
              <input type="checkbox" id="writing" name="writing" onChange={handleHobbies}/>
              <label htmlFor="writing">writing</label>
              <input type="checkbox" id="space" name="space" onChange={handleHobbies}/>
              <label htmlFor="space">space</label>
              <input type="checkbox" id="architecture" name="architecture" onChange={handleHobbies}/>
              <label htmlFor="architecture">architecture</label>
              <input type="checkbox" id="caffe" name="caffe" onChange={handleHobbies}/>
              <label htmlFor="caffe">caffe</label>
            </div>
            <div>
              <input type="checkbox" id="dancing" name="dancing" onChange={handleHobbies} />
              <label htmlFor="dancing">dancing</label>
              <input type="checkbox" id="extreme" name="extreme" onChange={handleHobbies}/>
              <label htmlFor="extreme">extreme</label>
              <input type="checkbox" id="cooking" name="cooking" onChange={handleHobbies}/>
              <label htmlFor="cooking">cooking</label>
              <input type="checkbox" id="fashion" name="fashion" onChange={handleHobbies}/>
              <label htmlFor="fashion">fashion</label>
              <input type="checkbox" id="history" name="history" onChange={handleHobbies}/>
              <label htmlFor="history">history</label>
            </div>
            <div>
              <input type="checkbox" id="drawing" name="drawing" onChange={handleHobbies} />
              <label htmlFor="drawing">drawing</label>
              <input type="checkbox" id="army" name="army" onChange={handleHobbies}/>
              <label htmlFor="army">army</label>
              <input type="checkbox" id="gadgets" name="gadgets" onChange={handleHobbies}/>
              <label htmlFor="gadgets">gadgets</label>
              <input type="checkbox" id="scienceFiction" name="scienceFiction" onChange={handleHobbies}/>
              <label htmlFor="scienceFiction">scienceFiction</label>
              <input type="checkbox" id="gaming" name="gaming" onChange={handleHobbies}/>
              <label htmlFor="gaming">gaming</label>
            </div>
          </form>
        </div>
        <div>
        <h3>image</h3>
          <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
          <button onClick={uploadImage}>upload image</button>  
        </div>
        <button onClick={handleSignUp}>Sign up</button>
        <div>
          <button onClick={()=>props.history.goBack()}>back to log in</button>
        </div>
      </div>
      
      <div>
        {massagesToTheuser}
      </div>
      {/* <div>
       
           {imgUrl? <Image cloudName="dten2xlir"  publicId={imgUrl}/> : null} 
      </div> */}
    </div>
    
  )
}

export default Signup
