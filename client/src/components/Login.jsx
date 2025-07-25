import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';
import "./login.css"
import axios from"axios"
import { Navigate, useNavigate } from 'react-router-dom';
export default function Login() {
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const url=useSelector(state=>state.url);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const onsubmit=()=>{
        axios.post(url+"auth/login",{email,password},{withCredentials:true})
        .then((response)=>{
            dispatch(addUser(response.data.user));
            console.log(response.data.user);
            navigate("/"); 
        })
        .catch(err=>console.log(err))
    }
  return (
    <div className='login'>
    <h1>Login</h1>
    <div className="loginbox">
        <input type="email"
         name="email" 
         placeholder='Enter your email'
         onChange={(e)=>setEmail(e.target.value)}
         required
          />
          <input type="password"
         name="password" 
         placeholder='Enter your Password'
         onChange={(e)=>setPassword(e.target.value)}
         required
          />
          <button onClick={onsubmit}>Login</button>
    </div>
    </div>

  )
}
