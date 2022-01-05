import React , {useState,useContext} from 'react'
import axios from 'axios';
import datesApi from './Api';
import {UserListContext} from './UsersListContext';
import { v4 as uuidv4 } from 'uuid';
import "./signup.css"



function Signup(props) {
  const [email,setEmail] =  useState("");
  const [password,setPassword] =  useState("");
  const [firstName,setFirstName] =  useState("");
  const [lastName,setLastName] =  useState("");
  const [age,setAge] =  useState("");
  const [phoneNumber,setPhoneNumber] =  useState("");
  const [gender,setGender] =  useState("");
  const [lookingFor,setLookingFor] =  useState("");
  const [image,setImage] = useState("");
  const [imgUrl,setImgUrl] = useState("");
  const [hobbies,setHobbies] = useState([]);
  const context = useContext(UserListContext);

  const [emailError,setEmailError] =  useState("");
  const [passwordError,setPasswordError] =  useState("");
  const [firstNameError,setFirstNameError] =  useState("");
  const [lastNameError,setLastNameError] =  useState("");
  const [ageError,setAgeError] =  useState("");
  const [phoneNumberError,setPhoneNumberError] =  useState("");
  const [genderError,setGenderError] =  useState("");
  const [lookingForError,setLookingForError] =  useState("");
  const [imageError,setImageError] = useState("");
  const [hobbiesError,setHobbiesError] = useState("");
 
 


  
  const isEmailExist = ()=>{
    return context.usersList.find((user)=>{
      return user.email===email;
    })
  }

  const validEmail = (e)=>{
    if(email.includes('@')){
      setEmailError("");
      return true;
    }else{
      setEmailError("email is not valid");
      return false;
    }
  }
  const validPassword = (e)=>{
    if(password.length>5){
      setPasswordError("");
      return true;
    }else{
      setPasswordError("password not is valid");
      return false;
    }
  }
  const validPhoneNumber = (e)=>{
    if(parseInt(phoneNumber)&&phoneNumber.length===10){
      setPhoneNumberError("");
      return true;
    }else{
      setPhoneNumberError("phone number is not valid");
      return false;
    }
  }
  
  const validAge = (e)=>{
    if(parseInt(age)){
      setAgeError("");
      return true;
    }else{
      setAgeError("age is not valid");
      return false;
    }
  }

  const validGender = ()=>{
    if(gender==="gender:"||gender===""){
      setGenderError("gender is not valid");
      return false;
    }else{
      setGenderError("");
      return true;
    }
  }

  const validLookingFor = ()=>{
    if(lookingFor==="looking for:"||lookingFor===""){
      setLookingForError("looking for gender is not valid");
      return false;
    }else{
      setLookingForError("");
      return true;
    }
  }

  const validHobbies=()=>{
    if(hobbies.length!==5){
      setHobbiesError("hobbies are not valid");
      return false;
    }else{
      setHobbiesError("");
      return true;
    }
  } 
  
  const validFirstName=()=>{
    if(firstName===""){
      setFirstNameError("first name is not valid");
    }else{
      setFirstNameError("");
      return true;
    }
  } 

  const validLastName=()=>{
    if(lastName===""){
     setLastNameError("last name is not valid");
    }else{
      setLastNameError("");
      return true;
    }
  } 

  const validImage=()=>{
    if(!imgUrl){
     setImageError("image is not valid");
     return false;
    }else{
      setImageError("");
      return true;
    }
  } 

  const checkValidation = ()=>{
    if(isEmailExist()){
      setEmailError("mail already exist");
      return false;
    }
    return validEmail()&&validPassword()&&validFirstName()&&validLastName()&&validPhoneNumber()&&validAge()&&validGender()&&
    validLookingFor()&&validHobbies()&&validImage();
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
    if(checkValidation()){
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
        context.setUsersList([...context.usersList,user]);
        localStorage.setItem("currentUser",JSON.stringify(user));
        await datesApi.post("dates",user);
        props.history.push(`/matched`);
        console.log(props);
      }catch(e){
        console.log(e);
      }
    }
    console.log(context.usersList);
    console.log(checkValidation());
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
      <h3 className='signup-title'>Sign up</h3>
      <div className='signup-form'> 
        <div>
          <input className='input-text-signup' type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/> 
          <span className='error'>{emailError}</span>
        </div>
        <div>
          <input className='input-text-signup' type="password" placeholder='password (min 6 digits)' onChange={(e)=>setPassword(e.target.value)}/>
          <span className='error'>{passwordError}</span>
        </div>
        <div>
           <input className='input-text-signup' type="text" placeholder="first name" onChange={(e)=>setFirstName(e.target.value)}/>
          <span className='error'>{firstNameError}</span>
        </div>
        <div>
          <input className='input-text-signup' type="text" placeholder="last name" onChange={(e)=>setLastName(e.target.value)}/>
          <span className='error'>{lastNameError}</span>
        </div>
        <div>
          <input className='input-text-signup' type="text" placeholder='phone number (10 digits)' onChange={(e)=>setPhoneNumber(e.target.value)}/>
          <span className='error'>{phoneNumberError}</span>
        </div>
        <div>
          <input className='input-text-signup' type="text"  placeholder='age' onChange={(e)=>setAge(e.target.value)}/>
          <span className='error'>{ageError}</span>
        </div>
        <div>
          <select className='input-text-signup' onChange={(e)=>setGender(e.target.value)}>
            <option>gender:</option>
            <option value="male">male</option>
            <option value="female">femael</option>  
          </select>
          <span className='error'>{genderError}</span>
        </div>
        <div>
          <select className='input-text-signup' onChange={(e)=>setLookingFor(e.target.value)}>
            <option>looking for:</option>
            <option value="male">male</option>
            <option value="female">femael</option>  
          </select>
          <span className='error'>{lookingForError}</span>
        </div>
        <div>
          <form>
            <h3 className='signup-inner-title'>Hobbies (pick 5)</h3>
            <span>{hobbiesError}</span>
            <div className='hobbies-div'>
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
            <div className='hobbies-div'>
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
            <div className='hobbies-div'>
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
            <div className='hobbies-div'>
              <input type="checkbox" id="drawing" name="drawing" onChange={handleHobbies} />
              <label htmlFor="drawing">drawing</label>
              <input type="checkbox" id="army" name="army" onChange={handleHobbies}/>
              <label htmlFor="army">army</label>
              <input type="checkbox" id="gadgets" name="gadgets" onChange={handleHobbies}/>
              <label htmlFor="gadgets">gadgets</label>
              <input type="checkbox" id="Sci-Fi" name="scienceFiction" onChange={handleHobbies}/>
              <label htmlFor="scienceFiction">Sci-Fi</label>
              <input type="checkbox" id="gaming" name="gaming" onChange={handleHobbies}/>
              <label htmlFor="gaming">gaming</label>
            </div>
          </form>
        </div>
        <div>
        <h3 className='signup-inner-title'>image</h3>
        <span className='error'>{imageError}</span>
          <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
          <button onClick={uploadImage}>upload image</button>  
        </div>
        <button onClick={handleSignUp}>Sign up</button>
        <div>
          <button onClick={()=>props.history.goBack()}>back to log in</button>
        </div>
      </div>
    </div>
    
  )
}

export default Signup
