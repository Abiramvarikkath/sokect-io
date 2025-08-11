import React from "react";
import axios from "axios";
import route from '../router'
import { useState } from 'react'
import './Signin.scss'
import { Link, useNavigate } from "react-router-dom";

function Signin() {
    const [loginDetails,setDetails] = useState({
        email:"",
        password:""
    })

    const handleChange = (e)=>{
        setDetails((pre)=>({...pre,[e.target.name]:e.target.value}))
    }
    const navigate = useNavigate()
   const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { status, data } = await axios.post(
      `${route()}signin`, // ✅ fixed typo from "sigin" to "signin"
      loginDetails,
      {
        headers: { 'Content-Type': 'application/json' } // ✅ corrected "Headers" to "headers"
      }
    );

    if (status === 200) {
      localStorage.setItem("Auth", data.token);
      alert(data.msg);
      
       navigate('/')
       window.location.reload()


    } else {
      alert(data.msg);
      
    }
  } catch (error) {
    console.log("Login failed:", error);
     navigate('/')
  }
};

    return(
        <>
        
        <form onSubmit={handleSubmit}>
          <h1>Login</h1><br />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" onChange={handleChange} />
         <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" onChange={handleChange} />
        <button type="submit">Sign In</button>
        <p>
            Don't have an account?
            {/* <a href="/signup">Sign up</a> */}
            <Link to={'/signup'}>SignUp</Link>
        </p>
        </form>
        </>
    )
}
export default Signin