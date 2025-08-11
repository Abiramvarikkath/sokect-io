import React from "react";
import { useState } from "react"; 
import axios from 'axios';
import route from "../router";
import './Signup.scss'
import { useNavigate } from "react-router-dom";
function Signup() {
    const [user,setUSer] = useState({
        email:"",
        password:"",
        cpassword:"",
        username:"",
        phone:"",
        profile:""
    })
    const navigate = useNavigate()
    const handleChange=(e)=>{
        setUSer((pre)=>({...pre,[e.target.name]:e.target.value}))
    }
    const handleFile=async(e)=>{
        const profile = await convertToBase64(e.target.files[0])
        setUSer((pre)=>({...pre,profile:profile}))
    }

    function convertToBase64(file){
        return new Promise((resolve,reject)=>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload=()=>{
                resolve(fileReader.result)
            }
            fileReader.onerror=(error)=>{
                reject(error)
            }
        })
    
       
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            const {data,status} = await axios.post(`${route()}signup`,user)
            if(status === 201){
                alert(data.msg)
                navigate('/signin')

            }
            else{
                alert(data.msg)
            }
        }catch (error){
            console.log("error occured",error);
            
        }
    }
    
    return(
        <>
       
        <form>
            <h1>Register</h1>
            <label htmlFor="photo-upload" className='photo-upload'>
                <input type="file" accept="image/*" onChange={handleFile}/>
            </label>
            <label htmlFor="name">Name</label>
            <input type="text" name="username" id="username" onChange={handleChange} />
            <label htmlFor="email" >Email</label>
            <input type="email" name="email" id="email"  onChange={handleChange} />
            <label htmlFor="password" >Password</label>
            <input type="password" name="password" id="password"  onChange={handleChange} />
            <label htmlFor="cpassword" >Cpassword</label>
            <input type="password" name="cpassword" id="cpassword"   onChange={handleChange}/>
            <label htmlFor="phone" >Phone</label>
            <input type="phone" name="phone" id="phone"  onChange={handleChange} />
            <button onClick={handleSubmit}>Submit</button>
            <a href="/Signin">already have an account?<span>Login</span></a>
        </form>
        </>
    )
}
export default Signup