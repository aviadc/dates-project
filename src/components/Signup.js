import React , {useState} from 'react'
import axios from 'axios';
import {Image} from 'cloudinary-react';
import "./signup.css"

function Signup() {
  const  [email,setEmail] =  useState();
  const [password] =  useState();
  const [image,setImage] = useState();
  const [publicId,setPublicId] = useState("");
  const [hobbies,setHobbies] = useState([]);

  let myhobbies = [];

  const isEmailExist = ()=>{
    
  }

  const handleSelect = (e)=>{
    console.log(e.target.value)
  }

  const handleHobbies = (e)=>{
    console.log(e);
    if(e.target.checked){
      myhobbies.push(e.target.id);
    }else{
      myhobbies = myhobbies.filter((hobby)=>{
        return hobby!==e.target.id
      })
    }
    console.log(myhobbies)
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
      setPublicId(data.url);
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className='signup-container'>
      <div className='signup-form'> 
        <h3>Sign up</h3>
        <div>
          email <input type="email"/>
        </div>
        <div>
          Password <input type="password"/>
        </div>
        <div>
          first name <input type="text"/>
        </div>
        <div>
          phone number <input type="text"/>
        </div>
        <div>
          age <input type="text"/>
        </div>
        <div>
          <select onChange={handleSelect}>
            <option>gender:</option>
            <option value="male">male</option>
            <option value="female">femael</option>  
          </select>
        </div>
        <div>
          <select onChange={handleSelect}>
            <option>looking for:</option>
            <option value="male">male</option>
            <option value="female">femael</option>  
          </select>
        </div>
        <div>
          <form>
            <h3>Hobbies</h3>
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
        <button>Sign up</button>
      </div>
      <div>
       
           {publicId? <Image cloudName="dten2xlir"  publicId={publicId}/> : null} 
      </div>
    </div>
    
  )
}

export default Signup
